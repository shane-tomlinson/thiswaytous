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
		},

		teardown: function() {
			map.teardown();
		}
	} );

	test( 'Map is created', function() {
		ok( map instanceof TWTU.Map, 'map is created' );
	} );

	test( 'addMarker creates a new marker', function() {
		var id = map.addMarker( 'Test User', {
			latitude: 0,
			longitude: 0
		} );

		equal( 'number', typeof id, 'addMarker returns an id' );
	} );

	test( 'moveMarker moves a marker if latitude or longitude are different', function() {
		var id = map.addMarker( 'Test User', {
			latitude: 0,
			longitude: 0
		} );

		map.moveMarker( id, {
			latitude: 1,
			longitude: 0
		} );

		ok( google.maps.isPositionChanged(), 'position of added marker has changed' );
	} );

	test( 'adding additional markers causes the map viewport to move', function() {
		map.addMarker( 'Marker 1', {
			latitude: 0,
			longitude: 0
		} );

		map.addMarker( 'marker 2', {
			latitude: 0,
			longitude: 0
		} );

		ok( google.maps.areBoundsFitted(), 'bounds have been fitted' );

	} );

	test( 'moveMarker with 2 or more users causes the viewport to move', function() {
		map.addMarker( 'Marker 1', {
			latitude: 0,
			longitude: 0
		} );

		var id = map.addMarker( 'marker 2', {
			latitude: 0,
			longitude: 0
		} );

		google.maps.clearChanges();

		var marker = map.moveMarker( id, {
			latitude: 0,
			longitude: 1
		} );
		ok( google.maps.areBoundsFitted(), 'bounds have been fitted' );
	} );

}() );
