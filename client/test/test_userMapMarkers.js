( function() {
	"use strict";

	var userMapMarkers, markers, map, user;

	module( 'TWTU.UserMapMarkers', {
		setup: function() {
			map = new MapStub();

			markers = AFrame.CollectionArray.create();

			userMapMarkers = TWTU.UserMapMarkers.create( {
				map: map,
				markers: markers
			} );

			user = AFrame.DataContainer.create( {
				data: {
					name: 'Shane',
					latitude: 0,
					longitude: 1
				}
			} );

		},

		teardown: function() {
			userMapMarkers.teardown();
			markers.teardown();
			user.teardown();
		}
	} );

	test( 'userMapMarkers is created', function() {
		ok( userMapMarkers instanceof TWTU.UserMapMarkers, 'userMapMarkers created' );
	} );

	test( 'when adding a user to the markers, addMarker is called', function() {
		markers.insert( user );

		ok( map.isMarkerAdded(), 'Marker has been added to map' );
	} );

	test( 'when removing a marker from markers, removeMarker is called', function() {
		markers.insert( user );
		markers.remove( 0 );

		ok( map.isMarkerRemoved(), 'Marker has been removed from map' );
	} );

	test( 'when updating latitude of user, map is updated', function() {
		markers.insert( user );

		user.set( 'latitude', 1 );
		ok( map.isMarkerMoved(), 'Marker has been moved' );
	} );

	test( 'when removing a user, map is updated', function() {
		var id = markers.insert( user );

		markers.remove( id );
		ok( map.isMarkerRemoved(), 'Marker has been removed' );
	} );

	function MapStub() {
		var marker, markerRemoved, markerMoved;

		this.reset = function() {
			marker = markerRemoved = markerMoved = false;
		};

		this.addMarker = function( data ) {
			marker = data;
			return 1;
		};

		this.isMarkerAdded = function() {
			return 'object' === typeof marker;
		};

		this.removeMarker = function( id ) {
			markerRemoved = true;
		}

		this.isMarkerRemoved = function() {
			return markerRemoved;
		}

		this.moveMarker = function() {
			markerMoved = true;
		}

		this.isMarkerMoved = function() {
			return markerMoved;
		}

		this.reset();
	};

}() );
