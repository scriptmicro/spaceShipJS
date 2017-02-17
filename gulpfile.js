var gulp = require('gulp');
var clean = require('gulp-rimraf');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var image = require('gulp-image');
var gulpCopy = require('gulp-copy');
var htmlreplace = require('gulp-html-replace');


gulp.task('clean', function() {
	console.log("Clean all files in build folder");
	return gulp.src("./build/*", { read: false }).pipe(clean());
});


gulp.task('compress', ['clean'], function(){
    return gulp.src(['./scripts/scriptMicro/scriptMicro.js', 
                    './scripts/scriptMicro/shapeBuilder.js', 
                    './scripts/scriptMicro/utilities.js',
                    './scripts/scriptMicro/directives/*.js'])
        .pipe(concat('concat.js'))
        //.pipe(gulp.dest('./build/scripts/scriptMicro/'))
        .pipe(rename('scriptMicro.min.js'))
        //.pipe(uglify())//I WISH I COULD GET THIS WORKING, CODING WITH DAN
        .pipe(gulp.dest('./build/scripts/scriptMicro/'));
});

gulp.task('movejs', ['compress'], function(){
    return gulp.src(['./scripts/angularJS/**/*', './scripts/greenSock/**/*'])
        .pipe(gulpCopy('./build/scripts/', { prefix: 1 }))

});



gulp.task('css', ['movejs'], function(){
    return gulp.src(['./css/*.css'])
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(rename('index.min.css'))
        .pipe(gulp.dest('./build/css/'));
});


gulp.task('html', ['css'], function() {
  return gulp.src('./templates/*.html')
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest('./build/templates'));
});


gulp.task('index', ['html'], function() {
  return gulp.src('index.html')
    .pipe(htmlreplace({
        'css': 'css/index.min.css',
        'js': 'scripts/scriptMicro/scriptMicro.min.js'
        //'script': 'scripts/scriptMicro/scriptMicro.min.js'
    }))
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest('./build/'));
});


gulp.task('images', ['index'], function() {
  return gulp.src('./images/*')
    .pipe(image())
    .pipe(gulp.dest('./build/images/'));
});


gulp.task('default', ['clean','compress', 'movejs', 'css', 'html', 'index', 'images'], function() {

});