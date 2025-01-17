pipeline {
    agent any
    tools {
        nodejs 'NodeJS' // Nom configuré dans Global Tool Configuration
    }
    stages {
        stage('Check Node.js') {
            steps {
                bat 'node -v'
                bat 'npm -v'
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Run Application') {
            steps {
                bat 'node server.js'
            }
        }
    }
    post {
        always {
            echo 'Pipeline terminé.'
        }
    }
}
