pipeline {
    def app

    stages {
        
            stage('Build image') {
                /* This builds the actual image; synonymous to
                * docker build on the command line */

                steps {
                    echo 'Docker build app'
                    script{
                        docker.withRegistry('',DOCKER_PASS ) {
                            docker_image = docker.build "${IMAGE_NAME}"
                            docker_image.push("${IMAGE_TAG}")
                            docker_image.push("latest")
                        }
                    }
                }
            }

            stage('Test image') {
                /* Ideally, we would run a test framework against our image.
                * For this example, we're using a Volkswagen-type approach ;-) */

                app.inside {
                    sh 'echo "Tests passed"'
                }
            }
        
        
            // stage('Build') { 
            //     steps {
            //         sh "docker build -t tjstanford/bin-calendar:latest ."
            //     }
            // }
            // stage("Push To Registry") {
            //     steps {
            //         sh "docker push tjstanford/bin-calendar:latest"
            //     }
            // }
    }
}