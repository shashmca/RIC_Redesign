var gulp = require('gulp'),
    sass = require('gulp-sass'),
    del = require('del'),
    server = require('gulp-server-livereload'),
    livereload = require('gulp-livereload'),
    handlebars = require('gulp-handlebars'),
    wrap = require('gulp-wrap'),
    declare = require('gulp-declare'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin'),

    config = require('./config.json');

gulp.task('styles', function() {
    gulp.src(config.input.sassDir)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest(config.output.styleDir));
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src(config.input.jsDir) //!src/scripts/libs
        //.pipe(jshint('.jshintrc'))
        //.pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest(config.output.jsDir))
        .pipe(rename({ suffix: '.min' }))
        //.pipe(uglify())
        .pipe(gulp.dest(config.output.jsDir))
        .pipe(notify({ message: 'Scripts task complete' }));
});

// Templates
gulp.task('templates', function() {
    gulp.src(config.input.templateDir)
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'MyApp.templates',
            noRedeclare: true, // Avoid duplicate declarations 
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(config.output.jsDir));
});

// Images
gulp.task('images', function() {
    return gulp.src(config.input.imagesDir)
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest(config.output.imagesDir))
        .pipe(notify({ message: 'Images task complete' }));
});

// Fonts
gulp.task('fonts', function() {
    return gulp.src(config.input.fontsDir)
        .pipe(gulp.dest(config.output.fontsDir))
        .pipe(notify({ message: 'Fonts task complete' }));
});

// Clean
gulp.task('clean', function() {
    return del([config.output.jsDir, config.output.styleDir, config.output.imagesDir, config.output.fontsDir]);
});

// Webserver
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
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'templates', 'images', 'fonts', 'webserver', 'watch');
});

// Watch
gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch(config.input.sassDir, ['styles']);

    // Watch .js files
    gulp.watch(config.input.jsDir, ['styles']);

	// Watch .hbs files
    gulp.watch(config.input.templateDir, ['styles']);

    // Create LiveReload server
    livereload.listen();

    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);

});
