var gulp = require('gulp');
var zip = require('gulp-zip');
var bintray = require('gulp-bintray');
var clean = require('gulp-clean');
var bump = require('gulp-bump');

var bintrayopts = {
	username: 'sebpaterson',
	organization: 'equalexperts',  // default: username
	repository: 'uxforms-releases',
		pkg: {
		name: 'govuk',
		// version: '0.1.0',            // default: package.version
		desc: 'Automatically created gulp-bintray package'
	},
	apikey: '9f68eed391cdc8cca7613a07ab2b639066d01b8b'
	// baseUrl: null;                // default: Bintray.apiBaseUrl
};

// gulp.task('bump', function() {
// 	return gulp.src('./package.json')
// 		.pipe(bump({type:'minor'}))
// 		.pipe(gulp.dest('./'))
// });

gulp.task('bintray', ['bump'], function() {
	return gulp.src(config.TARGET_DIR + '/*.zip')
		// .pipe(zip('archive.zip'))
		.pipe(gulp.dest('.'))
		.pipe(bintray(bintrayopts))
		.pipe(clean())
});

// gulp.task('release', ['bump', 'bintray' ], function() {
// 	console.log('Released minor version ' + require('./package.json').version);
// });
//
// var gulp = require('gulp');
// var debug = require('gulp-debug');
//
//     bintray = require('gulp-bintray'),
//     props = require('properties-reader'),
//     config = require('../config'),
//     creds = props(process.env.HOME + "/.bintray/.credentials"),
//     bintrayopts = {
//     	username: creds._properties.user,
//     	organization: 'equalexperts',
//     	repository: 'uxforms-releases',
// 		debug:true,
//     	pkg: {
//     		name: 'govuk'
//     	},
//     	apikey: creds._properties.password,
//     }
//
// gulp.task('bintray', ['package'], function() {
// 	return gulp.src(config.TARGET_DIR + '/*.zip')
// 		.pipe(debug({title:'uxforms-debug'}))
// 	.pipe(bintray(bintrayopts));
// })
//
//
// gulp.task('default', function () {
// 	return gulp.src('foo.js')
// 		.pipe(debug({title: 'unicorn:'}))
// 		.pipe(gulp.dest('dist'));
// });