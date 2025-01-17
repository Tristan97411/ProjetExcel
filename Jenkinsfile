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
