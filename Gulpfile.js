// TODO: refactor with gulp-load-plugins
var annotate = require('gulp-ng-annotate');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var gutil = require('gulp-util');
var inject = require('gulp-inject');
var jshint = require('gulp-jshint');
var karma = require('gulp-karma');
var minifyCss = require('gulp-minify-css');
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var phantom = require('gulp-phantom');
var preprocess = require('gulp-preprocess');
var reload = browserSync.reload;
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var wiredep = require('wiredep').stream;
var runSequence = require('run-sequence');
var ngHtml2Js = require('gulp-ng-html2js');
var minifyHtml = require('gulp-minify-html');

// Define commonly used paths for files.
var paths = {
  scripts: ['./client/app/**/*.js',
            '!./client/app/**/*.spec.js',
            './client/components/**/*.js',
            '!./client/components/**/*.spec.js',
            '!./client/bower_components'],
  html: ['./client/**/*.html'],
  styles: ['./client/app/**/*.css',
           './client/components/**/*.css',
           '!./client/bower_components'],
  server: ['./server/*.js',
           './server/**/*.js'],
  vendors: ['./client/bower_components/**/*.min.*'],
  images: []
};

gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(reload({stream:true}));
});

gulp.task('clean', function(cb) {
  del('dist', cb);
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(concat('all.min.js'))
    .pipe(annotate()) // (for angular dependency injection)
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(concat('all.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist'))
});

gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(minifyHtml())
    .pipe(ngHtml2Js())
    .pipe(gulp.dest('dist/partials'))
    .pipe(concat('templates.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['lint', 'index']);
  gulp.watch(paths.vendors, ['index']);
  gulp.watch(paths.html, ['index'], reload({stream: true}));
  gulp.watch(paths.styles, ['index'], reload({stream: true}));
  gulp.watch(paths.server, ['index'], reload({stream: true}));
});

gulp.task('browserSync', function() {
  browserSync.init({
    proxy: 'http://localhost:8080',
    port: 3333
  });
});

// Building the index file with all its dependencies injected
gulp.task('index', function () {
  var target = gulp.src('./client/index.html');
  var all = paths.styles.concat(paths.scripts, paths.vendors);
  // don't actual read the files (speed boost)
  var sources = gulp.src(all, {read: false});
  return target.pipe(inject(sources, { ignorePath: '/client/' }))
    .pipe(wiredep())
    .pipe(gulp.dest('./client'));
});

gulp.task('nodemon', function() {
  nodemon({'script': './server/server.js'});
});

// Creates new test user & plan in the dB
gulp.task('seed', function() {
  nodemon({'script': './tests/testSeed.js'});
});

// Mocha for back-end tests
gulp.task('mocha', function() {
  return gulp.src('server/**/*.spec.js')
    .pipe(mocha({ reporter: 'nyan' }))
    // .once('error', function () { process.exit(); })
    // .once('end', function () { process.exit(); });
});

// Karma for front-end tests
gulp.task('karma', function() {
  return gulp.src('client/**/*.spec.js')
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) { throw err; });
});

gulp.task('test', ['lint', 'karma', 'mocha']);

// TODO: concat and minify vendor scripts.
gulp.task('build', ['test'], function() {
  runSequence('clean', ['scripts', 'styles', 'html'], function(err) {
    if(err) { console.log('BUILD ERROR:', err); }
    del('dist/partials');
    gulp.src('./client/index.html')
    .pipe(preprocess({context: { NODE_ENV: 'production' }}))
    .pipe(gulp.dest('dist'));
    gulp.src('./client/bower_components')
    .pipe(gulp.dest('dist'));
    notify({message: 'Build complete'});
  });
});

// Run local server instance.
gulp.task('serve', function() {
  runSequence('index', // inject bower, css, and js
              'test',
              'nodemon',
              'browserSync',
              'watch');
});

// Detects process.env and runs appropriate service.
gulp.task('default', function() {
  if(process.env.NODE_ENV === 'production'){
    runSequence('build');
  } else {
    //todo: preprocess index.html?
    runSequence('serve');
  }
});
