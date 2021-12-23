const { src, dest, watch, parallel } = require('gulp'); 

// CSS
const sass = require('gulp-sass')(require('sass')); 
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

// JavaScript
const terser = require('gulp-terser-js'); 

// Images
// const cache = require('gulp-cache');
// const imagemin = require('gulp-imagemin');
// const webp = require('gulp-webp'); 
// const avif = require('gulp-avif');


function css(done) {
    src('src/scss/**/*.scss') // Identify the .SCSS file to compile
        .pipe( sourcemaps.init() )
        .pipe( plumber() )
        .pipe( sass() ) // Compile it 
        .pipe( postcss([autoprefixer(), cssnano()]) ) 
        .pipe( sourcemaps.write('.') )
        .pipe( dest('build/css') ) // Store it in the HDD
        done();
}

// function images( done ) {
//     const options = {
//         optimizationLevel: 3
//     }
//     src('src/img/**/*{jpg,jpeg,png}')
//         .pipe( cache( imagemin(options) ) )
//         .pipe( dest('build/img'))
//     done();
// }

// function versionWebp( done ) {
//     const options = {
//         quality: 50
//     };
//     src('src/img/**/*{jpg,jpeg,png}')
//         .pipe( webp(options) )
//         .pipe( dest('build/img') )
//     done();
// }

// function versionAvif( done ) {
//     const options = {
//         quality: 50
//     };
//     src('src/img/**/*{jpg,jpeg,png}')
//         .pipe( avif(options) )
//         .pipe( dest('build/img') )
//     done();
// }

function javascript( done ) {
    src('src/js/**/*.js')
        .pipe( sourcemaps.init() )
        .pipe( terser() )
        .pipe( sourcemaps.write('.') )
        .pipe( dest('build/js') )
    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
    done();
}

exports.css = css;
exports.js = javascript;
// exports.images = images;
// exports.versionWebp = versionWebp;
// exports.versionAvif = versionAvif;
exports.dev = dev;
// exports.dev = parallel( images, versionWebp, versionAvif, javascript, dev );
exports.dev = parallel( javascript, dev );