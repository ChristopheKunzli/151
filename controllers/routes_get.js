const pool = require('../models/dbconfig')

module.exports = (app) => {

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

    app.get('/product', (req, res) => {
        res.render('product')
    })

    app.get('/product-detail', (req, res) => {
        res.render('product-detail')
    })

    app.get('/cart', (req, res) => {
        res.render('cart')
    })
}