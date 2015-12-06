"use strict";

import bootstrap from 'bootstrap';
import 'bootstrap/css/bootstrap.css!'; // TODO: switch to less or sass for mixins & suchlike
import markdownit from 'markdown-it';
import Cycle from '@cycle/core';
import {h, makeDOMDriver} from '@cycle/dom';
import R from 'ramda';


const elems = {
    markdownInput: '#md-in',
    htmlOut:       '#html-out',
    appRoot:       '#app'
};

const md = markdownit();

function main(responses) {
    const requests = {
        DOM: responses.DOM.select(elems.markdownInput).events('input')
                 .map(ev => ev.target.value)
                 .map(R.bind(md.render, md))
                 .startWith('')
                 .map(htmlOutput =>
                     h('div', [
                         h('div', [
                             h('label', 'Markdown Input'),
                             h('textarea#md-in')
                         ]),
                         h('div', [
                             h('div', 'Output:'),
                             h('pre', [
                                 h('code', htmlOutput)
                             ])
                         ])
                     ])
                 )
    };
    return requests;
}

Cycle.run(main, {
    DOM: makeDOMDriver(elems.appRoot)
});