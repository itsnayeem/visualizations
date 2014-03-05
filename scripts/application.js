define([
	'backbone',
	'communicator',
    'collections/streams',
    'views/stream',
    'hbs!tmpl/welcome'
],

function( Backbone, Communicator, StreamsCollection, StreamView, Welcome) {
    'use strict';
    var timer;

    console.log('Application.js');

	var App = new Backbone.Marionette.Application();

	App.addRegions({});

	App.addInitializer( function () {

        var duration = 1500;

        var stream = new StreamsCollection();
        var streamView = new StreamView();

        setInterval(function () {
            stream.update();
            streamView.render(_(stream.models).pluck('attributes'));
        }, duration);

		Communicator.mediator.trigger("APP:START");
	});

	return App;
});
