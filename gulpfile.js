var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var runSequence = require('run-sequence');
var zip = require('gulp-zip');
var pkg = require('./package.json');
var bump = require('gulp-bump');
var git = require('gulp-git');
var props = require('properties-reader');
var fs = require('fs');
var bintray = require("gulp-bintray");

var TARGET_DIR = './target';
var SOURCE_DIR = './source';

var creds = props(process.env.HOME + "/.bintray/.credentials");

var bintrayopts = {
	username: creds._properties.user,
	organization: 'equalexperts',
	repository: 'uxforms-releases',
	pkg: {
		name: 'govuk'
	},
	apikey: creds._properties.password
}

function artifactName(extension) {
	return pkg.name + '-' + pkg.version + extension
}

gulp.task('sass', function () {
    return gulp.src(SOURCE_DIR + '/scss/*.scss')
    	.pipe(sass({
				includePaths: [
					'./node_modules/govuk_frontend_toolkit/stylesheets',
					'./node_modules/govuk-elements-sass/public/sass'
				]
			}))
			.pipe(gulp.dest(TARGET_DIR + '/stylesheets'));
});

gulp.task('static', function() {
	return gulp.src(SOURCE_DIR + '/static/**')
				.pipe(gulp.dest(TARGET_DIR));
})

gulp.task('clean', function(c) {
    return del(TARGET_DIR, c);
});

gulp.task('bump-version', function() {
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

gulp.task('check-status', function(d) {
	git.status({args: '--porcelain'}, function (err, stdout) {
	    if (err) throw err;
	  });
})

gulp.task('commit-changes', function () {
  return gulp.src('.')
    .pipe(git.add())
    .pipe(git.commit('[Prerelease] Bumped version number'));
});

gulp.task('push-changes', function (cb) {
  git.push('origin', 'master', cb);
});

gulp.task('create-new-tag', function (cb) {
  var version = getPackageJsonVersion();
  git.tag(version, 'Created Tag for version: ' + version, function (error) {
    if (error) {
      return cb(error);
    }
    git.push('origin', 'master', {args: '--tags'}, cb);
  });

  function getPackageJsonVersion () {
    // We parse the json file instead of using require because require caches
    // multiple calls so the version number won't be updated
    return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
  };
});


gulp.task('bintray', ['package'], function() {
	return gulp.src(TARGET_DIR + '/*.zip')
	.pipe(bintray(bintrayopts));
})

// Work in progress - fails when uploading to bintray
gulp.task('release', function(d) {
	runSequence(
		'bump-version',
		'commit-changes',
		'push-changes',
		'create-new-tag',
		'bintray'
	)
})
