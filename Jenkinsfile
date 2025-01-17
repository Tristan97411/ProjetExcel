pipeline {
    agent any
    tools {
        nodejs 'NodeJS' // Utilise le nom configuré dans Global Tool Configuration
    }
    stages {
        stage('Check Node.js') {
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
        }
    }
}
