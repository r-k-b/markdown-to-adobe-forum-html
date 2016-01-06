'use strict';

import Rx from 'rx';
import R from 'ramda';
import localforage from 'localforage';

const isNotNull = R.pipe(R.isNil, R.not);

export default {
  make: (key) => {

    // console.log(`Getting local data by key: ${key}`);
    const lfp = localforage.getItem(key);

    /*lfp.then((data) => {
      console.group(`Got local data by key: ${key}`);
      console.dir(data);
      console.groupEnd();
    });*/

    const saveToKey = (data) => {
      /*console.group(`Setting local data by key: ${key}`);
      console.dir(data);
      console.groupEnd();*/
      return localforage.setItem(key, data);
    };

    return function lfDriver(toSave$) {
      toSave$.subscribe(saveToKey);

      return Rx.Observable.fromPromise(lfp).filter(isNotNull);
    };
  }
};
