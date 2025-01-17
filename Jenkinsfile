pipeline {
    agent any  // Exécute le pipeline sur n'importe quel agent disponible

    environment {
        // Définir des variables d'environnement si nécessaire
        NODE_ENV = 'production'
    }

    stages {
        // Étape 1 : Cloner le dépôt
        stage('Checkout') {
            steps {
                // Cloner le dépôt GitHub
                git url: 'https://github.com/Tristan97411/ProjetExcel.git'
            }
        }

        // Étape 2 : Installer les dépendances
        stage('Install Dependencies') {
            steps {
                script {
                    // Assurer que les dépendances sont installées
                    sh 'npm install'
                }
            }
        }

        // Étape 3 : Lancer les tests (si tu en as)
        stage('Run Tests') {
            steps {
                script {
                    // Lancer les tests unitaires si tu en as
                    sh 'npm test'
                }
            }
        }

        // Étape 4 : Déployer l'application (exemple)
        stage('Deploy') {
            steps {
                script {
                    // Exemple : Déploiement sur un serveur (tu devras personnaliser cette étape selon ton environnement)
                    sh 'node server.js'
                }
            }
        }
    }

    post {
        success {
            echo 'le serveur lancé avec succès !'
        }
        failure {
            echo 'Le serveur a échoué.'
        }
    }
}
