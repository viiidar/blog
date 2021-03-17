const bcrypt = require('bcrypt')    //module de cryptage
const User = require('../database/models/User') //notre modèle d'utilisateur
 
module.exports = (req, res) => {
    const {
        email,
        password
    } = req.body
    User.findOne({
        email
    }, (error, user) => {
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {  //on compare les hashs des password (toujours stocker les mdp en hash et non en clair dans la db)
                if (same) {
                    req.session.userId = user._id
                    res.redirect('/')
                } else {
                    res.redirect('/auth/login')
                }
            })
        } else {
            return res.redirect('/auth/login')
        }
    })
}