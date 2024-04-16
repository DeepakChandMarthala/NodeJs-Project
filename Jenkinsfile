// pipeline {
//     agent any

//     environment {
//         CONTAINER_NAME = "mycontainer-${BUILD_ID}"
//         REGISTRY = "deepakchandmarthala/nodejs-project"
//         TAG = "latest"
//         REGISTRY_CREDENTIAL = 'docker-login' 
//         DOCKER_IMAGE = ''
        
//     }

    
//     stages {
//         stage("Git Checkout") {
//             steps {
//                 echo "Retrieving Code.."
//                 git 'https://github.com/DeepakChandMarthala/NodeJs-Project.git'
//             }
//         }

//         stage("Build Docker Image") {
//             steps {
//                 echo "Building Docker Image.."
//                 script {
//                     DOCKER_IMAGE = "${REGISTRY}:${TAG}"
//                     sh "docker build -t ${DOCKER_IMAGE} ."
//                 }
//             }
//         }
    


//        stage("Login to Docker Registry") {
//             steps {
//                 echo "Logging in to Docker Registry.."
//                 script {
//                     withCredentials([usernamePassword(credentialsId: REGISTRY_CREDENTIAL, usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
//                         sh "echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin"
//                     }
//                 }
//             }
//         }
    


//        stage("Push Docker Image to Registry") {
//             steps {
//                 echo "Pushing Docker Image to Registry.."
//                 sh "docker push ${DOCKER_IMAGE}"
//             }
//         }
    

        

//         stage("Deploy in EC2") {
//             steps {
//                 script {
//                     sshagent(credentials: ['Deploy-Server']) {
//                         withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
//                             sh '''
//                                 ssh -v -o StrictHostKeyChecking=no -l ubuntu 35.174.200.209 \
//                                 "uname -a && \
//                                 whoami && \
//                                 echo logged into the node-server && \
//                                 ls && \
//                                 pwd && \
//                                 ./script.sh"  
//                             '''
//                         }
//                     }
//                 }
//             }
//         }
//         stage("Testing")
//         {
//             steps{
//                 script{
//                     echo "testing"
//                     sh 'npm install axios assert'
//                   sh "node test2.js"
//                 }
//             }
//     }

//     }
    

//     post {
//         always {
//             echo "Cleaning up..."
//             sh "docker logout"
//             // Optional: Uncomment the next line to prune Docker artifacts after build
//             sh "docker system prune -a -f"
//         }
//     }
// }

pipeline {
    agent any

    environment {
        CONTAINER_NAME = "mycontainer-${BUILD_ID}"
        REGISTRY = "deepakchandmarthala/nodejs-project"
        TAG = "latest"
        REGISTRY_CREDENTIAL = 'docker-login' // ID of the credentials stored in Jenkins
        DOCKER_IMAGE = "${REGISTRY}:${TAG}"
        SONAR_URL = "http://52.90.116.100:9000"
    }

    stages {
        stage("Git Checkout") {
            steps {
                echo "Retrieving Code.."
                git 'https://github.com/DeepakChandMarthala/NodeJs-Project.git'
            }
        }

        stage("SonarQube Analysis") {
            steps {
                withSonarQubeEnv('sonar-server') {
                    withCredentials([string(credentialsId: 'jenkins', variable: 'TOKEN')]) {
                        sh '''
                        sonar-scanner \
                        -Dsonar.projectKey=NodeJsProject \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=http://52.90.144.29:9000 \
                        -Dsonar.login=sqp_a01a079e61a762c343c9ee5107b5096342d1ca9d
                        '''
                    }
                }
            }
        }

       stage("Build Docker Image") {
            steps {
                echo "Building Docker Image.."
                script {
                    sh "docker build -t $DOCKER_IMAGE ."
                }
            }
        }

        stage("Login to Docker Registry") {
            steps {
                echo "Logging in to Docker Registry.."
                script {
                    withCredentials([usernamePassword(credentialsId: REGISTRY_CREDENTIAL, usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh "echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin"
                    }
                }
            }
        }

        stage("Push Docker Image to Registry") {
            steps {
                echo "Pushing Docker Image to Registry.."
                sh "docker push $DOCKER_IMAGE"
            }
        }

        stage("Deploy in EC2") {
            steps {
                script {
                    sshagent(credentials: ['Deploy-Server']) {
                        withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                            sh '''
                            ssh -v -o StrictHostKeyChecking=no -l ubuntu 34.201.68.90 \
                            "uname -a && \
                            whoami && \
                            echo logged into the node-server && \
                            ls && \
                            pwd && \
                            ./script.sh"
                            '''
                        }
                    }
                }
            }
        }

        stage("Testing") {
            steps {
                script {
                    echo "Testing the deployment"
                    sh 'npm install axios assert'
                    sh "node test2.js"
                }
            }
        }
    }

    post {
        always {
            echo "Cleaning up..."
            sh "docker logout"
            sh "docker system prune -a -f"
        }
    }
}
