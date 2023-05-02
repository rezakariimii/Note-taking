const gulp = require("gulp");
const uglify = require("gulp-uglify");
const cleanCSS = require("gulp-clean-css");

gulp.task("js", function () {
  return gulp
    .src("./js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("./dist/"));
});
gulp.task("minify-css", function () {
  return gulp.src("./css/*.css").pipe(cleanCSS()).pipe(gulp.dest("dist"));
});

gulp.task('run', gulp.parallel('js', 'minify-css'));

gulp.task('watch', function () {
  gulp.watch('./css/*.css', gulp.series('minify-css'));
  gulp.watch('./src/notelist/*.js', gulp.series('js'));
});

gulp.task('default', gulp.series('run', 'watch'));