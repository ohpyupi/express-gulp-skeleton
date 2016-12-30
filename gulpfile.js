let gulp = require('gulp');
let nodemon = require('gulp-nodemon');
let cssmin = require('gulp-cssmin');
let rename = require('gulp-rename');
let less = require('gulp-less');
let jade = require('gulp-jade');
let plumber = require('gulp-plumber');
let concat = require('gulp-concat');

// path variables
let lessPath = './public/styles/';
let jsPath = './public/js/';
let jadePath = './public/templates/';

gulp.task('start', ()=>{
	nodemon({
		script: 'app.js',
		ext: 'js less jade css html',
		env: {'NODE_ENV': 'development'},
	});
});

gulp.task('jade', ()=>{
	return gulp.src(`${jadePath}**/*jade`)
	.pipe(plumber({
		errorHandler: next,
	}))
	.pipe(jade())
	.pipe(gulp.dest(`${jadePath}html/`));
})

gulp.task('less', ()=>{
	return gulp.src(`${lessPath}**/*.less`)
	.pipe(plumber({
		errorHandler: next,
	}))
	.pipe(less())
	.pipe(cssmin())
	.pipe(rename({
		suffix: '.min',
	}))
	.pipe(gulp.dest(`${lessPath}css/`));
})

gulp.task('watch', ()=>{
	gulp.watch(`${lessPath}**/*less`, ['less']);
	gulp.watch(`${jadePath}**/*jade`, ['jade']);
});

gulp.task('default', ['start', 'jade', 'less', 'watch'])

var next = (err) => {
	console.log(err);
}
