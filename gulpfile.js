import gulp from "gulp"
import gulpSass from "gulp-sass"
import {deleteAsync} from 'del'
import imagemin from 'gulp-imagemin';
import dartSass from "sass";
import CleanCSS from "gulp-clean-css";
import rename from "gulp-rename";
import concat from "gulp-concat";
import autoprefixer from "gulp-autoprefixer";
import browsersync from "browser-sync";
import uglify from "gulp-uglify";

const sass = gulpSass(dartSass);

const copyCss = () => {
    return gulp
        .src("./src/scss/main.scss")
        .pipe(sass({ outputStyle: "expanded" }))
        .pipe(concat("styles.css"))
        .pipe(autoprefixer({overrideBrowserslist: ['last 5 versions']}))
        .pipe(CleanCSS({ compatibility: "ie8" }).on('error', sass.logError))
        .pipe(
            rename({
                suffix: ".min",
                extname: ".css",
            })
        )
        .pipe(gulp.dest("./dist/css"))
        .pipe(browsersync.stream())
};

const copyHtml = () => {
    return gulp
        .src("./index.html")
        .pipe(gulp.dest("./dist"))
        .pipe(browsersync.stream())

};

const copyImgs = () => {
    return gulp
        .src("./src/img/**")
        .pipe(imagemin())
        .pipe(gulp.dest("./dist/img"))
};

const copyJs = () => {
    return gulp
        .src("./src/js/*.js")
        .pipe(concat("script.js"))
        .pipe(uglify())
        .pipe(
            rename({
                suffix: ".min",
                extname: ".js",
            })
        )
        .pipe(gulp.dest("./dist/js"))
        .pipe(browsersync.stream())
}

const cleanDist = () => deleteAsync('./dist');

const watchJs = () => {
    gulp.watch("./src/js/*.js", copyJs);
}

const watchCSS = () => {
    gulp.watch("./src/scss/**/*.scss", copyCss)
}

const watchHTML = () => {
    gulp.watch("./index.html", copyHtml)
}

const sync = () => {
    browsersync({
        server: {
            baseDir: "./dist"
        },
        open: true,
        notify: false
    })
    watchCSS();
    watchHTML();
    watchJs();
}

export const build = gulp.series(cleanDist, gulp.parallel(copyHtml, copyImgs, copyCss, copyJs));
export const dev = gulp.series(build, sync);


