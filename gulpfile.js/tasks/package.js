var gulp = require('gulp'),
    pkg = require('../../package.json'),
    config = require('../config'),
    zip = require('gulp-zip');

gulp.task('package', ['sass', 'static'], function() {
	function artifactName(extension) {
		return pkg.name + '-' + pkg.version + extension
	}
	return gulp.src(config.TARGET_DIR + '/**')
			.pipe(zip(artifactName('.zip')))
			.pipe(gulp.dest(config.TARGET_DIR))
});
