pipeline {
    agent any
    tools {
        nodejs 'NodeJS'  // Assurez-vous que 'NodeJS' correspond au nom du tool que tu as configuré dans Jenkins
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
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
