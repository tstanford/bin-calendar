pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = "dockerHubCredentials" 
        KUBECONFIG = "/var/jenkins_home/.kube/config"
        IMAGE_NAME = "bin-calendar"
        IMAGE_TAG = "1.0.${BUILD_NUMBER}"
    }
    stages {

        stage('Build and Push Docker Image') {
            steps {
                script {
                    echo ${env.GIT_COMMIT}
                    withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDENTIALS, usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                        docker.withRegistry('https://hub.docker.com/') {
                            sh "docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}"
                            sh "docker build -t ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${IMAGE_TAG} ."
                            sh "docker push ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${IMAGE_TAG}"
                        }
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    withEnv(["KUBECONFIG=${KUBECONFIG}"]) {                        
                        sh "sed -i 's|\${TAG}|${IMAGE_TAG}|' deployment.yaml"
                        sh "kubectl apply -f deployment.yaml"
                        sh "kubectl apply -f service.yaml"
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