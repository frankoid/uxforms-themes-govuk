var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del')

gulp.task('sass', function () {
    gulp.src('./source/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./target/css'));
});

gulp.task('clean', function(c) {
    del(['target'], c);
});

gulp.task('default', ['clean'], function() {
	gulp.start('sass');
});
