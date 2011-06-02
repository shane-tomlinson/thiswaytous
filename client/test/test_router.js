( function() {
	"use strict";

	var router, state;
	module( 'TWTU.Router', {
		setup: function() {
			state = AFrame.AObject.create();
			router = TWTU.Router.create( {
				state: state,
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

			state.teardown();
			state = null;
		}
	} );

	test( 'can create', function() {
		ok( router instanceof TWTU.Router );
	} );

	test( 'basic pattern matches with message', function() {
		router.bindEvent( 'root', Events.eventHandler );

		state.triggerEvent( 'statechange', {}, '', '/' );
		ok( Events.isTriggered( 'root' ), 'root matched, triggered event' );
	} );

	test( 'more advanced pattern matches with message', function() {
		router.bindEvent( 'invite', Events.eventHandler );

		state.triggerEvent( 'statechange', {}, '', '/invite' );
		ok( Events.isTriggered( 'invite' ), 'invite matched, triggered event' );
	} );

	test( 'route with id and message', function() {
		router.bindEvent( 'session', Events.eventHandler );

		state.triggerEvent( 'statechange', {}, '', '/session/2' );
		
		ok( Events.isTriggered( 'session' ), 'session triggered' );
		
	} );


}() );