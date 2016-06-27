var gulp = require('gulp'),
    bintray = require('gulp-bintray'),
    props = require('properties-reader'),
    config = require('../config'),
    creds = function(){},//props(process.env.HOME + "/.bintray/.credentials"),
    bintrayopts = {
    // 	username: creds._properties.user,
    // 	organization: 'equalexperts',
    // 	repository: 'uxforms-releases',
    // 	pkg: {
    // 		name: 'govuk'
    // 	},
    // 	apikey: creds._properties.password
    }

gulp.task('bintray', ['package'], function() {
	return gulp.src(config.TARGET_DIR + '/*.zip')
	.pipe(bintray(bintrayopts));
})
