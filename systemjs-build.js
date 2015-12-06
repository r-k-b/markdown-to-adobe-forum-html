var path = require("path");
var Builder = require('systemjs-builder');

// optional constructor options
// sets the baseURL and loads the configuration file
var builder = new Builder('public/', 'public/config.js');

builder
    .buildStatic(
        'main/app.js',
        'public/main/dist/app.bundle.js',
        {
            runtime:    false,
            minify:     false,
            sourceMaps: true
        }
    )
    .then(() => console.log('Build complete'))
    .catch((err) => {
        console.log('Build error');
        console.log(err);
    });