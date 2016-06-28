var gulp = require('gulp'),
    config = require('../config'),
    sass = require('gulp-sass');

gulp.task('sass', function () {
    return gulp.src(config.SOURCE_DIR + '/scss/*.scss')
    	.pipe(sass({
        outputStyle: 'compressed',
				includePaths: [
					'./node_modules/govuk_frontend_toolkit/stylesheets',
					'./node_modules/govuk-elements-sass/public/sass'
				]
			}))
			.pipe(gulp.dest(config.TARGET_DIR + '/stylesheets'));
});
