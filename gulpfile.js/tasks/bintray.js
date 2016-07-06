var gulp = require('gulp'),
var gulp = require('gulp');
var debug = require('gulp-debug');

    bintray = require('gulp-bintray'),
    props = require('properties-reader'),
    config = require('../config'),
    creds = props(process.env.HOME + "/.bintray/.credentials"),
    bintrayopts = {
    	username: creds._properties.user,
    	organization: 'equalexperts',
    	repository: 'uxforms-releases',
    	pkg: {
    		name: 'govuk'
    	},
    	apikey: creds._properties.password
    }

gulp.task('bintray', ['package'], function() {
	return gulp.src(config.TARGET_DIR + '/*.zip')
		.pipe(debug({title:'uxforms-debug'}))
	.pipe(bintray(bintrayopts));
})


gulp.task('default', function () {
	return gulp.src('foo.js')
		.pipe(debug({title: 'unicorn:'}))
		.pipe(gulp.dest('dist'));
});