const pool = require("../models/dbconfig");

module.exports = (app) => {
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
}