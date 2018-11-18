var gulp = require('gulp');
var react = require('gulp-react');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');

gulp.task('dev', function () {
  return gulp.src(['./src/react-apexcharts.jsx'])
    .pipe(react({
      es6module: true
    }))
    .pipe(concat('react-apexcharts.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('prod', function () {
  return gulp.src(['./src/react-apexcharts.jsx'])
    .pipe(react({
      es6module: true
    }))
    .pipe(babel({
      presets: ['es2015', 'react'],
      plugins: ['transform-object-rest-spread']
    }))
    .pipe(concat('react-apexcharts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build', ['dev', 'prod']);
gulp.task('default', ['dev', 'prod']);