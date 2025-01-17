pipeline {
    agent any
    environment {
        // Variables d'environnement si nécessaire
    }
    stages {
        stage('Checkout') {
            steps {
                // Récupérer le code depuis le dépôt GitHub
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    // Installer les dépendances (ici pour un projet Node.js)
                    sh 'npm install'  // Remplace cette ligne selon ton projet
                }
            }
        }
        stage('Build') {
            steps {
                // Par exemple, pour un projet Node.js
                sh 'npm run build'  // Remplace cette ligne selon ton projet
            }
        }
        stage('Test') {
            steps {
                // Exécuter les tests (selon ton projet)
                sh 'npm test'  // Remplace cette ligne selon ton projet
            }
        }
        stage('Deploy') {
            steps {
                // Déployer ton application (si nécessaire)
                sh 'node server.js'  // Remplace cette ligne selon ton projet
            }
        }
    }
    post {
        always {
            // Ce bloc s'exécute après le build, que ce soit un succès ou un échec
            echo 'Pipeline terminé'
        }
    }
}
