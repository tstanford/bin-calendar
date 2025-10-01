pipeline {

stages {
        stage('Build') { 
            steps {
                docker build -t tjstanford/bin-calendar:latest .
            }
        }
        stage("Push To Registry") {
            steps {
                docker push tjstanford/bin-calendar:latest
            }
        }
}