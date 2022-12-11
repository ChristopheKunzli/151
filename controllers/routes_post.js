module.exports = (app, pool) => {
    app.post('/delete/:id', (req, res) => {
        if (req.user) {
            const id = req.params.id
            const cmd = "DELETE FROM snows WHERE id = " + id

            pool.query(cmd, (err, res) => {
                if (err) throw err
            }).then(() => {
                pool.query('SELECT * FROM snows', (err, res) => {
                    if (err) throw err
                }).then(r => {
                    res.render('gestion', {email: req.user, message: "Le snow a été supprimé ", snows: r})
                })
            })
        } else {
            res.render('contact', {message: "Veuillez vous connecter pour accéder à cette page"})
        }
    })
}