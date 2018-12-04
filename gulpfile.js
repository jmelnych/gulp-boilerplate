var gulp = require('gulp'),
  connect = require('gulp-connect'),
  scss = require('gulp-sass');

gulp.task('connect', function() {
  connect.server({
    root: './',
    port: 8888,
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('*.html')
    .pipe(connect.reload());
});

gulp.task('scss', function(){
	return gulp.src("dev/scss/styles.scss")
	  .pipe(scss())
	  .pipe(gulp.dest("prod/css"))
	  .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['index.html'], ['html']);
  gulp.watch(['./dev/scss/*.scss'], ['scss']);
});

gulp.task('default', ['connect', 'watch']);

