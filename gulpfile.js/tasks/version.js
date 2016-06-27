var gulp = require('gulp'),
    bump = require('gulp-bump');

gulp.task('bump-version', function() {
    return gulp.src('./package.json')
        .pipe(bump({type:'minor'}))
        .pipe(gulp.dest('./'));
});
