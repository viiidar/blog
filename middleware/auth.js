const User = require('../database/models/User')

module.exports = (req, res, next) => {
    //on vérifie que l'utilisateur est bien connecté en utilisant les données de session
    User.findById(req.session.userId, (error, user) => {
        if (error || !user) {
            return res.redirect('/')
        }

        next()
    })
}