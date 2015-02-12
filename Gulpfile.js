var gulp = require('gulp'); 
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var annotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');

var paths = {
  scripts: ['./client/app/**/*.js', '!./client/app/bower_components'],
  html: ['./client/**/*.html'],
  styles: ['./client/**/*.css'],
  server: ['./**/*.js'],
  images: []
};

// Lint Task
gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('all.min.js'))
    .pipe(annotate()) // (for angular dependency injection)
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
    .pipe(livereload())
    .pipe(notify({message: 'Scripts task complete'}));
});

gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(livereload());
});

gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(livereload());
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['lint', 'scripts']);
  gulp.watch(paths.html);
  gulp.watch(paths.styles);
  gulp.watch(paths.server);
});

gulp.task('livereload', function() {
  livereload.listen();
});

gulp.task('serve', function() {
  nodemon({'script': './server/server.js'});
});

// Build Task
gulp.task('build', ['scripts', 'lint']);

// Default Task
gulp.task('default', ['build', 'livereload', 'serve', 'watch']);
