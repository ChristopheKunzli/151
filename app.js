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
//TODO move directories away from root dir
//========================================================================//
app.use('/images', express.static('images'))

app.use('/css', express.static('css'))

app.use('/js', express.static('js'))

app.use('/vendor', express.static('vendor'))
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
    const cmd = "SELECT * FROM snows"

    pool.query(cmd, (err) => {
        if (err) throw err;
    }).then(r => {
        res.render('home', {row: r})
    })
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.post('/auth', (req, res) => {
    const mail = req.body.email
    const pass = req.body.password

    const cmd = "INSERT INTO users ('email', 'password') VALUES ('test@cpnv.ch', 'passassass');"

    if (mail && pass) {
        pool.query(cmd, (error, res, fields) =>{
            if(error) throw error
            res.redirect('/about')
        })
    } else {
        res.redirect('/contact')
    }
})

/**
 app.post('/auth', (req, res) => {
// Capture the input fields
    let user_email = req.body.email;
    let password = req.body.userPswd;
    // Ensure the input fields exists and are not empty
    if (user_email && password) {
        // Execute SQL query that'll select the account from the database based on the specified username and password
        pool.query('SELECT * FROM users WHERE email = ? AND password = ?', [user_email, password], (error, results, fields) => {
            // If there is an issue with the query, output the error
            if (error) throw error;
            // If the account exists
            if (results.length > 0) {
                // Authenticate the user
                req.session.loggedin = true;
                req.session.username = user_email;
                // Redirect to home page
                res.redirect('/home');
            } else {
                res.send('Incorrect Username and/or Password!');
            }
            res.end();
        });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
})
 */

app.get('/about', (req, res) => {
    res.render('about')
})
//========================================================================//

app.listen(8080)