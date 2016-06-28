var gulp = require('gulp'),
    config = require('../config');


gulp.task('static:govuk:images', function(){
  return gulp.src('./node_modules/govuk_frontend_toolkit/images/**/*', { base: config.GOVUK_FRONTEND_TOOLKIT_DIR })
        .pipe(gulp.dest(config.TARGET_DIR));
})

gulp.task('static:govuk:javascripts', function(){
  return gulp.src('./node_modules/govuk_frontend_toolkit/javascripts/**/*', { base: config.GOVUK_FRONTEND_TOOLKIT_DIR })
        .pipe(gulp.dest(config.TARGET_DIR));
});

gulp.task('static:uxforms:images', function(){
  return gulp.src(config.SOURCE_DIR + '/static/images/**/*', { base: config.SOURCE_DIR + '/static' })
        .pipe(gulp.dest(config.TARGET_DIR));
});

gulp.task('static:uxforms:javascripts', function(){
  return gulp.src(config.SOURCE_DIR + '/static/javascripts/*', { base: config.SOURCE_DIR + '/static' })
        .pipe(gulp.dest(config.TARGET_DIR));
});

gulp.task('static:uxforms:govuk_template:stylesheets', function(){
  return gulp.src(config.SOURCE_DIR + '/static/stylesheets/**/*', { base: config.SOURCE_DIR + '/static' })
        .pipe(gulp.dest(config.TARGET_DIR));
});
gulp.task('static:uxforms:templates', function(){
  return gulp.src(config.SOURCE_DIR + '/static/templates/*', { base: config.SOURCE_DIR + '/static' })
        .pipe(gulp.dest(config.TARGET_DIR));
});

gulp.task('static:vendor:ie-html5shiv', function(){
	return gulp.src('./node_modules/html5shiv/dist/html5shiv-printshiv.js')
				.pipe(gulp.dest(config.TARGET_DIR + '/javascripts/vendor'));
});

gulp.task('static:vendor:json3', function(){
	return gulp.src('./node_modules/json3/lib/json3.min.js')
				.pipe(gulp.dest(config.TARGET_DIR + '/javascripts/vendor'));
});
gulp.task('static:vendor:jquery', function(){
	return gulp.src('./node_modules/jquery/dist/jquery.min.js')
				.pipe(gulp.dest(config.TARGET_DIR + '/javascripts/vendor/jquery'));
});


gulp.task('static',[
  'static:govuk:images',
  'static:govuk:javascripts',
  'static:uxforms:govuk_template:stylesheets',
  'static:uxforms:images',
  'static:uxforms:javascripts',
  'static:uxforms:templates',
  'static:vendor:ie-html5shiv',
  'static:vendor:json3',
  'static:vendor:jquery'
]);
