var gulp = require('gulp'),
    runSequence = require('run-sequence');
// Work in progress - fails when uploading to bintray
gulp.task('release', function(d) {
	runSequence(
		'bump-version',
		'commit-changes',
		'push-changes',
		'create-new-tag'
		// ,
		// 'bintray'
	)
})

// gulp.task('bump', function() {
// 	return gulp.src('./package.json')
// 		.pipe(bump({type:'minor'}))
// 		.pipe(gulp.dest('./'))
// });