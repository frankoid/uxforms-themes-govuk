import groovy.json.*
import static groovy.json.JsonParserType.LAX as RELAX

//Need setting
def name = "govuk"
def proj = "themes-"  //can be set to nothing
def bin_repo = "uxforms-releases"

//Calculated
def repo = "uxforms-"+proj+name  // e.g. uxforms-formdef-patternlibrary
def workspace = env.JENKINS_HOME+"/workspace/"+env.JOB_NAME  // e.g. the workspace dir

// See https://github.com/dblock/jenkins-ansicolor-plugin#using-in-pipeline-workflows
node { wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'XTerm']) {

    def CommittDiff

    stage ('Checkout') {
    try {
        // Get some code from bitbucket
        sh 'rm -rf ./.git ./*'
        git credentialsId: "1981dc28-d11d-4eb8-9ff0-c6d686a93303", url: "https://bitbucket.org/uxforms/${repo}.git"
        sh "rm -Rf /tmp/headCommit$name /tmp/JenkinsLastCommit$name /tmp/CommittDiff$name"         // Get the SHA1 from Jenkins last commit
        sh "ls -al '$workspace'"
        sh "git log --author=Jenkins --pretty=%H | head -n 1 > /tmp/JenkinsLastCommit$name"
        def JenkinsLastCommit = readFile('/tmp/JenkinsLastCommit'+name).trim()
        sh "git log --pretty=%H | head -n 1 > /tmp/HeadCommit$name"
        def headCommit = readFile('/tmp/HeadCommit'+name).trim()
        sh 'echo ${headCommit} ${JenkinsLastCommit}' //Diff Jenkins last commit with the current HEAD

        if (JenkinsLastCommit == "") { //If Jenkins has never committed then dont fail.
            CommittDiff = "there's a commit"
        } else {
            sh "git diff $headCommit $JenkinsLastCommit > /tmp/CommittDiff$name"
            CommittDiff = readFile('/tmp/CommittDiff'+name).trim()
        }
    } catch (err) {
        notify("danger", "checkout failed")
        currentBuild.result = 'FAILURE'
        throw err
    }
    }

    if (CommittDiff == ""  && BuildMe == "") {
        return currentBuild.result = 'SUCCESS' // set result to success as most recent commit is the one by Jenkins
    }

    stage ('Build') {
    try {
        sh '''npm install
        gulp package'''
    } catch (err) {
        notify("danger", "build failed")
        currentBuild.result = 'FAILURE'
        throw err
    }
    }

    def version_file_string = readFile("$workspace/package.json").trim()
    def version_no = getVersionNo(version_file_string)
    echo "Version number is ${version_no}"

    stage ('Release') {
    try {
        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: '1981dc28-d11d-4eb8-9ff0-c6d686a93303', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USER']]) {
            // Add creds to be able to commit back
            sh '''git config remote.origin.fetch +refs/heads/*:refs/remotes/origin/*
                git config branch.master.remote origin
                git config branch.master.merge refs/heads/master'''
            sh '''git config --local credential.helper "store --file=/tmp/jenkins/.gitcreds"
                mkdir -p /tmp/jenkins
                echo "https://${GIT_USER}:${GIT_PASSWORD}@bitbucket.org/uxforms/${repo}.git" >> /tmp/jenkins/.gitcreds'''
            sh '''export SBT_OPTS="${SBT_OPTS} -Dsbt.jse.engineType=Node -Dsbt.jse.command=$(which nodejs)"
                npm install
                gulp release'''
        }
    } catch (err) {
        notify("danger", "release failed")
        currentBuild.result = 'FAILURE'
        throw err
    }
    }

    stage ('Deploy') {
    try {
        sleep 30
        build job: 'Static-Deployer Deployer', parameters: [[$class: 'StringParameterValue', name: 'enviro', value: 'dev'], [$class: 'StringParameterValue', name: 'name', value: "${name}"], [$class: 'StringParameterValue', name: 'repo', value: "${bin_repo}"], [$class: 'StringParameterValue', name: 'version_no', value: "${version_no}"]]
        notify("good", "${repo} deployed to dev")
    } catch (err) {
        notify("danger", "${repo} deployment to dev failed")
        currentBuild.result = 'FAILURE'
        throw err
    }
    }
}}

def notify(String c, String m) {
    slackSend(color: c, message: "<${env.BUILD_URL}|${env.JOB_NAME} ${env.BUILD_NUMBER}> " + m)
}

@NonCPS
def getVersionNo(String curly) {
    def json = new JsonSlurper().setType(RELAX).parseText(curly)
    return json.version
}
