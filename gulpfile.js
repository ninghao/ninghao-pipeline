import gulp from 'gulp';
import git from 'gulp-git';

gulp.task('watch', () => {
  gulp.watch(['Jenkinsfile', 'jenkins/**/*'], (cb) => {
    gulp
      .src('.')
      .pipe(git.add())
      .pipe(git.commit('自动提交'))
      .on('end', () => {
        git.push('origin', 'main', () => {
          cb();
        });
      });
  });
});

gulp.task('default', gulp.series('watch'));
