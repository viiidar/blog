Blog
--
Un exemple de blog avec Node.js Express, Express-edge et MongoDB

Installation
--

1. Installer mongodb
2. sudo service mongod start
3. mongo
4. (dans mongo) use node-blog
5. npm install
6. npm start
7. pour accéder au blog : localhost:4000

Fonctionnement
--

On utilise une architecte MVC (Models Views Controllers) : les modèles décrivent le stockage des données dans la db, les vues sont nos templates qui remplacent les pages html statiques, les controleurs traitent les actions de l'utilisateur et modifient les données du modèle et de la vue.

index.js est notre point d'entrée. On y définit les routes (chemins que peut emprunter l'utilisateur) et on configure notre serveur.

Références
--

https://vegibit.com/node-js-blog-tutorial/

Installer mongodb sur Windows:
https://vegibit.com/install-mongodb-with-compass-on-windows/