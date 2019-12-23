var gulp=require('gulp');
var load=require('gulp-load-plugins')();
gulp.task('concatCss',function(done){
    gulp.src('./sass/*.scss')
    .pipe(load.sass())
    .pipe(load.concat('index.css'))
    .pipe(load.minifyCss())
    .pipe(gulp.dest('./dist/css'))
    .pipe(load.connect.reload());
    done();
});
gulp.task('concatJs',function(done){
    gulp.src(['./js/*.js','!./js/jquery*.js'])
    .pipe(load.concat('index.js'))
    .pipe(load.uglify())
    .pipe(gulp.dest('./dist/js'))
    .pipe(load.connect.reload());
    done();
});
gulp.task('uglifyJq',function(done){
    gulp.src('./js/jquery*.js')
    .pipe(load.uglify())
    .pipe(load.rename('jquery-1.8.3.min.js'))
    .pipe(gulp.dest('./dist/js'))
    done();
});
gulp.task('minifyHtml',function(done){
    gulp.src('./*.html')
    .pipe(load.minifyHtml())
    .pipe(gulp.dest('./dist/'))
    .pipe(load.connect.reload());
    done();
});
// gulp.task('imagemin',function(done){
//     gulp.src('./img/*.*')
//     .pipe(load.imagemin())
//     .pipe(gulp.dest('./dist/img'))
//     .pipe(load.connect.reload());
//     done();
// });
gulp.task('reload',function(done){
    load.connect.server({
        root:'./dist',
        livereload:true
    })
    done();
});
gulp.task('watchs',function(done){
    gulp.watch('./sass/*.scss',gulp.series('concatCss'));
    gulp.watch(['./js/*.js','!./js/jquery*.js'],gulp.series('concatJs'));
    gulp.watch('./*.html',gulp.series('minifyHtml'));
    // gulp.watch('./img/*.*',gulp.series('imagemin'));
    done();
});
gulp.task('start',gulp.series('reload','watchs'));
gulp.task('build',gulp.parallel(
    gulp.series('concatCss'),
    gulp.series('concatJs','uglifyJq'),
    gulp.series('minifyHtml'),
    // gulp.series('imagemin')
))

