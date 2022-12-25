module.exports = (app, pool) => {
    app.post('/add', (req, res) => {
        //Check if the user is logged in
        if (!req.user) {
            res.render('contact', {message: "Veuillez vous connecter pour accéder cette page"})
            return
        }

        //Retrieve all data from the form
        const code = req.body.code
        const brand = req.body.brand
        const model = req.body.model
        const snowLength = req.body.snowLength
        const qtyAvailable = req.body.qtyAvailable
        const description = req.body.description
        const dailyPrice = req.body.dailyPrice
        const active = req.body.active
        const photo = req.body.photo

        //Build the query
        const cmd = "INSERT INTO snows (code, brand, model, snowLength, qtyAvailable, description, dailyPrice, photo, active) VALUES ('" + code + "', '" + brand + "', '" + model + "', '" + snowLength + "', '" + qtyAvailable + "', '" + description + "', '" + dailyPrice + "', '" + photo + "', '" + active + "')"

        //Execute the query and redirect the user to management page
        pool.query(cmd, (err, res) => {
            if (err) throw err
        }).then(r => {
            res.redirect('/gestion')
        })
    })
}