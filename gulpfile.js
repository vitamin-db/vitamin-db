const gulp       = require('gulp');
const uglify     = require('gulp-uglify');
const browserify = require('browserify');
const source     = require('vinyl-source-stream');
const buff     = require('vinyl-buffer');
const babelify   = require('babelify');
//const lint       = require('gulp-eslint')
// Shortcuts
const config = {
  paths: {
    html: './client/*.html',
    js: './client/**/*.js',
    css: './client/style.css',
    img: './client/img/*.png',
    dist: './dist',
    appJs: './client/app.js'
  }
}
// Copy & pastes index.html into the dist folder
gulp.task('html', function(){
  gulp.src(config.paths.html)
    .on('error', console.error.bind(console))
    .pipe(gulp.dest(config.paths.dist))
})
gulp.task('css', function(){
  gulp.src(config.paths.css)
    .on('error', console.error.bind(console))
    .pipe(gulp.dest(config.paths.dist))
})
gulp.task('img', function(){
  gulp.src(config.paths.img)
    .on('error', console.error.bind(console))
    .pipe(gulp.dest(config.paths.dist + '/img'))
})
// Transform & bundle into the dist folder
// convert the "stream" into a buffered vinyl file object
// gulp buffer modifies the vinyl file which let's uglify(and many gulp plugins) works
gulp.task('jsdev', function(){
  browserify(config.paths.appJs)
    .transform(babelify, {presets: ["es2015", "react", "stage-0"]})
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('app-bundle.js'))
    .pipe(gulp.dest(config.paths.dist + '/scripts'))
})
gulp.task('js', function(){
  browserify(config.paths.appJs)
    .transform(babelify, {presets: ["es2015", "react", "stage-0"]})
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('app-bundle.js'))
    .pipe(buff())
    .pipe(uglify())
    .pipe(gulp.dest(config.paths.dist + '/scripts'))
})
// Rebundle on .js & .html changes
gulp.task('watch', function() {
   gulp.watch(config.paths.html, ['html'])
   gulp.watch(config.paths.js, ['js'])
   gulp.watch(config.paths.css, ['css'])
})
// 'default' bundles html, js
// 'dev' bundles & runs the 'watch' task
gulp.task('default', ['html', 'js', 'css', 'img'])
gulp.task('dev', ['html', 'jsdev', 'css', 'img', 'watch'])