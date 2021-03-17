module.exports = (req, res) => {
    req.session.destroy(() => { //destruction des données de session (normalement on devrait gérer les erreurs mais flemme)
        res.redirect('/')
    })
}