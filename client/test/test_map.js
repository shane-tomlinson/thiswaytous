( function() {
	'use strict';

	var map;

	module( 'TWTU.Map', {
		setup: function() {
			google.maps.clearChanges();

			map = AFrame.create( TWTU.Map, {
				target: '#target',
				position: {
					latitude: 0,
					longitude: 1
				}
			} );

			Events.reset();
		},

		teardown: function() {
			map.teardown();
		}
	} );

	test( 'Map is created', function() {
		ok( map instanceof TWTU.Map, 'map is created' );
	} );

	test( 'addMarker creates a new marker', function() {
		var id = map.addMarker( {
			name: 'Test User',
			latitude: 0,
			longitude: 0
		} );

		equal( 'number', typeof id, 'addMarker returns an id' );
	} );

	test( 'moveMarker moves a marker if latitude or longitude are different', function() {
		var id = map.addMarker( {
			name: 'Test User',
			latitude: 0,
			longitude: 0
		} );

		map.moveMarker( id, {
			latitude: 1,
			longitude: 0
		} );

		ok( google.maps.isPositionChanged(), 'position of added marker has changed' );
	} );

	test( 'removeMarker works', function() {
		var id = map.addMarker( {
			name: 'Marker 1',
			latitude: 0,
			longitude: 0
		} );

		map.removeMarker( id );

		ok( google.maps.isMarkerRemoved(), 'marker has been removed' );
	} );

	test( 'setCenter works', function() {
		map.setCenter( {
			latitude: 0,
			longitude: 0
		} );

		ok( google.maps.isCentered(), 'map has been centered' );
	} );

	test( 'setViewport works', function() {
		map.setViewport( {
			ne: {
				latitude: 0,
				longitude: 0
			},
			sw: {
				latitude: 0,
				longitude: 0
			}
		} );

		ok( google.maps.isViewPortSet(), 'map has been centered' );
	} );

	test( 'viewportchange event on setViewport', function() {
		map.bindEvent( 'viewportchange', Events.eventHandler );

		map.setViewport( { sw: {}, ne: {} } );

		equal( true, Events.isTriggered( 'viewportchange' ), 'viewportchange triggered' );
	} );

	test( 'viewportchange event on setCenter', function() {
		map.bindEvent( 'viewportchange', Events.eventHandler );

		map.setCenter( {} );

		equal( true, Events.isTriggered( 'viewportchange' ), 'viewportchange triggered' );
	} );

	test( 'viewportchange event on map drag', function() {
		map.bindEvent( 'viewportchange', Events.eventHandler );

		google.maps.event.triggerEvent( 'dragend' );

		equal( true, Events.isTriggered( 'viewportchange' ), 'viewportchange triggered' );
	} );
}() );
