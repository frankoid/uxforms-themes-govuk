var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var runSequence = require('run-sequence');
var tar = require('gulp-tar');
var gzip = require('gulp-gzip');
var pkg = require('./package.json');

var TARGET_DIR = './target';

function artifactName(extension) {
	return pkg.name + '-' + pkg.version + extension
}

gulp.task('sass', function () {
    return gulp.src('./source/scss/*.scss')
        	.pipe(sass())
			.pipe(gulp.dest(TARGET_DIR + '/stylesheets'));
});

gulp.task('static', function() {
	return gulp.src('./source/static/**')
				.pipe(gulp.dest(TARGET_DIR));
})

gulp.task('clean', function(c) {
    return del(TARGET_DIR, c);
});

gulp.task('package', ['sass', 'static'], function() {
	return gulp.src(TARGET_DIR + '/**')
			.pipe(tar(artifactName('.tar')))
			.pipe(gzip())
			.pipe(gulp.dest(TARGET_DIR))
});

gulp.task('default', ['clean'], function(d) {
	runSequence('package', d);
});
