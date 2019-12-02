var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var sass = require("gulp-sass");

// Compile sass into CSS & auto-inject into browsers
gulp.task("sass", function() {
  return gulp
    .src(["ui/custom.scss"])
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

gulp.task("js", function() {
  return gulp
    .src([
      "node_modules/bootstrap/dist/js/bootstrap.min.js",
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/tether/dist/js/tether.min.js"
    ])
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
});

// gulp.task(
//   "serve",
//   gulp.series("sass", function() {
//     browserSync.init({
//       server: "./ui"
//     });

//     gulp.watch(
//       ["node_modules/bootstrap/scss/bootstrap.scss", "src/scss/*.scss"],
//       ["sass"]
//     );
//     gulp.watch("dist/*.html").on("change", browserSync.reload);
//   })
// );

gulp.task("default", gulp.series("js", "sass"));

// exports.buld = gulp.series("js", "sass");
