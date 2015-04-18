var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var runSequence = require('run-sequence');
var tar = require('gulp-tar');
var gzip = require('gulp-gzip');

gulp.task('sass', function () {
    gulp.src('./source/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./target/stylesheets'));
});

gulp.task('static', function() {
	gulp.src('./source/static/**')
	.pipe(gulp.dest('./target'));
})

gulp.task('clean', function(c) {
    del(['target'], c);
});

gulp.task('package', ['sass', 'static'], function(p) {
	gulp.src('./target/**')
		.pipe(tar('govuk.tar'))
		.pipe(gzip())
		.pipe(gulp.dest('./target/'))
})

gulp.task('default', ['clean'], function(d) {
	runSequence(['sass', 'static'], 'package', d);
});
