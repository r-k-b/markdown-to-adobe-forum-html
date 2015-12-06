"use strict";

import bootstrap from 'bootstrap';
import 'bootstrap/css/bootstrap.css!'; // TODO: switch to less or sass for mixins & suchlike
import markdownit from 'markdown-it';
import bacon from 'baconjs';
import R from 'ramda';
import $ from 'jquery';


const elems = {
    markdownInput: '#md-in',
    htmlOut:       '#html-out'
};

const md = markdownit();

const logtap = R.curry((name = 'tap:', thing) => {
    console.log(name, thing)
});

const markdownIn = $(elems.markdownInput)
    .asEventStream('keyup change');


const inputElementMarkdownToHtml = R.compose(
    R.bind(md.render, md),
    R.tap(logtap('original value:')),
    R.pathOr('', ['value']),
    R.tap(logtap('before pathOr'))
);


const eventToHtml = R.compose(
    inputElementMarkdownToHtml,
    R.path(['currentTarget'])
);


const htmlStream = markdownIn
    .map(eventToHtml)
    .startWith(inputElementMarkdownToHtml(
        $(elems.markdownInput).get(0))
    );

htmlStream.assign($(elems.htmlOut), 'text');
