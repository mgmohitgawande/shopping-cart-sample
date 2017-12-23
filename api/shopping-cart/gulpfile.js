var gulp = require('gulp'),
	nodemon = require('gulp-nodemon');

gulp.task('default', function(){
	nodemon({
		script: 'server/server.js',
		ext: 'js',
		env: {
			PORT: 8001,
			env : false,
		},
		ignore: ['./node_modules/**']
	})
	.on('restart', function(){
		console.log('Restarted')
	})
});