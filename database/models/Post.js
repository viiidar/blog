const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true
    },
    description: { 
        type: String,
        required: true
    },
    content: { 
        type: String,
        required: true
    },
    author: {           //on pourrait stocker une référence vers le modèle User
        type: String,
        required: true
    },
    createdAt: {        //enregistre la date du jour au moment de la création du post
        type: Date,
        default: Date.now
    }
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post