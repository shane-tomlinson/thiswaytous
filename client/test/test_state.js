( function() {
	"use strict";

	var state;
	module( 'TWTU.State', {
		setup: function() {
			Events.reset();
			state = TWTU.State.create();
		},

		teardown: function() {
			state.teardown();
			state = null;

			history.replaceState({},'','index.html');
		}
	} );

	test( 'can push a state', function() {
		state.bindEvent( 'statechange', Events.eventHandler );

		state.pushState( {}, '', 'test' );

		ok( Events.isTriggered( 'statechange' ), 'state event has been triggered' );
	} );

	test( 'can replace a state', function() {
		state.bindEvent( 'statechange', Events.eventHandler );

		state.pushState( {}, '', 'index.html' );
		state.replaceState( {}, '', 'test' );

		ok( Events.isTriggered( 'statechange' ), 'state event has been triggered' );
	} );

	test( 'can pop a state', function() {
		state.bindEvent( 'statechange', Events.eventHandler );

		state.pushState( {}, '', 'index.html' );
		state.popState();

		ok( Events.isTriggered( 'statechange' ), 'state event has been triggered' );
	} );
/*
	test( 'can go', function() {
		state.bindEvent( 'statechange', Events.eventHandler );
		state.pushState( {}, '', 'index.html' );
		Events.reset();
		state.go( -1 );
		ok( Events.isTriggered( 'statechange' ), 'state event has been triggered' );
	} );
*/
}() );