var clean = require("gulp-clean"),
    gulp = require("gulp"),
    gulpImagemin = require("gulp-imagemin"),
    data = require("gulp-data"),
    fs = require("fs"),
    rename = require("gulp-rename");

gulp.task("clean", function () {
    return gulp.src([
        "./docs/*.html",
        "./docs/dist/**",
    ])
        .pipe(clean());
})
gulp.task("CNAME", function () {
    return gulp.src("./CNAME")
        .pipe(gulp.dest("./docs/"));
})


gulp.task('compile', function (done) {
    "use strict";
    var twig = require("gulp-twig");
    var data = JSON.parse(fs.readFileSync("./data/index.html.json"));

    gulp.src('./index.html')
        .pipe(twig({
            data: {
                words: data.words
            }
        }))
        .pipe(gulp.dest("./docs/"))

    for (var i = 0; i < data.words.length; i++) {
        var event = data.words[i]

        gulp.src("./detail.html")
            .pipe(twig({
                data: {
                    images: event.images,
                    banner: event.image
                }
            }))
            .pipe(rename(event.id + ".html"))
            .pipe(gulp.dest('./docs/'));
    }
    done();
    return "done"
})

gulp.task("CSS", function () {
    return gulp.src("./dist/style/*.css")
        .pipe(gulp.dest("./docs/dist/style/"));
})

gulp.task("default", gulp.series("clean", "CNAME", "compile", "CSS"), function (done) {
    done();
});