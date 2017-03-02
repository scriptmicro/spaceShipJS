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

var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

gulp.task('cleanAll', function () {
    console.log("Clean all files in build folder");
    return gulp.src(["./build/*"], { read: false }).pipe(clean());
});


gulp.task('typescript', ['cleanAll'], function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("./scripts/scriptMicro/"));
});


gulp.task('compress', ['typescript'], function () {
    return gulp.src(['./scripts/scriptMicro/scriptMicro.js',
        './scripts/scriptMicro/shapeBuilder.js',
        './scripts/scriptMicro/utilities.js',
        './scripts/scriptMicro/directives/*.js',
        './scripts/scriptMicro/controllers/*.js'])
        .pipe(concat('concat.js'))
        //.pipe(gulp.dest('./build/scripts/scriptMicro/'))
        .pipe(rename('scriptMicro.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/scripts/scriptMicro/'));
});


gulp.task('cleanJS', ['compress'], function () {
    console.log("Clean all JS files in scripts (dev) folder");
    
    //This is a nice to have :
    //A) in one case the js files are gone and the directory is easy to look at and understand
    //B) js files are visible/available and able to be debugged without concat and uglify
    

    return gulp.src(['./scripts/scriptMicro/scriptMicro.js', 
                   './scripts/scriptMicro/shapeBuilder.js', 
                   './scripts/scriptMicro/utilities.js',
                   './scripts/scriptMicro/directives/*.js',
                   './scripts/scriptMicro/controllers/*.js'], { read: false })
           .pipe(clean());
             
});


gulp.task('movejs', ['cleanJS'], function () {
    return gulp.src(['./scripts/angularJS/**/*', './scripts/greenSock/**/*'])
        .pipe(gulpCopy('./build/scripts/', { prefix: 1 }))
});

gulp.task('css', ['movejs'], function () {
    return gulp.src(['./css/*.css'])
        .pipe(cleanCSS({ debug: true }, function (details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(rename('index.min.css'))
        .pipe(gulp.dest('./build/css/'));
});

gulp.task('html', ['css'], function () {
    return gulp.src('./templates/*.html')
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest('./build/templates'));
});

gulp.task('index', ['html'], function () {
    return gulp.src('index.html')
        .pipe(htmlreplace({
            'css': 'css/index.min.css',
            'js': 'scripts/scriptMicro/scriptMicro.min.js'
        }))
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest('./build/'));
});

gulp.task('images', ['index'], function () {
    return gulp.src('./images/*')
        .pipe(image())
        .pipe(gulp.dest('./build/images/'));
});

gulp.task('default', ['cleanAll', 'typescript', 'compress', 'cleanJS', 'movejs', 'css', 'html', 'index', 'images'], function () {

});