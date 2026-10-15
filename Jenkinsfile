pipeline {
  agent any
  environment {
    IMAGE = 'sebasvalve/pipeline-demo'
    TAG = "${env.BUILD_NUMBER}"
  }
  stages {
    stage('Install') {
      steps { sh 'npm ci' }
    }
    stage('Test') {
      steps { sh 'npm test' }
    }
    stage('Build') {
      steps { sh 'npm run build' }
    }
    stage('Docker build') {
      steps { sh 'docker build -t $IMAGE:$TAG -t $IMAGE:latest .' }
    }
    stage('Push a Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub',
                         usernameVariable: 'DH_USER', passwordVariable: 'DH_PASS')]) {
          sh 'echo "$DH_PASS" | docker login -u "$DH_USER" --password-stdin'
          sh 'docker push $IMAGE:$TAG'
          sh 'docker push $IMAGE:latest'
        }
      }
    }
    stage('Deploy local') {
      steps {
        sh '''
          docker rm -f pipeline-demo-ci || true
          docker run -d --name pipeline-demo-ci -p 3001:3000 $IMAGE:$TAG
        '''
      }
    }
  }
  post {
    always { sh 'docker logout || true' }
  }
}