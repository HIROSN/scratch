'use strict';
var gulp = require('gulp');

var rimraf = require('gulp-rimraf');

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

  gulp.src([paths.scripts, paths.styles, paths.html], {cwd: paths.src})
    .pipe(gulp.dest(paths.dist));
});

// Define the default task as a sequence of the above tasks
gulp.task('default', [
  'clean',
  'copy'
]);
