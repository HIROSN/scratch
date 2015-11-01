'use strict';
var gulp = require('gulp');

var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var rimraf = require('gulp-rimraf');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');

var paths = {
  src: 'src/',
  dist: 'dist/',

  scripts: 'js/**/*.js',
  styles: 'css/**/*.css',
  html: 'html/**/*.html',
  images: 'img/**/*.*',

  libs: [
    'angular/angular.min.js',
    'angular-resource/angular-resource.min.js'
  ],

  extras: [
    'manifest.json'
  ]
};

// Lint scripts
gulp.task('lint', function() {
  return gulp.src(paths.scripts, {cwd: paths.src})
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jscs())
    .pipe(jscs.reporter())
    .pipe(jshint.reporter('fail'))
    .pipe(jscs.reporter('fail'));
});

// Delete the dist directory
gulp.task('clean', function() {
  return gulp.src(paths.dist, { read: false })
    .pipe(rimraf());
});

// Copy static files to dist
gulp.task('copy', ['clean'], function() {
  gulp.src(paths.images, {cwd: paths.src})
    .pipe(gulp.dest(paths.dist));

  gulp.src(paths.libs, {cwd: 'node_modules/'})
    .pipe(gulp.dest(paths.dist));

  gulp.src(paths.extras)
    .pipe(gulp.dest(paths.dist));

  gulp.src([paths.styles, paths.html], {cwd: paths.src})
    .pipe(gulp.dest(paths.dist));
});

// Minify scripts
gulp.task('uglify', ['clean'], function() {
  return gulp.src(paths.scripts, {cwd: paths.src})
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist));
});

// Define the default task as a sequence of the above tasks
gulp.task('default', [
  'lint',
  'clean',
  'copy',
  'uglify'
]);
