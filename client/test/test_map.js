( function() {
	'use strict';

	var map;

	module( 'TWTU.Map', {
		setup: function() {
			google.maps.clearChanges();

			map = AFrame.create( TWTU.Map, {
				target: '#map',
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
}() );
