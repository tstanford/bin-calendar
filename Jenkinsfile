pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = "dockerHubCredentials" 
        KUBECONFIG = "/var/jenkins_home/.kube/config"
        IMAGE_NAME = "bin-calendar"
        IMAGE_TAG = "1.1.${BUILD_NUMBER}"
    }
    stages {

        stage('Build and Push Docker Image') {
            steps {
                script {
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
                        sh "curl https://get.helm.sh/helm-v3.19.0-linux-amd64.tar.gz | tar -zxf"
                        sh "linux-amd64/helm install --generate-name ./helmchart --set image.tag=${IMAGE_TAG}"

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
