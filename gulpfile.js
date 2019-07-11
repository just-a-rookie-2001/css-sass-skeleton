var gulp = require('gulp');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var del = require('del');
var minify = require('gulp-minifier');
var cleanCSS = require('gulp-clean-css');
var stripCssComments = require('gulp-strip-css-comments');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
//var argv    = require('yargs').argv;


var PATHS = {
    appCSS: [
    'assets/scss/main.scss'
    ],

    vendorJS: [
    /*Vendor scripts*/
    'assets/js/jquery.min.js',
    'assets/js/vendor/*.js',
    ],

    appJS: [
    'assets/js/general.js'
    ]
}

gulp.task('clean', function () {
    return del([
        'public/css/main.css',
        'public/js/main.js'
        ]);
});

gulp.task('sass', function () {
    return gulp.src(PATHS.appCSS)
    .pipe(plumber({
        errorHandler: function (err) {
            notify.onError({
                title: "Gulp error in " + err.plugin,
                message: err.toString()
            })(err);
            gutil.beep();
        }
    }))
    .pipe(sass())
    .pipe(concat('main.css'))
    .pipe(cleanCSS({
        compatibility: 'ie8'
    }))
    .pipe(stripCssComments({
        preserve: false
    }))
    .pipe(minify({
        minify: true,
        minifyCSS: true
    }))
    .pipe(gulp.dest('public/css'))
    .on('end', function () {
        livereload.changed('main.css');
    }) 
});

gulp.task('vendorJS', function () {
    return gulp.src(PATHS.vendorJS)
    .pipe(plumber({
        errorHandler: function (err) {
            notify.onError({
                title: "Gulp error in " + err.plugin,
                message: err.toString()
            })(err);
            gutil.beep();
        }
    }))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('public/js/'));
});

gulp.task('customJS', function () {
    return gulp.src(PATHS.appJS)
    .pipe(plumber({
        errorHandler: function (err) {
            notify.onError({
                title: "Gulp error in " + err.plugin,
                message: err.toString()
            })(err);
            gutil.beep();
        }
    }))
    .pipe(concat('main.js'))
    .pipe(minify({
        minify: true,
        minifyJS: true
    }))
    .pipe(gulp.dest('public/js/'));
});

gulp.task('images', function () {
    return gulp.src('assets/images/**/*.!(db)')
    .pipe(gulp.dest('public/images'));
});
gulp.task('fonts', function () {
    return gulp.src('assets/fonts/**/*')
    .pipe(gulp.dest('public/fonts'))
});

gulp.task('livereload', function () {
    livereload.reload();
});

gulp.task('build', function (cb) {
    runSequence('clean', ['sass', 'vendorJS', 'customJS', 'images', 'fonts'], cb);
});

gulp.task('default', ['build'], function () {
    livereload.listen();
    gulp.watch(['assets/js/**/*.js'], ['customJS']);
    gulp.watch(['assets/scss/**/*.scss'], ['sass']);
    gulp.watch(['assets/images/**/*'], ['images']);
    gulp.watch(['assets/fonts/**/*'], ['fonts']);
    gulp.watch(['assets/**'], ['livereload']);
});