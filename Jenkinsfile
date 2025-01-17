pipeline {
    agent any
    tools {
        nodejs 'NodeJS' // Remplacez 'NodeJS' par le nom de votre configuration Node.js
    }
    environment {
        NODE_ENV = 'development'
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/Tristan97411/ProjetExcel.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Unit Tests') {
            steps {
                sh 'npm test'
            }
        }
        stage('Run Integration Tests') {
            steps {
                sh 'npm run test:integration'
            }
        }
        stage('Build Project') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy to Staging') {
            steps {
                sh 'npm run deploy:staging'
            }
        }
        stage('Deploy to Production') {
            steps {
                sh 'npm run deploy:prod'
            }
        }
    }
    post {
        always {
            echo 'Pipeline terminé'
        }
        success {
            echo 'Build et tests réussis'
        }
        failure {
            echo 'Échec du pipeline'
        }
    }
}
