var gulp = require('gulp');
var zip = require('gulp-zip');
var bintray = require('gulp-bintray');
var NodeBintray = require('bintray');
var clean = require('gulp-clean');
var pkg = require('../../package.json');

props = require('properties-reader'),
creds = props(process.env.HOME + "/.bintray/.credentials"),
config = require('../config');

var bintrayopts = {
	username: creds._properties.user,
	organization: 'equalexperts',
	repository: 'uxforms-releases',
		pkg: {
		name: 'govuk',
		desc: 'Automatically created gulp-bintray package'
	},
	apikey: creds._properties.password
};



gulp.task('publish', ['bintray'], function(callback) {
	var myBintray = new NodeBintray(bintrayopts);
	myBintray.publishPackage(pkg.name, pkg.version);
	callback();
});

gulp.task('bintray', ['package'], function() {
	return gulp.src(config.TARGET_DIR +'/*.zip') //
		.pipe(gulp.dest('.'))
		.pipe(bintray(bintrayopts))
		.pipe(clean())
	// .pipe(bintray(publish))
});