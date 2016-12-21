var gulp = require('gulp'),
    sass = require('gulp-sass'),
    del = require('del'),
    server = require('gulp-server-livereload'),
    livereload = require('gulp-livereload'),
    handlebars = require('gulp-handlebars'),
    wrap = require('gulp-wrap'),
    declare = require('gulp-declare'),
    concat = require('gulp-concat');

config = require('./config.json');

gulp.task('styles', function() {
    gulp.src(config.sassDir)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(config.styleDir));
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src('src/scripts/**/*.js, !src/scripts/libs')
        //.pipe(jshint('.jshintrc'))
        //.pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

// Templates
gulp.task('templates', function() {
    gulp.src('source/templates/*.hbs')
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'MyApp.templates',
            noRedeclare: true, // Avoid duplicate declarations 
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('build/js/'));
});

// Clean
gulp.task('clean', function() {
    return del(['dist/styles', 'dist/scripts', 'dist/images']);
});

gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(server({
            livereload: true,
            directoryListing: false,
            open: true,
            defaultFile: './index.html'
        }));
});

// Default task
gulp.task('default', ['webserver', 'watch'], function() {
    gulp.start('styles');
});

// Watch
gulp.task('watch', function() {

    // Watch .scss files
    //gulp.watch(config.dirConfig.sassDir, ['styles']);

    // Create LiveReload server
    livereload.listen();

    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);

});
