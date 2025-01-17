pipeline {
    agent any
    tools {
        nodejs 'NodeJS' // Configurer dans Global Tool Configuration
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/Tristan97411/ProjetExcel.git' // Remplacez par votre dépôt
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Unit Tests') {
            steps {
                bat 'npm test' // Ajoutez vos tests unitaires ici
            }
        }
        stage('Integration Tests') {
            steps {
                bat 'npm run test:integration' // Configurez vos tests d'intégration dans le projet
            }
        }
        stage('Build') {
            steps {
                bat 'node server.js' // Compilez ou construisez le projet
            }
        }
        stage('Deploy to Staging') {
            steps {
                bat 'echo Déploiement sur staging...' // Remplacez par vos commandes de déploiement
            }
        }
    }
    post {
        success {
            echo 'Build et déploiement réussis.'
        }
        failure {
            echo 'Une erreur est survenue.'
        }
    }
}
