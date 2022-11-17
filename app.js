const express = require('express')
const exphbs = require('express-handlebars')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const crypto = require('crypto')
const app = express()

//const pool = require('./db/dbconfig')

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

app.engine('hbs', exphbs.engine({
    extname: '.hbs'
}))

app.set('view engine', 'hbs')

//const pool = require("../db/dbconfig")


app.get('/', (req, res) => {
    res.redirect("/home")
});

app.get('/home', function (req, res) {res.render('home')}
)

app.get('/about', (req, res) => {
    res.render('about')
})

app.listen(8080)