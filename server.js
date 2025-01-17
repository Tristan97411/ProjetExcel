const mysql = require('mysql2');
const express = require('express');
const path = require('path');
const app = express();
const bcrypt = require('bcrypt');
const session = require('express-session');
const crypto = require('crypto');
const fs = require('fs');


// Configuration de la base de données MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
});

// Vérification de la connexion
connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à MySQL :', err.stack);
        return;
    }
    console.log('Connecté à MySQL avec l\'ID ' + connection.threadId);

    // Création de la base et sélection de la base de données
    connection.query('CREATE DATABASE IF NOT EXISTS monprojet', (err) => {
        if (err) {
            console.error('Erreur lors de la création de la base de données :', err);
            return;
        }
        connection.query('USE monprojet', (err) => {
            if (err) {
                console.error('Erreur lors de la sélection de la base :', err);
                return;
            }
            createTableIfNotExists();

            createCountriesTableIfNotExists();

            createPaymentsTableIfNotExists();

            createTableFacturations();

            createCATableIfNotExists();

            createUsersTableIfNotExists();

            createTableSession();

            createTableUserData()
        });
    });
});

// Fonction pour créer la table si elle n'existe pas
function createTableIfNotExists() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS produits (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nom VARCHAR(255) NOT NULL,
            achats INT,
            ventes INT,
            stock INT
        );
    `;
    connection.query(createTableQuery, (err, result) => {
        if (err) {
            console.error('Erreur lors de la création de la table :', err);
        } else {
            console.log('Table produits vérifiée ou créée avec succès');
            
            // Assurer que l'ID est bien auto-incrément
            const alterTableQuery = `
                ALTER TABLE produits
                    MODIFY COLUMN id INT AUTO_INCREMENT;
            `;
            connection.query(alterTableQuery, (err, result) => {
                if (err) {
                    console.error('Erreur lors de la modification de la colonne ID :', err);
                } else {
                    console.log('Colonne ID mise à jour en AUTO_INCREMENT');
                }
            });
        }
    });
}
function createPaymentsTableIfNotExists() {
    const createPaymentsTableQuery = `
        CREATE TABLE IF NOT EXISTS payments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            firstName VARCHAR(255) NOT NULL,
            gender ENUM('Homme', 'Femme') NOT NULL,
            amountPaid DECIMAL(10, 2) NOT NULL
        );
    `;
    connection.query(createPaymentsTableQuery, (err, result) => {
        if (err) {
            console.error('Erreur lors de la création de la table "payments" :', err);
        } else {
            console.log('Table "payments" vérifiée ou créée avec succès');
        }
    });
}
function createTableFacturations() {
    const createFacturationsTableQuery = `
        CREATE TABLE IF NOT EXISTS calculations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    price DECIMAL(10, 2) NOT NULL,
    isGrossiste BOOLEAN NOT NULL DEFAULT FALSE,
    isPaiementComptant BOOLEAN NOT NULL DEFAULT FALSE,
    isVenteEmportee BOOLEAN NOT NULL DEFAULT FALSE,
    remise DECIMAL(10, 2) NOT NULL,
    escompte DECIMAL(10, 2) NOT NULL,
    fraisDePort DECIMAL(10, 2) NOT NULL,
    tva DECIMAL(10, 2) NOT NULL,
    total DECIMAL(10, 2) NOT NULL
);

`;
connection.query(createFacturationsTableQuery, (err, result) => {
    if (err) {
        console.error('Erreur lors de la création de la table "Facturation" :', err);
    } else {
        console.log('Table "Facturation" vérifiée ou créée avec succès');
    }
});
}
// Fonction pour créer la table si elle n'existe pas
function createCATableIfNotExists() {
    const createCATableQuery = `
        CREATE TABLE IF NOT EXISTS chiffres (
            id INT AUTO_INCREMENT PRIMARY KEY,
            annee INT NOT NULL,
            chiffreAffaire FLOAT NOT NULL
        );
    `;
    
    connection.query(createCATableQuery, (err, result) => {
        if (err) {
            console.error('Erreur lors de la création de la table :', err);
        } else {
            console.log('Table chiffres vérifiée ou créée avec succès');
        }
    });
}

    // Fonction pour créer la table users si elle n'existe pas
    function createUsersTableIfNotExists() {
        const createUsersTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
            );
        `;

        connection.query(createUsersTableQuery, (err, result) => {
            if (err) {
                console.error('Erreur lors de la création de la table users :', err);
            } else {
                console.log('Table users vérifiée ou créée avec succès');
            }
        });
    }
    function createTableSession() {
        const createTableSessionQuery = `
        CREATE TABLE IF NOT EXISTS sessions (
            id VARCHAR(255) PRIMARY KEY,
            user_id INT NOT NULL,
            expires DATETIME NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
    `;
    connection.query(createTableSessionQuery, (err, result) => {
        if (err) {
            console.error('Erreur lors de la création de la table sessions :', err);
        } else {
            console.log('Table session vérifiée ou créée avec succès');
        }
    });
    }
    function createTableUserData() {
        const createTableUserDataQuery = `
        CREATE TABLE IF NOT EXISTS user_data (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            data_type VARCHAR(255) NOT NULL,
            data_value TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
        `;
        
        connection.query(createTableUserDataQuery, (err, result) => {
            if (err) {
                console.error('Erreur lors de la création de la table user_data :', err);
            } else {
                console.log('Table user_data vérifiée ou créée avec succès');
            }
        });
    }
    // Configuration du middleware pour les sessions
app.use(session({
    secret: 'ton_secret_pour_les_sessions', // Choisis un secret aléatoire
    resave: false,                          // Ne pas sauvegarder la session si elle n'a pas été modifiée
    saveUninitialized: true,                // Sauvegarder la session même si elle est vide
    cookie: { secure: false }               // Mettre 'secure: true' si tu utilises HTTPS
}));
    function processFile(filePath) {
        let content = fs.readFileSync(filePath, 'utf8');
    
        // Transformer res.status(...).send(...) en responseHelper.error/success(...)
        content = content.replace(
            /res\.status\((\d+)\)\.(send|json)\((.*)\);/g,
            (match, status, method, data) => {
                const helperFunction = status === '200' ? 'success' : 'error';
                return `responseHelper.${helperFunction}(res, ${data.trim()});`;
            }
        );
    
        fs.writeFileSync(filePath, content, 'utf8');
    }
    
    /* Parcourir les fichiers dans un dossier
    function processDirectory(dir) {
        fs.readdirSync(dir).forEach(file => {
            const fullPath = path.join(dir, file);
            if (fs.lstatSync(fullPath).isDirectory()) {
                processDirectory(fullPath);
            } else if (file.endsWith('.js')) {
                processFile(fullPath);
            }
        });
    }
    
    // Lancer le script sur votre dossier routes
    processDirectory('./routes');*/

    // Middleware
    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'src')));

    // Middleware pour parser les formulaires et JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

    // Route pour afficher la page de connexion (connexion.html)
    app.get('/connexion', (req, res) => {
        res.sendFile(path.join(__dirname, 'src', 'connexion.html'));
    });

    // Route pour afficher la page d'inscription (inscription.html)
    app.get('/inscription', (req, res) => {
        res.sendFile(path.join(__dirname, 'src', 'inscription.html'));
    });

    // Route pour afficher la page index.html
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    // Vérifie si l'utilisateur existe déjà
    connection.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error('Erreur lors de la vérification de l\'email :', err);
            return res.status(500).send('Erreur serveur');
        }

        if (results.length > 0) {
            // Si l'email est déjà utilisé, envoie une réponse d'erreur et stoppe l'exécution
            return res.status(400).send('Cet e-mail est déjà utilisé.');
        }

        // Si l'email n'est pas déjà utilisé, hache le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insère l'utilisateur dans la base de données
        connection.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err, results) => {
            if (err) {
                console.error('Erreur lors de l\'inscription :', err);
                return res.status(500).send('Erreur serveur');
            }

            res.send('Inscription réussie. Vous pouvez maintenant vous connecter.');
        });
    });
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], async (err, results) => {
        if (err) {
            console.error('Erreur SQL :', err);
            return res.status(500).send('Erreur serveur.');
        }

        if (results.length === 0) {
            console.log('Identifiant incorrect.');
            return res.status(401).send('Identifiant incorrect.');
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Mot de passe incorrect.');
            return res.status(401).send('Mot de passe incorrect.');
        }

        // Création de la session pour l'utilisateur
        req.session.user = {
            id: user.id,
            email: user.email
        };

        console.log(`Connexion réussie pour l'utilisateur ${email}`);
        res.status(200).json({ message: 'Connexion réussie.' });
    });
});





app.get('/index.html', (req, res) => {
    if (!req.session || !req.session.user) {
        return res.redirect('/connexion.html');
    }
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/check-session', (req, res) => {
    if (req.session && req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
});



// Route de déconnexion
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Erreur lors de la déconnexion :', err);
            return res.status(500).send('Erreur lors de la déconnexion.');
        }

        res.clearCookie('connect.sid'); // Supprime le cookie de session
        console.log('Utilisateur déconnecté');
        res.status(200).send('Déconnexion réussie.');
    });
});

app.get('/logout', (req, res) => {
    // Supprimer le cookie de session ou invalider la session
    res.clearCookie('connect.sid'); // ou remplace par le nom de ton cookie si différent
    return res.redirect('/connexion.html'); // Redirige vers la page de connexion
});





    // Middleware pour parser les données des formulaires
app.use(express.urlencoded({ extended: true }));

// Middleware pour servir les fichiers statiques (CSS, JS, etc.)
app.use(express.static(path.join(__dirname)));

// Middleware pour vérifier si l'utilisateur est connecté
const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        next(); // L'utilisateur est connecté, continuer
    } else {
        res.redirect('/connexion.html'); // Redirige vers la page de connexion
    }
};

app.get('/', (req, res) => {
    if (!req.session || !req.session.user) {
        // Si l'utilisateur n'est pas connecté, redirige vers connexion.html
        return res.redirect('/connexion.html');
    }

    // Si l'utilisateur est connecté, charge index.html
    res.sendFile(__dirname + '/index.html');
});


// Page de connexion
app.get('/connexion.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'connexion.html'));
});

// Page d'inscription
app.get('/inscription.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'inscription.html'));
});

  
app.post('/user-data', isAuthenticated, (req, res) => {
    const userId = req.session.userId;
    const { data_type, data_value } = req.body;

    const query = 'INSERT INTO user_data (user_id, data_type, data_value) VALUES (?, ?, ?)';
    
    connection.query(query, [userId, data_type, data_value], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de l\'ajout des données' });
        }
        res.status(200).json({ message: 'Données ajoutées avec succès' });
    });
});

  

// Routes
app.get('/products', (req, res) => {
    connection.query('SELECT * FROM produits', (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des produits:', err);
            return res.status(500).json({ message: 'Erreur interne', error: err });
        }
        res.json(results);
    });
});

app.post('/update-product', (req, res) => {
    const { id, nom, achats, ventes, stock } = req.body;

    if (id === undefined || nom === undefined || achats === undefined || ventes === undefined || stock === undefined) {
        return res.status(400).json({ message: 'Toutes les données sont nécessaires' });
    }

    // Calculer le stock en fonction des achats et des ventes
    const newStock = achats - ventes;

    const query = `
        INSERT INTO produits (id, nom, achats, ventes, stock)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        nom = VALUES(nom), achats = VALUES(achats), ventes = VALUES(ventes), stock = VALUES(stock);
    `;

    connection.query(query, [id, nom, achats, ventes, newStock], (err, result) => {
        if (err) {
            console.error('Erreur lors de la mise à jour du produit :', err);
            return res.status(500).json({ message: 'Erreur interne', error: err });
        }
        res.json({ message: 'Produit mis à jour', product: { id, nom, achats, ventes, stock: newStock } });
    });
});


app.post('/add-product', (req, res) => {
    const { nom, achats, ventes, stock } = req.body;

    // Insérer le produit dans la base de données
    const query = 'INSERT INTO produits (nom, achats, ventes, stock) VALUES (?, ?, ?, ?)';
    connection.query(query, [nom, achats, ventes, stock], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'ajout du produit :', err);
            return res.status(500).json({ message: 'Erreur interne' });
        }

        // Si l'ajout a réussi, renvoyer un message de succès
        res.status(201).json({ message: 'Produit ajouté avec succès' });
    });
});


// Route pour supprimer un produit
// Route pour supprimer un produit
// Route pour supprimer un produit par son index
// Exemple pour le backend (Node.js avec Express)
app.delete('/delete-product/:id', (req, res) => {
    const productId = req.params.id;

    const query = 'DELETE FROM produits WHERE id = ?';
    connection.query(query, [productId], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression du produit :', err);
            return res.status(500).json({ message: 'Erreur interne' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }

        res.status(200).send('Pays supprimé avec succès.');
    });
});

// Fonction pour créer la table 'countries' si elle n'existe pas
function createCountriesTableIfNotExists() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS countries (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            revenue DECIMAL(15, 2) NOT NULL
        );
    `;
    connection.query(createTableQuery, (err, result) => {
        if (err) {
            console.error('Erreur lors de la création de la table "countries" :', err);
        } else {
            console.log('Table "countries" vérifiée ou créée avec succès');
        }
    });
}

// Route pour afficher la page de connexion (connexion.html)
app.get('/connexion', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'connexion.html'));
});

// Route pour afficher la page d'inscription (inscription.html)
app.get('/inscription', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'inscription.html'));
});

// Route pour gérer la soumission du formulaire d'inscription
app.post('/register', (req, res) => {
    const { email, password } = req.body;

    // Vérifie si l'email existe déjà
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            // L'email existe déjà
            res.send('Cet email est déjà utilisé.');
        } else {
            // Insère un nouvel utilisateur
            db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], (err, result) => {
                if (err) {
                    res.send('Erreur lors de l\'inscription.');
                    throw err;
                }
                // Redirige vers la page de connexion après inscription
                res.redirect('/connexion');
            });
        }
    });
});

// Route pour gérer la soumission du formulaire de connexion
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Vérifie les informations d'identification dans la base de données
    db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            // Connexion réussie
            res.send('Connexion réussie !');
        } else {
            // Identifiants incorrects
            res.send('Identifiants incorrects.');
        }
    });
});

// Route pour récupérer tous les pays
app.get('/api/countries', (req, res) => {
    console.log('Requête reçue sur /api/countries');
    const query = 'SELECT * FROM countries';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des pays:', err);
            return res.status(500).send('Erreur lors de la récupération des pays.');
        }
        res.json(results);
    });
});

// Route pour ajouter un nouveau pays
app.post('/api/countries', (req, res) => {
    const { name, revenue } = req.body;

    if (!name || !revenue) {
        return res.status(400).send('Le nom et le chiffre d\'affaires sont requis.'); // En cas de données manquantes
    }

    const query = 'INSERT INTO countries (name, revenue) VALUES (?, ?)';
    connection.query(query, [name, revenue], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erreur lors de l\'ajout du pays.');
        }

        // Renvoi d'un code 201 pour indiquer que le pays a été créé avec succès
        res.status(201).send('Pays ajouté avec succès.');
    });
});


// Route pour supprimer un pays
app.delete('/api/countries/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM countries WHERE id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erreur lors de la suppression du pays.');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Pays non trouvé.');
        }
        res.status(200).send('Pays supprimé avec succès.');
    });
});

app.post('/add-payment', (req, res) => {
    const { firstName, gender, amountPaid } = req.body;

    // Assurer que toutes les données sont présentes
    if (!firstName || !gender || amountPaid === undefined) {
        return res.status(400).send('Toutes les données sont nécessaires');
    }

    // Si le montant payé est 0, l'accepter comme valide
    const query = 'INSERT INTO payments (firstName, gender, amountPaid) VALUES (?, ?, ?)';
    connection.query(query, [firstName, gender, amountPaid], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'ajout du paiement :', err);
            return res.status(500).send('Erreur interne');
        }
        res.status(201).send('Paiement ajouté avec succès');
    });
});


app.get('/payments', (req, res) => {
    const query = 'SELECT * FROM payments';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des paiements :', err);
            return res.status(500).send('Erreur interne');
        }
        res.json(results);
    });
});

// Route pour supprimer un paiement
app.delete('/delete-payment/:id', (req, res) => {
    const paymentId = req.params.id;
    const query = 'DELETE FROM payments WHERE id = ?';
    connection.query(query, [paymentId], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression du paiement :', err);
            return res.status(500).send('Erreur lors de la suppression du paiement.');
        }
        res.status(200).send('Paiement supprimé avec succès.');
    });
});

app.post('/calculate', (req, res) => {
    const { price, isGrossiste, isPaiementComptant, isVenteEmportee, remise, escompte, fraisDePort, tva, total } = req.body;

    const query = `
        INSERT INTO calculations (price, isGrossiste, isPaiementComptant, isVenteEmportee, remise, escompte, fraisDePort, tva, total)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    connection.query(
        query,
        [price, isGrossiste, isPaiementComptant, isVenteEmportee, remise, escompte, fraisDePort, tva, total],
        (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'enregistrement du calcul :', err);
                res.status(500).send('Erreur lors de l\'enregistrement du calcul');
            } else {
                res.status(200).send('Calcul enregistré avec succès');
            }
        }
    );
});


app.delete('/delete-calculation/:id', (req, res) => {
    const id = req.params.id;

    const query = 'DELETE FROM calculations WHERE id = ?';
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression du calcul :', err);
            return res.status(500).json({ message: 'Erreur lors de la suppression' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Calcul introuvable' });
        }
        res.status(200).json({ message: 'Calcul supprimé avec succès' });
    });
});


app.get('/calculations', (req, res) => {
    const query = 'SELECT * FROM calculations';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des calculs :', err);
            return res.status(500).json({ message: 'Erreur lors de la récupération des calculs' });
        }
        res.status(200).json(results);
    });
});

// Endpoint pour ajouter les données
app.post('/ajouter', (req, res) => {
    const { annee, chiffreAffaire } = req.body;
    const query = 'INSERT INTO chiffres (annee, chiffreAffaire) VALUES (?, ?)';
    
    connection.query(query, [annee, chiffreAffaire], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'ajout des données :', err);
            res.status(500).send('Erreur lors de l\'ajout des données');
        } else {
            res.status(200).send('Donnée ajoutée avec succès');
        }
    });
});

// Endpoint pour récupérer les statistiques
app.get('/statistiques', (req, res) => {
    const query = 'SELECT annee, chiffreAffaire FROM chiffres';
    
    connection.query(query, (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération des données :', err);
            res.status(500).send('Erreur lors de la récupération des données');
        } else {
            const chiffres = result.map(row => row.chiffreAffaire);

            if (chiffres.length === 0) {
                return res.json({
                    minChiffreAffaire: null,
                    maxChiffreAffaire: null,
                    moyenne: null
                });
            }

            const minChiffreAffaire = Math.min(...chiffres);
            const maxChiffreAffaire = Math.max(...chiffres);
            const moyenne = (chiffres.reduce((acc, curr) => acc + curr, 0) / chiffres.length).toFixed(2);

            res.json({
                minChiffreAffaire,
                maxChiffreAffaire,
                moyenne
            });
        }
    });
});

// Endpoint pour récupérer toutes les données (affichage des lignes du tableau)
app.get('/donnees', (req, res) => {
    const query = 'SELECT id, annee, chiffreAffaire FROM chiffres'; // Inclure l'ID dans les résultats

    connection.query(query, (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération des données :', err);
            res.status(500).send('Erreur lors de la récupération des données');
        } else {
            res.json(result);
        }
    });
});


// Endpoint pour supprimer une donnée par ID
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).send('ID non fourni');
    }

    const query = 'DELETE FROM chiffres WHERE id = ?';

    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression :', err);
            res.status(500).send('Erreur lors de la suppression');
        } else if (result.affectedRows === 0) {
            res.status(404).send('Aucune donnée trouvée pour cet ID');
        } else {
            res.status(200).send('Donnée supprimée avec succès');
        }
    });
});

app.use((err, req, res, next) => {
    // Exemple de log pour le monitoring
    console.error(`[${new Date().toISOString()}] Erreur :`, err);

    // Réponse JSON standardisée
    res.status(500).json({
        type: 'error',
        message: "Une erreur interne est survenue.",
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});



// Démarrage du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});
