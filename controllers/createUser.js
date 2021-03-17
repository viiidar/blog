module.exports = (req, res) => {
    res.render('register', {
        errors: req.flash('registrationErrors') //message d'erreur si tout les champs ne sont pas remplis
    })
}