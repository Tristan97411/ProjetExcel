pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm // Cela récupère le code depuis ton repository
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    npm install
                    sh 'echo "Installation des dépendances"'  // Juste pour tester, change ceci par 'npm install' ou ce qui est nécessaire pour ton projet
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
                node server.js
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
