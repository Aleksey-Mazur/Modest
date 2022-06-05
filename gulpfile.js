const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat-css");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();

function style() {
  return gulp
    .src("./scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(rename({ dirname: "./css/min", suffix: ".min" }))
    .pipe(cleanCSS())
    .pipe(gulp.dest("./"))
    .pipe(browserSync.stream());
}

gulp.task("html", function () {
  return gulp.src("*.html").pipe(browserSync.reload({ stream: true }));
});

function watch() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  gulp.watch("./scss/*.scss", gulp.parallel("style"));
  gulp.watch("./*.html", gulp.parallel("html"));
  gulp.watch("./js/*.js").on("change", browserSync.reload);
}
exports.style = style;
exports.watch = watch;
