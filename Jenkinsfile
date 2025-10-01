pipeline {

    agent any

    stages {
            stage('Build') { 
                steps {
                    sh "docker build -t tjstanford/bin-calendar:latest ."
                }
            }
            stage("Push To Registry") {
                steps {
                    sh "docker push tjstanford/bin-calendar:latest"
                }
            }
    }
}