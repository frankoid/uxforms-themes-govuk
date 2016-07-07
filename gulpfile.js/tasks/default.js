var gulp = require('gulp');
var runSequence = require('run-sequence');


gulp.task('default', ['clean'], function(d) {
	return runSequence('package', d);
});
