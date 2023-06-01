import { dest, series, src, watch } from 'gulp';
import gulpSass from 'gulp-sass';

// const cssmin = require('gulp-cssmin');
// const rename = require('gulp-rename');

exports.sass = function () {
	return (
		src('./src/styles/**.*')
			.pipe(gulpSass())
			// .pipe(cssmin())
			// .pipe(rename({ suffix: '.min' }))
			.pipe(dest('./dist/styles'))
	);
};

exports.watch = function () {
	watch('./src/styles/*.less', series('sass'));
};
