
import bootstrap from 'bootstrap';
import 'bootstrap/css/bootstrap.css!'; // TODO: switch to less or sass for mixins & suchlike
import md from 'markdown-it';
import bacon from 'baconjs';
import $ from 'jquery';
import he from 'he';

var up   = $('#up').asEventStream('click');
var down = $('#down').asEventStream('click');

var counter =
        // map up to 1, down to -1
        up.map(1).merge(down.map(-1))
            // accumulate sum
            .scan(0, function(x,y) { return x + y });

// assign observable value to jQuery property text
counter.assign($('#counter'), 'text');