const gulp = require('gulp'),
      sass = require('gulp-sass'),
      notify = require('gulp-notify'),
      plumber = require('gulp-plumber'),
      postcss = require('gulp-postcss'),
      autoprefixer = require('autoprefixer'),
      minifyCss = require('gulp-csso'),
      csscomb = require('gulp-csscomb'),
      gcmq = require('gulp-group-css-media-queries'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),

      server = require('browser-sync').create(),

      rename = require('gulp-rename'),
      del = require('del'),

      imageMin = require('gulp-imagemin'),      
      tinymin = require('gulp-tinypng'),
      webp = require('gulp-webp'),


      postHtml = require('gulp-posthtml'),
      include = require('posthtml-include'),
      htmlMin = require('gulp-htmlmin');

const jsFile = [
  './source/js/no-js.js',
  './source/js/swiper.js',
  './source/js/slider.js',
  './source/js/openMenu.js',
  './source/js/modal.js'
];

function styles() {
  return gulp.src('./source/scss/styles.scss')
    .pipe(plumber())
    .pipe(sass().on('error', notify.onError()))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gcmq())
    .pipe(csscomb())
    .pipe(gulp.dest('./build/css'))
    .pipe(minifyCss())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./build/css'))
    .pipe(server.stream());
};

//tinypng api key gTuVPxhcb65R4KUvguBnOL3LRdjAFRFu
function tinypng() {
    return gulp.src('./source/img/*.{png,jpg}')
        .pipe(tinymin('gTuVPxhcb65R4KUvguBnOL3LRdjAFRFu'))
        .pipe(gulp.dest('./build/img'))
        .pipe(server.stream());
};

function images() {
  return gulp.src('./source/img/*')
    .pipe(imageMin())
    .pipe(gulp.dest('./build/img'))
    .pipe(server.stream());
};

function webP() {
  return gulp.src('./build/img/*.{png,jpg}')
    .pipe(webp())
    .pipe(gulp.dest('./build/img'));
};

function html() {
  return gulp.src('./source/*.html')
    .pipe(postHtml([include({ encoding: 'utf8', root: './source/' })]))
    .pipe(htmlMin({collapseWhitespace: true}))
    .pipe(gulp.dest('./build'))
    .pipe(server.stream());
};

function scripts() {
  return gulp.src(jsFile)
  .pipe(concat('all.js'))  
  .pipe(gulp.dest('build/js'))
  .pipe(uglify())
  .pipe(rename('all.min.js'))
  .pipe(gulp.dest('build/js'))
  .pipe(server.stream());
}

function clean() {
  return del('./build');
};

function copy() {
  return gulp.src([
    './source/fonts/**/*.{woff,woff2}',
    './source/css/*.css'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('./build'));
};

function watch() {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/scss/**/*.scss', styles);
  gulp.watch('source/js/*.js', scripts);
  gulp.watch('source/**/*.html', html);
  gulp.watch('source/img/*', images);
};

gulp.task('styles', styles);
gulp.task('tinypng', tinypng);
gulp.task('images', images);
gulp.task('webp', webP);
gulp.task('html', html);
gulp.task('scripts', scripts);
gulp.task('clean', clean);
gulp.task('copy', copy);
gulp.task('watch', watch);

gulp.task('build', gulp.series(clean, images, copy, webP, styles, scripts, html));
gulp.task('default', gulp.series('build', 'watch'));
