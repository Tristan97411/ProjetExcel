pipeline {
    agent any
    tools {
        nodejs 'NodeJS'  // Assure-toi que le nom ici correspond à celui configuré dans Jenkins
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'  // Installe les dépendances de ton projet
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    sh 'npm test'  // Exécute les tests (si ton projet en a)
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    sh 'node server.js'  // Lance ton application
                }
            }
        }
    }
    post {
        always {
            echo 'Pipeline terminé'
        }
    }
}
