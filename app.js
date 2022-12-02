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

require('./controllers/routes_post')(app)
//========================================================================//

app.listen(8080)