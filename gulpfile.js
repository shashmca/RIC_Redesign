var gulp = require('gulp');
var sass = require('gulp-sass');
var config = require('./config');

gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'));
});