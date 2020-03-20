#!groovy
@Library('lpfs-jenkins-shared-library@v2.0.1') _
def scmVars = ""

def SLACK_CHANNEL = '#cust-lpfs-usa'
def ACCOUNT_PROD = "146746827436"
def ACCOUNT_DEV = "911833893017"

// These lists have to match in size and order
def S3_BUCKET_PROD = [""]
def DISTRIBUTION_PROD = [""]
def REGION_PROD = ["us-east-1"]

def S3_BUCKET_STG = ["gm-scheduler.stg.fs.liveperson.com"]
def DISTRIBUTION_STG = ["EFJQUAE2B1YC5"]
def REGION_STG = ["us-east-1"]


// These lists have to match in size and order
def S3_BUCKET_DEV = ["gm-scheduler.dev.fs.liveperson.com"]
def DISTRIBUTION_DEV = ["E1Z5YZL3VY4B63"]
def REGION_DEV = ["us-east-1"]


def uploadAndInvalidate(REGION, ACCOUNT, S3_BUCKET, DISTRIBUTION) {
  withAWS(region:REGION, role:'jenkins-role', roleAccount:ACCOUNT) {
      // wipe bucket
      sh "aws s3 rm s3://${S3_BUCKET} --recursive"
      // upload everything from /dist
      s3Upload(bucket:S3_BUCKET, path:'', includePathPattern:'**/*', workingDir:'dist')
      // Invalidate CDN to get fresh deployment active
      cfInvalidate(distribution:DISTRIBUTION, paths:['/*'])
  }
}

pipeline {
    agent any
    stages {
        stage ('Build app') {
          steps {
            script {
              scmVars = checkout scm
            }
            sh "docker container rm -f extractbuild || true"
            sh "docker build -t gm-scheduler-frontend ."
            sh "docker container create --name extractbuild gm-scheduler-frontend"
            dir('dist') {
              // wipe old contents if still there
              deleteDir()
            }
            sh "docker container cp extractbuild:/liveperson/code/na-gm_scheduler-frontend/dist/ ."
            sh "docker container rm -f extractbuild"
          }
        }
        stage ('Deploy to S3 and Invalidate CDN') {
            steps {
                script {
                  def TAG = gitlib.get_tag()
                  if ("${TAG}" == scmVars.GIT_BRANCH) {
                    DEPLOY_TO = "production"
                    for (int i = 0; i < S3_BUCKET_PROD.size(); i++) {
                      uploadAndInvalidate("${REGION_PROD[i]}", ACCOUNT_PROD, "${S3_BUCKET_PROD[i]}", "${DISTRIBUTION_PROD[i]}")
                    }
                  }
                  else if (env.GIT_BRANCH == 'origin/master' || env.GIT_BRANCH == 'master') {
                    DEPLOY_TO = "staging"
                    for (int i = 0; i < S3_BUCKET_STG.size(); i++) {
                      uploadAndInvalidate("${REGION_STG[i]}", ACCOUNT_DEV, "${S3_BUCKET_STG[i]}", "${DISTRIBUTION_STG[i]}")
                    }
                  }
                  else {
                    DEPLOY_TO = "development"
                    for (int i = 0; i < S3_BUCKET_DEV.size(); i++) {
                      uploadAndInvalidate("${REGION_DEV[i]}", ACCOUNT_DEV, "${S3_BUCKET_DEV[i]}", "${DISTRIBUTION_DEV[i]}")
                    }
                  }
              }
            }
        }
    }
    post {
      failure {
        echo "failed"
        slackSend channel: SLACK_CHANNEL, color: 'bad', message: "${JOB_NAME} ${BUILD_DISPLAY_NAME} failed to deploy. See ${JOB_DISPLAY_URL} for details."
      }
      success {
        slackSend channel: SLACK_CHANNEL, color: 'good', message: "${JOB_NAME} ${BUILD_DISPLAY_NAME} successfully deployed to ${DEPLOY_TO}. See ${JOB_DISPLAY_URL} for details."
      }
    }
}