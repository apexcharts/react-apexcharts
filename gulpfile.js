const { src, dest, series, parallel } = require('gulp');
const react = require('gulp-react');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

function dev() {
  return (
    src(['./src/react-apexcharts.jsx'])
      .pipe(react({
        es6module: true
      }))
      .pipe(concat('react-apexcharts.js'))
      .pipe(dest('./dist/'))
  );
}

function prod() {
  return (
    src(['./src/react-apexcharts.jsx'])
      .pipe(react({
        es6module: true
      }))
      .pipe(babel({
        presets: ['es2015', 'react'],
        plugins: ['transform-object-rest-spread']
      }))
      .pipe(concat('react-apexcharts.min.js'))
      .pipe(uglify())
      .pipe(dest('./dist/'))
  );
}

function types() {
  return (
    src(['./types/react-apexcharts.d.ts'])
      .pipe(dest('./dist/'))
  );
}

exports.build = parallel(dev, prod, types);
exports.default = series(dev, prod, types);
