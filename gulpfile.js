var gulp        = require('gulp'),
	browserSync = require('browser-sync'),
    scss        = require('gulp-sass'), //convert scss to css
	autoprefix  = require('gulp-autoprefixer'), //add -webkit -ms and other prefixes
	concat      = require('gulp-concat'), //minify js
	uglify      = require('gulp-uglify'), //obfuscate js code
	cssnano     = require('gulp-cssnano'), //minify css
	imagemin    = require('gulp-imagemin'), //optimize images
	rename      = require('gulp-rename'), //rename files, for instance put min part
	sourcemaps  = require('gulp-sourcemaps'), //write inline source maps
	cache     	= require('gulp-cache'), //cache images
	lineec      = require('gulp-line-ending-corrector'), //unify EOF between windows, os
	del         = require('del'); //delete directories or files

/* For development */
gulp.task('browser-sync', function () {
	browserSync({
    server: {
    	baseDir: 'dev'
    }
  });
});

gulp.task('scss', function (){
	return gulp.src('dev/scss/*.scss')
	    .pipe(scss().on('error', scss.logError))
		.pipe(autoprefix(['last 5 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
		.pipe(sourcemaps.write())
		.pipe(lineec())
	    .pipe(gulp.dest('dev/css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', function () {
	gulp.watch(['./dev/scss/*.scss'], gulp.parallel('scss'));
	gulp.watch('dev/*.html').on('change', browserSync.reload);
	gulp.watch('dev/js/*.js').on('change', browserSync.reload);
	gulp.watch('dev/source-img/*').on('change', browserSync.reload);
});


/* For build */
gulp.task('css-minify', function () {
	return gulp.src('dev/css/*.css')
		.pipe(cssnano())
		//.pipe(rename({suffix: '.min'}))
		.pipe(lineec())
		.pipe(gulp.dest('prod/css'))
});

gulp.task('js-minify', function () {
    return gulp.src('dev/js/*.js')
        .pipe(concat('common.js'))
        .pipe(uglify())
        //.pipe(rename({suffix: '.min'}))
        .pipe(lineec())
        .pipe(gulp.dest('prod/js'))
});

gulp.task('images', function () {
    return gulp.src('dev/img/*')
        .pipe(cache(imagemin({
            optimizationLevel: 2,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('prod/img/'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('clean', function () {
    return new Promise(function(resolve, reject) {
        console.log("Deleting prod directory");
        del.sync('prod');
        cache.clearAll();
        resolve();
    });
});

/* Copy FONTS and HTML */
gulp.task('copy-fonts', function() {
	return gulp.src('dev/fonts/**/*')
        .pipe(gulp.dest('prod/fonts'))
});

gulp.task('copy-html', function() {
    return gulp.src('dev/*.html')
        .pipe(gulp.dest('prod'));
});


gulp.task('watch', gulp.parallel('scss', 'browser-sync', 'watch'));
gulp.task('default', gulp.parallel('watch'));
gulp.task('build', gulp.series('clean', gulp.parallel('css-minify', 'js-minify', 'images', 'copy-fonts', 'copy-html')));

