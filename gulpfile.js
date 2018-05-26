var gulp = require('gulp')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var gutil = require('gulp-util')
var browserify = require('browserify')
var hbsfy = require('hbsfy')
var source = require('vinyl-source-stream')
var streamify = require('gulp-streamify')
var less = require('gulp-less')
var csso = require('gulp-csso')

gulp.task('javascript', function () {
  hbsfy.configure({
    extensions: ['hbs']
  })

  browserify('src/js/modal-lov.js', {debug: true})
    .on('error', gutil.log)
    .transform(hbsfy)
    .on('error', gutil.log)
    .bundle()
    .on('error', gutil.log)
    .pipe(source('modal-lov.js'))
    .pipe(gulp.dest('dist/'))
    .pipe(streamify(uglify()))
    .on('error', gutil.log)
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/'))
    .on('error', gutil.log)
})

gulp.task('less', function () {
  return gulp.src('./src/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('dist/'))
    .pipe(gulp.dest('dist/'))
    .pipe(csso())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/'))
})

gulp.task('default', ['javascript', 'less'], function () {
  gulp.watch([
    'src/js/modal-lov.js',
    'src/js/templates/**/*.hbs'
  ], ['javascript'])
  gulp.watch([
    'src/less/*.less'
  ], ['less'])
})
