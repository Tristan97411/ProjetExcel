pipeline {
    agent any
    tools {
        nodejs "NodeJS"  // Assurez-vous d'avoir un tool nommé "NodeJS" configuré dans Jenkins
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm // Récupère le code depuis ton repository
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'  // Exécute npm install pour installer les dépendances
                }
            }
        }
        stage('Test') {
            steps {
                // Si tu as des tests à exécuter, ajoute-les ici
                sh 'echo "Running tests"'
            }
        }
        stage('Deploy') {
            steps {
                sh 'node server.js'  // Lancer le serveur node.js pour le déploiement
                sh 'echo "Deploying application"'
            }
        }
    }
    post {
        always {
            echo 'Pipeline terminé'
        }
    }
}
