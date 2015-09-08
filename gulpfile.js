var gulp = require('gulp');
var requireDir = require('require-dir');
var _tasks = requireDir('./gulp_tasks');

_tasks.toString();

gulp.task('default',['test'],function () {
  gulp.watch("generators/**/*.js",['test']);
  gulp.watch("test/**/*.js",['test']);
});
