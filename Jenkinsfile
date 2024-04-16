pipeline {
    agent any

    environment {
        CONTAINER_NAME = "mycontainer-${BUILD_ID}"
        REGISTRY = "deepakchandmarthala/nodejs-project"
        TAG = "latest"
        REGISTRY_CREDENTIAL = 'Docker-Token' 
        DOCKER_IMAGE = ''
        PATH = "${env.PATH}:/usr/bin"
    }
    
    options {
        // Add cleanup options here
        buildDiscarder(logRotator(numToKeepStr: '20'))  // Keeps the last 5 builds, adjust as necessary
    }
    
    stages {
        stage("Git Checkout") {
            steps {
                echo "Retrieving Code.."
                git 'https://github.com/DeepakChandMarthala/NodeJs-Project.git'
            }
        }

        stage("Build Docker Image") {
            steps {
                echo "Building Docker Image.."
                script {
                    DOCKER_IMAGE = "${REGISTRY}:${TAG}"
                    sh "docker build -t ${DOCKER_IMAGE} ."
                }
            }
        }
    


       stage("Login to Docker Registry") {
            steps {
                echo "Logging in to Docker Registry.."
                script {
                    withCredentials([usernamePassword(credentialsId: REGISTRY_CREDENTIAL, usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh "echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin"
                    }
                }
            }
        }
    


       stage("Push Docker Image to Registry") {
            steps {
                echo "Pushing Docker Image to Registry.."
                sh "docker push ${DOCKER_IMAGE}"
            }
        }
    


        

        stage("Deploy in EC2") {
            steps {
                script {
                    sshagent(credentials: ['Deploy-Server']) {
                        withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')])
                         {
                            sh '''
                                ssh -v -o StrictHostKeyChecking=no -l ubuntu 100.25.144.76 \
                                "uname -a && \
                                whoami && \
                                echo logged into the node-server && \
                                ls && \
                                pwd && \
                                sudo ./script.sh"  
                            '''
                         }
                    }
                }
            }
        }
        stage("Testing")
        {
            steps{
                script{
                    echo "testing"
                    //sh 'which npm'
                    //sh 'npm install axios assert'
                    //sh "node test2.js"
                    sh 'docker run --rm -v $PWD:/app -w /app node:14 npm install axios assert'
                    sh 'docker run --rm -v $PWD:/app -w /app node:14 node test2.js'
                }
            }
         }

     }
    

    post {
        always {
            echo "Cleaning up..."
            sh "docker logout"
            // Optional: Uncomment the next line to prune Docker artifacts after build
            sh "docker system prune -a -f"
        }
    }
}


