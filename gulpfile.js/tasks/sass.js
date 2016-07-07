var gulp = require('gulp'),
    config = require('../config'),
    sass = require('gulp-sass'),
    preprocess = require('gulp-preprocess'),
    pkg = require('../../package.json');

gulp.task('sass', function () {
    var settings = {
      THEME_NAME : pkg.name
    }
    return gulp.src(config.SOURCE_DIR + '/scss/*.scss')
    	.pipe(sass({
        outputStyle: 'compressed',
				includePaths: [
					'./node_modules/govuk_frontend_toolkit/stylesheets',
					'./node_modules/govuk-elements-sass/public/sass'
				]
			}))
      .pipe(preprocess({context: settings}))
			.pipe(gulp.dest(config.TARGET_DIR + '/stylesheets'));
});
