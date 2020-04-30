var clean = require("gulp-clean"),
    gulp = require("gulp"),
    gulpImagemin = require("gulp-imagemin"),
    data = require("gulp-data"),
    fs = require("fs"),
    path = require("path");

gulp.task("clean", function () {
    return gulp.src("./docs")
        .pipe(clean());
})
gulp.task("CNAME", function () {
    return gulp.src("./CNAME")
        .pipe(gulp.dest("./docs/"));
})

gulp.task('compile', function () {
    "use strict";
    var twig = require("gulp-twig");
    return gulp.src("./index.html")
        .pipe(data(
            function (file) {
                data = JSON.parse(fs.readFileSync("./data/index.html.json"));
                return { words: data.words }
            }
        ))
        .pipe(twig({
            title: "Gulp and Twig",
            benefits: [
                'Fast',
                'Flexible',
                'Secure'
            ]
        }))
        .pipe(gulp.dest('./docs/'));
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

gulp.task("default", gulp.series("clean", "CNAME", "compile", "CSS", "IMGAGE"), function (done) {
    done();
});