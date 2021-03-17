//modules externes

const express = require('express')
const expressEdge = require('express-edge') //pour gérer les vues (templates des pages html)
const edge = require('edge.js')
const mongoose = require('mongoose')    //base de données mongodb
const bodyParser = require('body-parser')   //transforme le body des requêtes au format json  
const expressSession = require('express-session')   //session pour garder l'utilisateur connecté
const mongoStore = require('connect-mongo') //stocker les sessions dans mongodb
const connectFlash = require('connect-flash')   //pour afficher message d'erreur à l'utilisateur

//middlewares

const storePost = require('./middleware/storePost') //verification des posts avant de les sauvegarder
const auth = require('./middleware/auth')   //verification que l'utilisateur est bien connecté
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')

//controleurs

const homePageController = require('./controllers/homePage')
const getPostController = require('./controllers/getPost')
const createPostController = require('./controllers/createPost')
const storePostController = require('./controllers/storePost')
const createUserController = require('./controllers/createUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')

const app = new express()

//connection à mongodb

mongoose.connect('mongodb://localhost/node-blog', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => 'You are now connected to Mongo')
    .catch(err => console.error('Something went wrong', err))

app.use(expressSession({
    secret: 'secret',
    store: mongoStore.create({ mongoUrl: 'mongodb://localhost/node-blog' })
}))

//on configure le serveur

app.use('/public', express.static(__dirname + '/public'))   //distribution des fichiers statiques
app.use(expressEdge.engine) //gestionnaire des vues
app.set('views', __dirname + '/views')
app.use('*', (req, res, next) => {
    edge.global('auth', req.session.userId)
    next()
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use('/posts/store', storePost)
app.use(connectFlash())

//routes

app.get('/', homePageController)
app.get('/post/:id', getPostController) // :variable pour passer un paramètre
app.get('/posts/new', auth, createPostController)   //on passe par notre middleware avant d'aller sur la page
app.post('/posts/store', auth, storePost, storePostController)
app.get('/auth/login', redirectIfAuthenticated, loginController)
app.post('/users/login', redirectIfAuthenticated, loginUserController)
app.get('/auth/register', redirectIfAuthenticated, createUserController)
app.post('/users/register', redirectIfAuthenticated, storeUserController)
app.get('/auth/logout', logoutController)

//activation du serveur

app.listen(4000, () => {
    console.log('App listening on port 4000')
})