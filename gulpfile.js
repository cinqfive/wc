const gulp = require("gulp");
const ts = require("gulp-typescript");
const merge = require("merge-stream");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");

module.export = gulp.task("default", () => {
  const tsProject = ts.createProject("tsconfig.json");
  return merge(
    gulp.src("src/*.js"),
    gulp.src("src/*.js").pipe(tsProject()),
    gulp.src("src/*.scss").pipe(sass()).pipe(concat("wc.css")),
  ).pipe(gulp.dest("dist"));
});
