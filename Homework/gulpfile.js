let gulp = require('gulp')
let uglify = require('gulp-uglify')
let concat = require('gulp-concat')
let del = require('del')
gulp.task('compress', function () {
  del.sync(['build/alljs*'])

  return gulp.src(['./content/utils/build-details.js', './content/utils/build-html.js', './content/utils/user-input.js'])
    .pipe(uglify())
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('default', ['compress'], function () {})
