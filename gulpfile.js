const gulp       = require('gulp');
const browserify = require('browserify');
const source     = require('vinyl-source-stream');
const babelify   = require('babelify');
//const lint       = require('gulp-eslint')
// Shortcuts
const config = {
  paths: {
    html: './client/*.html',
    js: './client/**/*.js',
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
// Transform & bundle into the dist folder
gulp.task('js', function(){
  browserify(config.paths.appJs)
    .transform(babelify, {presets: ["es2015", "react", "stage-0"]})
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('app-bundle.js'))
    .pipe(gulp.dest(config.paths.dist + '/scripts'))
})
// Rebundle on .js & .html changes
gulp.task('watch', function() {
   gulp.watch(config.paths.html, ['html'])
   gulp.watch(config.paths.js, ['js'])
})
// 'default' bundles html, js, and css
// 'dev' bundles & runs the 'watch' task
gulp.task('default', ['html', 'js'])
gulp.task('dev', ['html', 'js', 'watch'])