
//Need setting
    def name = "govuk"
    def proj = "themes-"  //can be set to nothing

//Calculated
    def repo = "uxforms-"+proj+name  // e.g. uxforms-formdef-patternlibrary
    def workspace = env.JENKINS_HOME+"/workspace/"+env.JOB_NAME  // e.g. the workspace dir

node {
    stage 'Checkout'
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
        def CommittDiff
        if (JenkinsLastCommit == "") { //If Jenkins has never committed then dont fail.
            CommittDiff = "there's a commit"
        } else {
            sh "git diff $headCommit $JenkinsLastCommit > /tmp/CommittDiff$name"
            CommittDiff = readFile('/tmp/CommittDiff'+name).trim()
        }
        if (CommittDiff == ""  && BuildMe == "") {
            return currentBuild.result = 'SUCCESS' // set result to success as most recent commit is the one by Jenkins
        }
    } catch (err) {
        notify("danger", "checkout failed")
        currentBuild.result = 'FAILURE'
        throw err
    }

    stage 'Build'
    try {
        sh '''npm install
        gulp package'''
    } catch (err) {
        notify("danger", "build failed")
        currentBuild.result = 'FAILURE'
        throw err
    }

    stage 'Release'
    try {
        sh '''export SBT_OPTS="${SBT_OPTS} -Dsbt.jse.engineType=Node -Dsbt.jse.command=$(which nodejs)"
        npm install
        gulp release'''
        notify("good", "${repo} deployed to dev")
    } catch (err) {
        notify("danger", "${repo} deployment to dev failed")
        currentBuild.result = 'FAILURE'
        throw err
    }

    stage 'Deploy'
    try {
//        This needs to hit the static-deployer jenkins job
//        sh '''wget --method PUT --header 'content-type: application/json' --header 'authorization: UXFORMS-TOKEN apikey="4960eaac-52a9-4302-8e84-ae7ee9b1b690"' --body-file=target/govuk-0.1.0.zip http://static-deployer.dev.uxforms.com/themes/govuk'''
        notify("good", "${repo} deployed to dev")
    } catch (err) {
        notify("danger", "${repo} deployment to dev failed")
        currentBuild.result = 'FAILURE'
        throw err
    }
}

def notify(String c, String m) {
//    slackSend(color: c, message: "<${env.BUILD_URL}|${env.JOB_NAME} ${env.BUILD_NUMBER}> " + m)
}