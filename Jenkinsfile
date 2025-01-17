pipeline {
    agent any
    stages {
        stage('Test Node.js and npm') {
            steps {
                script {
                    sh 'node -v || echo "Node.js n\'est pas installé ou est inaccessible."'
                    sh 'npm -v || echo "npm n\'est pas installé ou est inaccessible."'
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }
        stage('Start Application') {
            steps {
                script {
                    sh 'node server.js'
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
