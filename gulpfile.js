// Gulpfile

var del = require('del');
var gulp = require('gulp');
var sass = require('gulp-sass');
var data = require('gulp-data');
var imagemin = require('gulp-imagemin')
var browserSync = require('browser-sync').create();
var nunjucksRender = require('gulp-nunjucks-render');

// Serve - Starts the server and watch files changes
gulp.task('serve', ['sass', 'js', 'nunjucks', 'images'], function() {
  browserSync.init({
    server: {baseDir: './dist'},
    open: false
  });

  gulp.watch('src/scss/**/*.scss', ['sass-watch']);
  gulp.watch('src/images/**/*', ['images-watch']);
  gulp.watch('src/js/**/*.js', ['js-watch']);
  gulp.watch('src/templates/**/*.html', ['nunjucks-watch']);
});

// Build - Builds project for production
gulp.task('build', ['sass', 'js', 'nunjucks', 'images-prod']);

// Nunjucks
gulp.task('nunjucks', function() {
  return gulp
    .src('src/templates/*.html')
    .pipe(data(function() {
      return require('./src/data.json')
    }))
    .pipe(nunjucksRender({
      path: ['src/templates/layouts', 'src/templates/partials']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('nunjucks-watch', ['nunjucks'], function(done) {
    browserSync.reload();
    done();
});

// SASS
gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass()).on('error', sass.logError)
    .pipe(gulp.dest('dist/css'));
});

gulp.task('sass-watch', ['sass'], function(done) {
    browserSync.reload();
    done();
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/*')
    .pipe(gulp.dest('dist/images'))
});

gulp.task('images-prod', function() {
  return gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
});

gulp.task('images-watch', ['images'], function(done) {
    browserSync.reload();
    done();
});

// Javascript
gulp.task('js', function() {
  return gulp.src('src/js/*')
    .pipe(gulp.dest('dist/js'))
});

gulp.task('js-watch', ['js'], function(done) {
    browserSync.reload();
    done();
});

// Clean - Deletes the dist folder
gulp.task('clean', function() {
  return del(['dist']);
});

// Default task
gulp.task('default', ['serve']);
