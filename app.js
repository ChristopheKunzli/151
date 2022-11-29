const express = require('express')
const exphbs = require('express-handlebars')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const app = express()

const pool = require('./db/dbconfig')

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

app.get('/', (req, res) => {
    res.redirect("/home")
});

app.get('/home', (req, res) => {
    res.render('home')
    /*
    const cmd = "SELECT * FROM snows"

    pool.query(cmd, (err) => {
        if (err) throw err;
    }).then(r => {
        res.render('home', {row: r, title: "Home"})
    })
    */

})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/blog', (req, res) => {
    res.render('blog')
})
app.get('/blog/blog-detail', (req, res) => {
    res.render('blog-detail')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.post('/auth', (req, res) => {
    const mail = req.body.email
    const pass = req.body.password

    const insertNewUser = "INSERT INTO users SET email = '" + mail + "', password = '" + pass + "';"
    const selectUser = "SELECT * FROM users WHERE email = '" + mail + "' AND password = '" + pass + "';"

    if (mail && pass) {
        pool.query(selectUser, (error, res, fields) => {
            if (error) throw error
        }).then(r => {
            if (r.length === 1) {
                res.redirect('/about')
            } else {
                res.render('contact', {message: "Adresse email ou mot de passe incorrect"})
            }
        })
    } else {
        res.render('contact', {message: "Adresse email ou mot de passe pas rempli"})
    }
})
//========================================================================//

app.listen(8080)