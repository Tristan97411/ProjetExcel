pipeline {
    tools {
        nodejs 'NodeJS'  // Assure-toi que 'NodeJS' est configuré correctement dans Jenkins
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Verify Node.js and npm') {
            steps {
                script {
                    sh 'node -v'
                    sh 'npm -v'
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'  // Exécute npm install pour installer les dépendances
                }
            }
        }
        stage('Deploy') {
            steps {
                sh 'node server.js'  // Lance le serveur Node.js pour le déploiement
            }
        }
    }
    post {
        always {
            echo 'Pipeline terminé'
        }
    }
}
