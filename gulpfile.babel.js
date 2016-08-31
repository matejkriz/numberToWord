/* eslint-disable no-undef, no-console */
import cp from 'cp';
import del from 'del';
import fs from 'fs';
import gulp from 'gulp';
import os from 'os';
import path from 'path';
import runSequence from 'run-sequence';
import shell from 'gulp-shell';

// Fix for custom .babelrc cache issue.
// https://github.com/facebook/react-native/issues/1924#issuecomment-120170512
gulp.task('clear-react-packager-cache', () => {
  // Clear react-packager cache
  const tempDir = os.tmpdir();

  const cacheFiles = fs.readdirSync(tempDir).filter(
    fileName => fileName.indexOf('react-packager-cache') === 0
  );

  cacheFiles.forEach(cacheFile => {
    const cacheFilePath = path.join(tempDir, cacheFile);
    fs.unlinkSync(cacheFilePath);
    console.log('Deleted cache: ', cacheFilePath);
  });

  if (!cacheFiles.length) {
    console.log('No cache files found!');
  }
});

gulp.task('remove-babelrc-files', () => {
  return del(['node_modules/**/.babelrc', '!node_modules/react-native/**']);
});

const babelHelpersSrc = 'src/fixes/babelHelpers.js';
const babelHelpersDst = 'node_modules/react-native/packager/react-packager'
  + '/src/Resolver/polyfills/babelHelpers.js';

gulp.task('fix-native-babel-helpers-file', () =>
  cp.sync(babelHelpersSrc, babelHelpersDst)
);

gulp.task('fix', ['clear-react-packager-cache'], () => {
  runSequence(
    ['fix-native-babel-helpers-file', 'remove-babelrc-files'],
    'clear-react-packager-cache',
  );
});
