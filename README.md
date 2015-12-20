# markdown-to-adobe-forum

**TODO: add notes** 


## Starting with `nodemon`

Use either: 

    heroku local -f Procfile_DEV
    
or
    
    nodemon index.js
    
    
## Bundling via system.js & jspm

    node systemjs-build.js
    

## future

- [ ] add checkbox markdown plugin (like [`markdown-it-checkbox`](https://www.npmjs.com/package/markdown-it-checkbox), but to unicode instead of html 
- [ ] use empty `<p>` tags between blocks
- [ ] preserve whitespace in `<pre>` tags
- [ ] code colouring?

- [ ] use gulp to add watcher to run `systemjs-build.js`
  - [ ] can it trigger a page reload?
- [ ] `expressjs/compression` does [no caching](https://github.com/expressjs/compression/issues/47); [use a cdn](https://devcenter.heroku.com/articles/http-caching) 
- [ ] add https support with Let's Encrypt
  - [ ] research how this will work, between local dev & Heroku
- [ ] add offline support with service workers
