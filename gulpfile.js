var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('sass', function () {
    gulp.src('./source/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./target/css'));
});

gulp.task('clean', function(c) {
    del(['target'], c);
});

gulp.task('default', ['clean'], function(d) {
	runSequence('sass', d);
});
