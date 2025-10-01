pipeline {
    agent { node { label 'agent-dind' } }
    environment {
        // Define Docker Hub credentials ID stored in Jenkins credentials store
        DOCKERHUB_CREDENTIALS = 'dockerHubCredentials' 
        IMAGE_NAME = 'bin-calendar'
        IMAGE_TAG = 'latest'
    }
    stages {
        stage('Build and Push Docker Image') {
            steps {
                script {
                    // Load Docker Hub credentials from Jenkins credentials store
                    withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDENTIALS, usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                        docker.withRegistry('https://hub.docker.com/') {
                            // Login to Docker Hub
                            sh "docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}"
                            // Build Docker image
                            sh "docker build -t ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${IMAGE_TAG} ."
                            // Push Docker image to Docker Hub
                            sh "docker push ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${IMAGE_TAG}"
                        }
                    }
                }
            }
        }
    }
    post {
        always {
            echo 'Pipeline finished'
        }
    }
}