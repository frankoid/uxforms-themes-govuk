var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    pkg = require('../../package.json'),
    Bintray = require('bintray'),
    bump = require('gulp-bump'),
    config = require('../config');

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

    var repository = new Bintray({
        username: process.env.BINTRAY_USERNAME,
        apikey: process.env.BINTRAY_API_KEY,
        organization: process.env.BINTRAY_ORGANIZATION,
        repository: process.env.BINTRAY_REPOSITORY
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
        });
})

gulp.task('bump', function() {
    return gulp.src('./package.json')
        .pipe(bump({type:'minor'}))
        .pipe(gulp.dest('./'));
});
