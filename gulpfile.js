const { src, dest, series, parallel, watch } = require('gulp');
const del = require('del');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

function clear(){
    return del(['dist/js/*', 'dist/css/*', 'dist/*.html'])
}

function javascriptCompiler(){
    return src('src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(dest('dist/js/'))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(dest('dist/js/'));
}

function sassCompiler(){
    return src("src/sass/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('dist/css/'))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(dest('dist/css/'));
}

function pugCompiler(){
    return src("src/views/*.pug")
        .pipe(pug({
            doctype: 'html',
            pretty: false
         }))
        .pipe(dest("dist/"))
}

function reloadPage(cb){
    browserSync.reload();
    cb();
}

const buildProcess = series(clear, parallel(javascriptCompiler, sassCompiler, pugCompiler))

exports.watch = function(){
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    watch("src/**", series(buildProcess, reloadPage));
};

exports.build = buildProcess;