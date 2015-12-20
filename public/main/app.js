'use strict';

import bootstrap from 'bootstrap';
import 'bootstrap/css/bootstrap.css!'; // TODO: switch to less or sass for mixins & suchlike
import 'style/app.css!';
import customiseMd from './lib/customise-markdown';
import Cycle from '@cycle/core';
import Rx from 'rx';
import {h, makeDOMDriver} from '@cycle/dom';
import R from 'ramda';

import hh from 'hyperscript-helpers';
const {div, label, textarea} = hh(h);

const elems = {
  markdownInput: '#md-in',
  htmlOut:       '#html-out',
  appRoot:       '#app'
};

const initialInput = 'foo\n\nbar\n\nbaz';

const showMe = R.curry((label = 'showMe...', data) => {
  console.group(label);
  console.log(data);
  console.groupEnd();
});

const zipStreams = (inputStream, outputStream) => R.zipObj(
  ['in', 'out'],
  [inputStream, outputStream]
);

const renderIOPageDom = (inOut) =>
  div('.panes__outer', [
    div('.pane__input', [
      label('.pane__heading', {
          attributes: {
            for: 'md-in'
          }
        },
        'Markdown Input'
      ),
      textarea('#md-in.pane__text', {
          attributes: {
            autofocus: 'autofocus'
          }
        },
        inOut.in
      )
    ]),
    div('.pane__output', [
      div('.pane__heading', 'Output:'),
      textarea('.pane__text', {
          attributes: {
            readonly: 'readonly'
          }
        },
        inOut.out
      )
    ])
  ]);

function main(responses) {
  const inputStream = responses.DOM.select(elems.markdownInput)
    .events('input')
    .map(ev => ev.target.value)
    .startWith(initialInput);

  const outputStream = inputStream
    .map(customiseMd);

  const bothStream = Rx.Observable.zip(
    inputStream,
    outputStream,
    zipStreams
  );

  return { // requests
    DOM: bothStream.map(renderIOPageDom)
  };
}

const init = () => Cycle.run(main, {
  DOM: makeDOMDriver(elems.appRoot)
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
