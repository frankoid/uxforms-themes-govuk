var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var runSequence = require('run-sequence');
var zip = require('gulp-zip');
var pkg = require('./package.json');
var bump = require('gulp-bump')

var TARGET_DIR = './target';
var SOURCE_DIR = './source';

function artifactName(extension) {
	return pkg.name + '-' + pkg.version + extension
}

gulp.task('sass', function () {
    return gulp.src(SOURCE_DIR + '/scss/*.scss')
        	.pipe(sass())
			.pipe(gulp.dest(TARGET_DIR + '/stylesheets'));
});

gulp.task('static', function() {
	return gulp.src(SOURCE_DIR + '/static/**')
				.pipe(gulp.dest(TARGET_DIR));
})

gulp.task('clean', function(c) {
    return del(TARGET_DIR, c);
});

gulp.task('bump', function() {
    return gulp.src('./package.json')
        .pipe(bump({type:'minor'}))
        .pipe(gulp.dest('./'));
});

gulp.task('package', ['sass', 'static'], function() {
	return gulp.src(TARGET_DIR + '/**')
			.pipe(zip(artifactName('.zip')))
			.pipe(gulp.dest(TARGET_DIR))
});

gulp.task('default', ['clean'], function(d) {
	return runSequence('package', d);
});
