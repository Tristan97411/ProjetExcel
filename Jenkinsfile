pipeline {
    agent any
    tools {
        nodejs 'NodeJS' // Nom de l'installation dans Jenkins
    }
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Application') {
            steps {
                sh 'node server.js'
            }
        }
    }
}
