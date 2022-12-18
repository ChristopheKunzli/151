const pool = require('../models/dbconfig')

module.exports = (app) => {

    app.get('/', (req, res) => {
        res.redirect("/home")
    });

    app.get('/home', (req, res) => {
        res.render("home", {email: req.user})
    })

    app.get('/contact', (req, res) => {
        res.render('contact', {email: req.user})
    })

    app.get('/blog', (req, res) => {
        res.render('blog', {email: req.user})
    })
    app.get('/blog/blog-detail', (req, res) => {
        res.render('blog-detail', {email: req.user})
    })

    app.get('/about', (req, res) => {
        res.render('about', {email: req.user})
    })

    app.get('/product', (req, res) => {
        const cmd = "SELECT * from snows"

        pool.query(cmd, (err) => {
            if (err) throw err;
        }).then(r => {
            r.forEach((row) => {
                row["photo"] = row["photo"].substring(13)
            })
            res.render('product', {products: r, email: req.user})
        })
    })

    app.get('/product-detail/:id', (req, res) => {
        const id = req.params.id
        const cmd = "SELECT * FROM snows WHERE id = " + id
        pool.query(cmd, (err, res) => {
            if (err) throw err
        }).then(r => {
            r.forEach((row) => {
                row["photo"] = row["photo"].substring(12)
            })
            res.render('product-detail', {snow: r, email: req.user})
        })
    })

    app.get('/cart', (req, res) => {
        res.render('cart', {email: req.user})
    })

    app.get('/gestion', (req, res) => {
        if (req.user) {
            pool.query("SELECT * FROM snows", (err, res) => {
                if (err) throw err
            }).then(r => {
                r.forEach((row) => {
                    row["photo"] = row["photo"].substring(12)
                    console.log(row["photo"])
                })
                res.render('gestion', {snows: r, email: req.user})
            })
        } else {
            res.render('contact', {message: "Veuillez vous connecter pour accéder cette page"})
        }
    })

    app.get('/gestion/edit/:id', (req, res) => {
        const id = req.params.id
        const cmd = "SELECT * FROM snows WHERE id = " + id
        pool.query(cmd, (err, res) => {
            if (err) throw err
        }).then(r => {
            res.render('edit', {snow: r[0], email: req.user})
        })
    })

    app.get('/gestion/add', (req, res) => {
        if (req.user) {
            res.render('addArticle')
        } else {
            res.render('contact', {message: "Veuillez vous connecter pour accéder à cette page"})
        }
    })

    app.get('/delete/:id', (req, res) => {
        if (req.user) {
            const id = req.params.id
            const cmd = "DELETE FROM snows WHERE id = " + id

            pool.query(cmd, (err, res) => {
                if (err) throw err
            }).then(() => {
                pool.query('SELECT * FROM snows', (err, res) => {
                    if (err) throw err
                }).then(r => {
                    r.forEach((row) => {
                        row["photo"] = row["photo"].substring(12)
                        console.log(row["photo"])
                    })
                    res.redirect('/gestion')
                })
            })
        } else {
            res.render('contact', {message: "Veuillez vous connecter pour accéder à cette page"})
        }
    })
}