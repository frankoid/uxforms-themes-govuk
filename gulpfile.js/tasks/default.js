var gulp = require('gulp');


gulp.task('default', ['clean'], function(d) {
	return runSequence('package', d);
});
