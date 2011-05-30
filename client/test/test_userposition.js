( function() {
	"use strict";

	var userPosition, watchPosition,
		watchPositionSuccess = function( success, error, options ) {
			success( {
				coords: {
					latitude: 0,
					longitude: 0
				}
			} );
		},
		watchPositionSuccessAsync = function( success, error, options ) {
			setTimeout( function() {
				success( {
					coords: {
						latitude: 0,
						longitude: 0
					}
				} );
			}, 0 );
		},
		watchPositionError = function( success, error, options ) {
			error();
		};


	module( 'TWTU.UserPosition', {
		setup: function() {
			userPosition = TWTU.UserPosition.create();
			userPosition.clearCache();

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

	test( 'user\'s position is cached and loaded immediately if available', function() {
		navigator.geolocation.watchPosition = watchPositionSuccess;
		// prime the cache
		userPosition.getPosition();

		Events.reset();
		navigator.geolocation.watchPosition = watchPositionSuccessAsync;
		userPosition.bindEvent( 'positionchange', Events.eventHandler );
		userPosition.getPosition();

		// with an async handler, if the position is already known from previous tests, it
		// should be saved and positionchange should be immediately called.
		ok( Events.isTriggered( 'positionchange' ), 'positionchange triggered' );
	} );

}() );
