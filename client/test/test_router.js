var routes;
( function() {
	"use strict";

	var router;
	module( 'TWTU.Router', {
		setup: function() {
			routes = function() {
				this.get = function() {};
				this.post = function() {};
			};

			router = TWTU.Router.create( {
				routes: {
					'/': 'root',
					'/invite': 'invite',
					'/session/:id': 'session'
				}
			} );

			Events.reset();
		},

		teardown: function() {
			router.teardown();
			router = null;
		}
	} );

	test( 'can create', function() {
		ok( router instanceof TWTU.Router );
	} );
/*
	test( 'basic pattern matches with message', function() {
		router.bindEvent( 'root', Events.eventHandler );

		ok( Events.isTriggered( 'root' ), 'root matched, triggered event' );
	} );

	test( 'more advanced pattern matches with message', function() {
		router.bindEvent( 'invite', Events.eventHandler );

		ok( Events.isTriggered( 'invite' ), 'invite matched, triggered event' );
	} );

	test( 'route with id and message', function() {
		router.bindEvent( 'session', Events.eventHandler );

		ok( Events.isTriggered( 'session' ), 'session triggered' );

	} );
*/

}() );
