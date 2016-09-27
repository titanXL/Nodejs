let gulp = require('gulp')
let uglify = require('gulp-uglify')
let concat = require('gulp-concat')

gulp.task('compress', function () {
  gulp.src(['./content/utils/build-details.js', './content/utils/build-html.js', './content/utils/user-input.js'])
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'))
})
