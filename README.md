# markdown-to-adobe-forum-html

Create html especially suited for use in posts on forums.adobe.com.
The wysiwyg editor & stylesheets on that forums don't lend themselves to the clean display of code.
Use this to turn markdown into customised html.


Powered by [markdown-it](https://github.com/markdown-it/markdown-it), [cyclejs](http://cycle.js.org/), and [jspm.](http://jspm.io/) 

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
- [ ] code colouring / syntax highlighting?
- [ ] use gulp to add watcher to run `systemjs-build.js`
  - [ ] can it trigger a page reload?
- [ ] `expressjs/compression` does [no caching](https://github.com/expressjs/compression/issues/47); [use a cdn](https://devcenter.heroku.com/articles/http-caching) 
- [ ] add https support with Let's Encrypt
  - [ ] research how this will work, between local dev & Heroku
- [ ] add offline support with service workers
- [ ] research best practices for http/2 + jspm  
