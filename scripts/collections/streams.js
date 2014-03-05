define([
	'backbone',
	'../models/stream',
    '../../bower_components/d3/d3'
],
function( Backbone, Stream, d3) {
    'use strict';


    /* Random data generator inspired by: http://jsfiddle.net/chrisJamesC/BjRLy/4/ */

    var data = [{
        "key": "Long",
        "values": getData()
    }];

    function getData() {
        var arr = [];
        var theDate = new Date(2012, 1, 1, 0, 0, 0, 0);
        for (var x = 0; x < 30; x++) {
            arr.push({x: new Date(theDate.getTime()), y: Math.random() * 100});
            theDate.setDate(theDate.getDate() + 1);
        }
        return arr;
    }

    function updateData() {
        var long = data[0].values;
        var next = new Date(long[long.length - 1].x);
        next.setDate(next.getDate() + 1)
        long.shift();
        long.push({x:next.getTime(), y:Math.random() * 100});
    }



	/* Return a collection class definition */
	return Backbone.Collection.extend({
		initialize: function() {
            this.set(getData());
            console.log('Initial Data');
            console.log(this);
		},

        update: function() {
            updateData();
            this.set(data);
        },

		model: Stream
		
	});
});
