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
		map.bindEvent( 'markeradd', Events.eventHandler );

		var id = map.addMarker( {
			name: 'Test User',
			latitude: 0,
			longitude: 0
		} );

		equal( 'number', typeof id, 'addMarker returns an id' );
		ok( Events.isTriggered( 'markeradd' ), 'markeradd was triggered' );
	} );

	test( 'moveMarker moves a marker if latitude or longitude are different', function() {
		map.bindEvent( 'markermove', Events.eventHandler );

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
		ok( Events.isTriggered( 'markermove' ), 'markermove was triggered' );
	} );

	test( 'removeMarker works', function() {
		map.bindEvent( 'markerremove', Events.eventHandler );
		var id = map.addMarker( {
			name: 'Marker 1',
			latitude: 0,
			longitude: 0
		} );

		map.removeMarker( id );

		ok( google.maps.isMarkerRemoved(), 'marker has been removed' );
		ok( Events.isTriggered( 'markerremove' ), 'markerremove was triggered' );
	} );

	test( 'forEachMarker works', function() {
		map.addMarker( {
			name: 'Marker 1',
			latitude: 0,
			longitude: 0
		} );

		map.addMarker( {
			name: 'Marker 2',
			latitude: 0,
			longitude: 0
		} );

		var maxIndex;
		map.forEachMarker( function( marker, index ) {
			maxIndex = index;
		} );

		equals( maxIndex, 1, 'forEachMarker called twice' );
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

}() );
