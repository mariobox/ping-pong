// We use the require function in order to load the required packages into variables that can be later used in our code
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify'); // for minification (doesn't work with ES6 classes)
var minify = require('gulp-minify'); // for minification (works with ES6 classes!)
var utilities = require('gulp-util');
var del = require('del');

var buildProduction = utilities.env.production; 
// Creates an environmental variable called production. Running "gulp build --production" sets it to true (if we want to run all tasks)
// If we just run "gulp build", the production-related tasks will not be executed. This is useful when we are just developing and don't 
// want to, for example, minify files. See line 55.

gulp.task('concatInterface', () => {  // concatInterface is a name that we make up ourselves for the concatenate task we want executed
    return gulp.src(['./js/pingpong-interface.js', './js/signup-interface.js'])
        // pulls in all the files used in the browser. These files are formatted as an array of file names we are passing in.
        // we can also use the globbing pattern: './js/*-interface.js'
        .pipe(concat('allConcat.js'))  // calls our concat() function. We pass it the name of the destination file where we want to consolidate our files, in this case a new file called allConcat.js.
        .pipe(gulp.dest('./tmp')); // Put it inside a temporary folder, since allConcat.js will not be used in the browser. First, we have to browserify it to pull in any modules it uses.
});

gulp.task('jsBrowserify', ['concatInterface'], () => {
    // we've added an additional argument to the task definition, after the name of the task. 
    // This is an array of dependencies (tasks that we want to run automatically before the task we are defining). 
    // In this case, we are telling it to run the "concatInterface" task to put all client-side JavaScript files into one 
    // before browserifying it.
    return browserify({ entries: ['./tmp/allConcat.js'] }) // we browserify the concatenated, front-end file, instead of the individual files
        .bundle()  // don't worry about exactly what this does for now.
        .pipe(source('app.js'))  // create a new file called app.js
        .pipe(gulp.dest('./build/js')); // put it in a new folder, which we will name build, in a sub folder called js
});

gulp.task("minifyScripts", ["jsBrowserify"], () => {
    return gulp.src("./build/js/app.js")
        .pipe(minify().on('error', function (e) { // the error part is just for debugging. "pipe(minify())" would be enough
            console.log(e);
        }))
        .pipe(gulp.dest("./build/js"));
});

  // It is untidy to keep our automatically generated production files in the same place as our development files. 
  // Instead we separate out our production version of the project inside its own folder called build. This folder 
  // will eventually hold other code, so we tell gulp to create a js folder inside of it to store our browserified JavaScript.

  // We should have one set of tasks for a development build (the files of our project while we're still developing), 
  // and another set of tasks for a production build (the files that will be our 'final draft' or deployment files
  
  gulp.task("clean", () => {
    // automatically deletes the contents of the build and temp folders, to start clean before a new build 
    return del(['build', 'tmp']);
  });
  
  gulp.task("build", ['clean'], () => {
    // we put the "clean" task as a pre-requisite, to be executed automatically before each build  
    if (buildProduction) {
      gulp.start('minifyScripts');
    } else {
      gulp.start('jsBrowserify');
    }
  });

  
