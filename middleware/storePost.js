module.exports = (req, res, next) => {
    //on vérifie juste la présence de tout les champs
    if (!req.body.author || !req.body.title || !req.body.description || !req.body.content) {
        return res.redirect('/posts/new')
    }

    next()
}