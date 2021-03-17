const Post = require('../database/models/Post') //on importe notre modèle
 
module.exports = async (req, res) => {
    const post = await Post.findById(req.params.id) //on attend la réponse de la db
    res.render("post", {
        post
    })
}