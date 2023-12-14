import gulp from 'gulp';
import git from 'gulp-git';
import watch from 'gulp-watch';

gulp.task('watch', function () {
  // 监视 Jenkinsfile 文件的变化
  gulp.watch('Jenkinsfile', function (cb) {
    // 执行 Git 提交并推送
    gulp
      .src('.')
      .pipe(git.add())
      .pipe(git.commit('Jenkinsfile updated'))
      .on('end', function () {
        git.push('origin', 'master', function (err) {
          if (err) {
            return cb(err);
          }
          cb();
        });
      });
  });
});

// 默认任务
gulp.task('default', gulp.series('watch'));
