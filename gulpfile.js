const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const sass = require('gulp-sass');
const wait = require('gulp-wait');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const svgSprite = require("gulp-svg-sprites"); //generate sprites for svg
const svg2png = require('gulp-svg2png');
const revReplace = require('gulp-rev-replace');
const runSequence = require('run-sequence');

// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

//CSS
const sassSource = 'src/scss/**/*.scss';
const cssDest = 'public/';
const sassOptions = { outputStyle: 'compressed' }; //expanded

// -----------------------------------------------------------------------------
// Compile CSS
// -----------------------------------------------------------------------------
gulp.task('sass', function () {
    return gulp.src(sassSource)
        .pipe(wait(500))
        .pipe(plumber())
        .pipe(sass(sassOptions))
        .pipe(postcss([autoprefixer()]))
        .pipe(gulp.dest(cssDest))
})

// -----------------------------------------------------------------------------
// Manage SVG
// -----------------------------------------------------------------------------
//Manage svg files:
// 1. Gathers the files in the src/svg directory and creates
// a sprite.svg and a _sprite.scss
gulp.task('sprites', function () {
    return gulp.src('src/scss/svg/*.svg')
        .pipe(svgSprite({
            cssFile: "_sprite.scss",
            svg: {
                sprite: "svg/sprite-v1.svg"
            }
        }))
        // .pipe(svg2png())
        .pipe(gulp.dest("src/scss/"))
})

// // 2. The sprite.svg gets copied first in the compiled (for development) and then in the dist/svg folder (for production) (the scss get compiled into app.css)
gulp.task('copy-svg', ['sprites'], function () {
    return gulp.src(['src/scss/svg/*.svg'])
        .pipe(revReplace())
        .pipe(gulp.dest('public/svg/'))
})

// -----------------------------------------------------------------------------
// Watchers
// -----------------------------------------------------------------------------
gulp.task('watch', ['sass'], function () {
    gulp.watch('src/scss/**/*.scss', ['sass'])
})

// -----------------------------------------------------------------------------
// Production build
// -----------------------------------------------------------------------------
gulp.task('build-production', function (callback) {
    runSequence(
        'sass',
        'copy-svg',
        callback
    )
})
