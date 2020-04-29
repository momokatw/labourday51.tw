var clean = require("gulp-clean"),
    gulp = require("gulp"),
    gulpImagemin = require("gulp-imagemin"),
    data = require("gulp-data");

gulp.task("clean", function () {
    return gulp.src("./docs")
        .pipe(clean());
})
gulp.task("CNAME", function() {
    return gulp.src("./CNAME")
        .pipe(gulp.dest("./docs/"));
})

gulp.task("HTML", function () {
    return gulp.src("./*.html")
        .pipe(gulp.dest("./docs/"));
})

gulp.task("CSS", function () {
    return gulp.src("./dist/style/*.css")
        .pipe(gulp.dest("./docs/dist/style/"));
})

gulp.task("IMGAGE", function () {
    return gulp.src("./img/**")
        .pipe(gulpImagemin())
        .pipe(gulp.dest("./docs/img/"));
})

gulp.task("default", gulp.series("clean", "CNAME", "HTML", "CSS", "IMGAGE"), function (done) {
    done();
});