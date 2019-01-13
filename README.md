# Gulp 4.x

A boilerplate for building web projects with Gulp. Uses Gulp 4.x.
It watches for all html, scss, js and images changes.

## Dependencies
* Automatic reloading of the browser on code modification (using Browsersync)
* SCSS compilation to CSS
* CSS autoprefixer
* CSS / JS Sourcemaps
* CSS and JS minification
* JS obfuscation
* Image optimization

## Getting Started

### Dependencies
Note: if you've previously installed Gulp version that is lower 4 globally, run npm rm --global gulp to 
remove it.

Make sure these are installed first.
* Node.js
* Gulp Command Line Utility `npm install --global gulp-cli`

### Quick Start
Clone the repo and cd into it. Run `npm install`



This is gulp boiler-plate 4 with a browser-sync server on localhost:3000.
Gulp watch changes in development directory.
It watches for all html and scss changes.

### Usage
You can use default task

`gulp`

that is basically the same as

`gulp watch` 

It starts a Browsersync server at localhost:3000


To build a production version, run

`gulp build`

It builds a minified version of css, js and images to prod directory.

Enjoy!