( function() {
	"use strict";

	var Events = {
		events: {},
		eventHandler: function( event ) {
			Events.events[ event.type ] = true;
		},
		isTriggered: function( type ) {
			return !!Events.events[ type ];
		},
		reset: function() {
			Events.events = {};
		}
	};

	var userPosition, watchPosition,
		watchPositionSuccess = function( success, error, options ) {
			success( {
				coords: {}
			} );
		},
		watchPositionError = function( success, error, options ) {
			error();
		};


	module( 'TWTU.UserPosition', {
		setup: function() {
			userPosition = TWTU.UserPosition.create();
			watchPosition = navigator.geolocation.watchPosition;
			Events.reset();
		},
		teardown: function() {
			userPosition.teardown();
			if( watchPosition ) {
				navigator.geolocation.watchPosition = watchPosition;
			}
		}
	} );

	test( 'userPosition created', function() {
		ok( userPosition instanceof TWTU.UserPosition, 'created' );
	} );

	test( 'watchPosition is called, success func triggers positionchange', function() {
		navigator.geolocation.watchPosition = watchPositionSuccess;
		userPosition.bindEvent( 'positionchange', Events.eventHandler );
		userPosition.getPosition();

		ok( Events.isTriggered( 'positionchange' ), 'positionchange triggered' );
	} );

	test( 'watchPosition is called, failure func triggers positionerror', function() {
		navigator.geolocation.watchPosition = watchPositionError;
		userPosition.bindEvent( 'positionerror', Events.eventHandler );
		userPosition.getPosition();

		ok( Events.isTriggered( 'positionerror' ), 'positionerror triggered' );
	} );

}() );
