var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    pkg = require('../../package.json'),
    Bintray = require('bintray'),
    bump = require('gulp-bump'),
    config = require('../config'),
    fs = require('fs');

gulp.task('release', function(d) {
    return runSequence(
        'clean',
        'package',
        'bintray',
        'bump'
    );
});

gulp.task('bintray', function() {
    var artifactName = pkg.name + '-' + pkg.version + '.zip';
    var localFile = config.TARGET_DIR + '/' + artifactName;
    var remotePath = '/files/x86/' + artifactName;

    var homeDir = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
    var credentialsFile = fs.readFileSync(homeDir + '/.bintray/.credentials', 'utf8')
        .split('\n')              // split into lines
        .filter(x => x)           // filter out empty lines
        .map(x => x.split(' = ')) // split lines on equals
        .reduce((p, c) => {       // convert to object
            p[c[0]] = c[1];
            return p;
        }, {});

    var repository = new Bintray({
        username: credentialsFile.user,
        apikey: credentialsFile.password,
        organization: 'equalexperts',
        repository: 'uxforms-releases'
    });

    return repository.uploadPackage(pkg.name, pkg.version, localFile, remotePath, true, false)
        .then(function(response) {
            if (response.code !== 201) {
                throw new Error(response.data);
            } else {
                console.log("File uploaded successfully");
            }
        }).catch(function(error) {
            console.error('Cannot upload the file:', error.code);
            throw error;
        });
})

gulp.task('bump', function() {
    return gulp.src('./package.json')
        .pipe(bump({type:'minor'}))
        .pipe(gulp.dest('./'));
});
