import gulp from 'gulp';
import git from 'gulp-git';

gulp.task('watch', () => {
  // 监视文件变化
  gulp.watch(['Jenkinsfile', 'jenkins/**/*'], (cb) => {
    gulp
      .src('.')
      .pipe(git.add())
      .pipe(git.commit('自动提交'))
      .on('end', function () {
        git.push('origin', 'main', () => {
          cb();
        });
      });
  });
});

// 默认任务
gulp.task('default', gulp.series('watch'));
