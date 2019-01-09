const gulp = require('gulp');
const jade = require('gulp-jade'); 
const image=require('gulp-image');
const sass = require('gulp-sass');
const connect =require('gulp-connect');

var paths = {
	htmlVars: {
	  src: './src/**/!(_)*.jade',
	  dest: './dest'
	},
	styles: {
	  src: ['./src/style/**/*.scss', './src/style/**/*.sass'],
	  dest: './dest/style'
	},
	images: {
	  src: ['./src/img/*.jpg', './src/img/*.png'],
	  dest: './dest/img'
	},
	scripts: {
	  src: 'src/scripts/**/*.js',
	  dest: 'assets/scripts/'
	}
};


function html() {
	return  gulp.src(paths.htmlVars.src)
		.pipe(jade())
		.pipe(gulp.dest(paths.htmlVars.dest))
		.pipe(connect.reload())
}

function css() {
	return  gulp.src(paths.styles.src)
		.pipe(sass({ outputStyle: 'expanded' }))
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(connect.reload())
}

function img() {
	return gulp.src(paths.images.src)
		.pipe(image())
		.pipe(gulp.dest(paths.images.dest))
		.pipe(connect.reload())
}

function watch() {
	gulp.watch(paths.htmlVars.src, html);
	gulp.watch(paths.styles.src, css);
}

function conn() {
	connect.server({
		port: 9000,
		livereload: true,
		root: './dest'
	})
}



var build = gulp.series(gulp.parallel(html, css, img, watch, conn));


gulp.task('build', build);

gulp.task('default', build);



