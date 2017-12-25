var gulp = require('gulp'),
	nodemon = require('gulp-nodemon');

gulp.task('default', function(){
	nodemon({
		script: 'server/server.js',
		ext: 'js',
		env: {
			env : false,
		},
		ignore: ['./node_modules/**']
	})
	.on('restart', function(){
		console.log('Restarted')
	})
});