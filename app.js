const express = require('express')
const exphbs = require('express-handlebars')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const app = express()

const pool = require('./models/dbconfig')

const crypto = require('crypto')
const authTokens = {}

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256')
    return sha256.update(password).digest('base64')
}

const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex')
}

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({extended: true}))

app.use(cookieParser())

app.use((req, res, next) => {
    const authToken = req.cookies['AuthToken']
    req.user = authTokens[authToken]
    next()
})

//========================================================================//
// Static files
//========================================================================//
app.use('/images', express.static('views/images'))

app.use('/css', express.static('views/css'))

app.use('/js', express.static('views/js'))

app.use('/vendor', express.static('views/vendor'))

app.use('/fonts', express.static('views/fonts'))
//========================================================================//

app.engine('hbs', exphbs.engine({
    extname: '.hbs'
}))

app.set('view engine', 'hbs')


//========================================================================//
// Routes
//========================================================================//

require('./controllers/routes_get')(app)

require('./controllers/routes_post')(app, pool)

app.post('/auth', (req, res) => {
    const mail = req.body.email
    const hashPass = getHashedPassword(req.body.password)

    const cmd = "SELECT userEmailAddress, userHashPsw, pseudo FROM snows.users WHERE userEmailAddress='" + mail + "';"

    if (mail && hashPass) {
        pool.query(cmd, (error, res) => {
            if (error) throw error

        }).then(r => {
            r.forEach(row => {
                if (row["userEmailAddress"] === mail && row["userHashPsw"] === hashPass
                ) {
                    const authToken = generateAuthToken()
                    authTokens[authToken] = mail;

                    res.cookie('AuthToken', authToken);

                    res.redirect('/home')
                }
            })
            res.render('contact', {message: "Adresse email ou mot de passe incorrect"})
        })
    } else {
        res.render('contact', {message: "Adresse email ou mot de passe pas rempli"})
    }
})
//========================================================================//

app.listen(8080)