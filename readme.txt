Il faut créer sa propre base de données sur SQL nommé : monprojet : CREATE DATABASE IF NOT EXISTS monprojet
Puis normalement rien d'autre à installer ,
Peut-être un npm install.

Dans le fichier server.js pour la connexion : const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
});

Pour lancer : node server.js



