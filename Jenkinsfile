pipeline {
    agent any
    tools {
        nodejs 'NodeJS' // Correspond au nom de ton installation NodeJS dans Jenkins
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Test Node.js and npm') {
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
        }
        
        stage('Debug Environment') {
            steps {
                sh 'printenv'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install || exit 1' // Installer les dépendances et arrêter si erreur
                    sh 'echo "npm install completed with exit code $?"'
                }
            }
        }
        
        stage('Run Application') {
            steps {
                script {
                    sh 'node server.js || exit 1' // Lancer l'application et arrêter si erreur
                }
            }
        }
    }
    post {
        always {
            echo 'Pipeline terminé'
        }
        failure {
            echo 'Une erreur est survenue dans le pipeline.'
        }
    }
}
