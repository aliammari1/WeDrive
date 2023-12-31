const gulp = require("gulp");
const path = require("path");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const open = require("gulp-open");

const Paths = {
  HERE: "./",
  DIST: "dist/",
  CSS: "./assets/css/",
  SCSS_TOOLKIT_SOURCES: "./assets/scss/argon-dashboard.scss",
  SCSS: "./assets/scss/**/**",
};

gulp.task("compile-scss", function () {
  return gulp
    .src(Paths.SCSS_TOOLKIT_SOURCES)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write(Paths.HERE))
    .pipe(gulp.dest(Paths.CSS));
});

gulp.task("watch", function () {
  gulp.watch(Paths.SCSS, gulp.series("compile-scss"));
});

gulp.task("open", function () {
  gulp.src("pages/back/dashboard.php").pipe(open());
});

gulp.task("open-app", gulp.parallel("open", "watch"));
