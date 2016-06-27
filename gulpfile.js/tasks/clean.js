var gulp = require('gulp'),
    config = require('../config'),
    del = require('del');

gulp.task('clean', function(c) {
    return del(config.TARGET_DIR, c);
});
