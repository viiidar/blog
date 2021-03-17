const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true    //on vérifie que l'adresse mail n'est pas présente dans la db
    },
    password: {
        type: String,
        required: true
    }
})

//middleware
UserSchema.pre('save', function(next) {
    const user = this

    bcrypt.hash(user.password, 10, function (error, encrypted) {    //on crypte le mdp pour stocker le hash (si il y'a une fuite de la db ca évite de faire fuiter les mdps)
        user.password = encrypted
        next()
    })
})

module.exports = mongoose.model('User', UserSchema)