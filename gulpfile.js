/*global require*/
// Include gulp
var gulp = require('gulp');
var runSequence = require('run-sequence');

// Include Our Plugins
var jshint = require('gulp-jshint'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    rename = require('gulp-rename'),
    regexRename = require('gulp-regex-rename'),
    mocha = require('gulp-mocha'),
    less = require('gulp-less'),
    path = require('path'),
    fork = require('child_process').fork,
    async = require('async'),
    wrap = require('gulp-wrap'),
    streamqueue = require('streamqueue');

// Path variables
var appPath = 'webapp/',
    libsPath = 'webapp/libs/',
	testPath = 'webapp/test/',
    stylesSubPath = 'styles/',
    distPath = 'dist/';


var environment = {
    NODE_ENV: 'development'
};


var appServer = {
    instance: {},

    path: 'server/app.js',

    start: function (callback) {
        console.log('starting appServer...');
        process.execArgv.push('--harmony');

        appServer.instance = fork(appServer.path, {
            silent: true,
            env: environment
        });
        appServer.instance.stdout.pipe(process.stdout);
        appServer.instance.stderr.pipe(process.stderr);

        if (callback) callback();
    },

    stop: function (callback) {
        console.log('try to stop server');
        if (appServer.instance.connected) {
            appServer.instance.on('exit', function () {
                console.log('exit triggered...');
                if (callback) callback();
            });
            return appServer.instance.kill('SIGINT');
        }
        if (callback) callback();
    },

    restart: function (event) {
        async.series([
            appServer.stop,
            appServer.start
        ]);
    }
};

gulp.task('app-server-restart', function (callback) {
    appServer.restart();
    callback();
});

gulp.task('app-server', function (callback) {
    async.series([
        appServer.start
    ], callback);
});


// Lint Task
gulp.task('lint', function () {
    'use strict';
    return gulp.src([appPath + '**/*.js', '!' + libsPath + '**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// copy html (root and partials)
gulp.task('html', function () {
    'use strict';
    return gulp.src([
            appPath + '**/*.html',
            '!' + libsPath + '**/*.html'
        ])
        .pipe(gulp.dest(distPath));
});

// copy web resources (icons, etc.)
gulp.task('web', function () {
    'use strict';
    var icons = gulp.src(appPath + stylesSubPath + 'icons/**/*')
        .pipe(gulp.dest(distPath + 'icons'));
    var fonts = gulp.src(appPath + stylesSubPath + 'fonts/**/*')
        .pipe(gulp.dest(distPath + 'css/fonts'));
    return (icons, fonts);
});

// copy libs (libs like angular etc.)
gulp.task('libs', function () {
    'use strict';
    return gulp.src(libsPath + '**/*')
        .pipe(gulp.dest(distPath + 'libs/'));
});

// Wrap, Concatenate & Minify JS
gulp.task('scripts', function () {
    'use strict';
    var jsFiles = gulp.src([
        appPath + 'app.js',
        appPath + '**/*.js',
        '!'+ libsPath + '**/*.js'
    ]);

    var envJsFile = gulp.src('conf_' + process.env.NODE_ENV + '.json')
        .pipe(wrap({ src: appPath + 'modules/environment/constants.js.template' }))
        .on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(rename('constants.js'));

    return streamqueue({ objectMode: true }, jsFiles, envJsFile)
        .pipe(wrap('(function(){\n"use strict";\n<%= contents %>\n})();'))
        .pipe(concat('all.js'))
        .pipe(gulp.dest(distPath + 'js'))
        .pipe(rename('all.min.js'))
        .pipe(ngAnnotate())
        .on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(uglify())
        .on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(gulp.dest(distPath + 'js'));
});

gulp.task('less', function () {
    return gulp.src(appPath + stylesSubPath + '**/*.less')
        .pipe(less())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('test-watch', function () {
    return gulp.src(testPath + '**/*.js', {
        read: false
    })
    .pipe(mocha({
        reporter: 'nyan'
    }));
});

gulp.task('test', function () {
    return gulp.src(testPath + '**/*.js', {
            read: false
        })
        .pipe(mocha({
            reporter: 'nyan'
        }))
        .once('end', function(){
            process.exit();
        });
});

// Watch Files For Changes
gulp.task('watch', function () {
    'use strict';
    gulp.watch([appPath + '**/*.js', '!'+appPath + 'libs/**/*.js'], ['lint', 'scripts']);
    gulp.watch(testPath + '**/*.js', ['lint', 'test-watch']);
    gulp.watch('node_modules/puzzle-*/**/*.js', ['test-watch', 'app-server-restart']);
    gulp.watch('app.js', ['test-watch', 'app-server-restart']);
    gulp.watch(appPath + stylesSubPath + '*.less', ['less']);
    gulp.watch(appPath + '/**/*.html', ['html']);
    gulp.watch(appPath + '/partials/*.html', ['html']);
});

gulp.task('build', function (callback) {
    runSequence(['lint', 'libs', 'web', 'html', 'less', 'scripts'], callback);
});

gulp.task('build-test-watch', function (callback) {
    runSequence(['lint', 'libs', 'web', 'html', 'less', 'scripts', 'test-watch'], callback);
});

// Default Task
gulp.task('default', function (callback) {
    runSequence(['build-test-watch'], ['app-server', 'watch'], callback);
});
// Production Task
gulp.task('live', function (callback) {
    runSequence('set-production', ['app-server'], callback);
});