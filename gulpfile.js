var gulp        = require('gulp'),
	browserSync = require('browser-sync'),
    scss        = require('gulp-sass'),
	autoprefix  = require('gulp-autoprefixer'),
	concat      = require('gulp-concat'),
	uglify      = require('gulp-uglify'),
	cssnano     = require('gulp-cssnano'),
	imagemin    = require('gulp-imagemin'),
	rename      = require('gulp-rename'),
	sourcemaps  = require('gulp-sourcemaps'),
	changed     = require('gulp-changed'),
	lineec      = require('gulp-line-ending-corrector'),
	del         = require('del');

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
		.pipe(autoprefix('last 2 versions'))
		.pipe(sourcemaps.write())
		.pipe(lineec())
	    .pipe(gulp.dest('dev/css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', function () {
	gulp.watch(['./dev/scss/*.scss'], gulp.parallel('scss'));
	gulp.watch('dev/*.html').on('change', browserSync.reload);
	gulp.watch('dev/js/*.js').on('change', browserSync.reload);
});


/* For build */
gulp.task('js-minify', function () {
	return gulp.src('dev/js/*.js')
		.pipe(concat('common.js'))
		.pipe(uglify())
		.pipe(lineec())
		.pipe(gulp.dest('prod/js'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('css-minify', function () {
	return gulp.src('dev/css/*.css')
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(lineec())
		.pipe(gulp.dest('prod/css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('img', function () {

});

gulp.task('clean', function () {
	return del.sync('prod');
});

// gulp.task('build', function () {
// 	var buildCss = gulp.src('dev/css/*.css')
// 		.pipe(gulp.dest('prod/css'));
// 	var buildFonts = gulp.src('dev/fonts/**/*')
// 		.pipe(gulp.dest('prod/fonts'));
// 	var buildJs = gulp.src('dev/js/*')
// 		.pipe(gulp.dest('prod/js'));
// 	var buildHtml = gulp.src('dev/*.html')
// 		.pipe(gulp.dest('prod'));
// });

gulp.task('default', gulp.parallel('scss', 'browser-sync', 'watch'));

