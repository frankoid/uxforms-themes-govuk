var gulp = require('gulp'),
    runSequence = require('run-sequence');
// Work in progress - fails when uploading to bintray
gulp.task('release', function(d) {
	runSequence(
		'bump-version',
		'commit-changes',
		'push-changes',
		'create-new-tag',
		'bintray'
	)
})
