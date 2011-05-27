( function() {
	"use strict";

	var userMapMarkers, users, map, user;

	module( 'TWTU.UserMapMarkers', {
		setup: function() {
			map = new MapStub();

			users = AFrame.CollectionArray.create();

			userMapMarkers = TWTU.UserMapMarkers.create( {
				map: map,
				users: users
			} );

			user = AFrame.DataContainer.create( {
				data: {
					name: 'Shane',
					lat: 0,
					lon: 1
				}
			} );

		},

		teardown: function() {
			userMapMarkers.teardown();
			users.teardown();
			user.teardown();
		}
	} );

	test( 'userMapMarkers is created', function() {
		ok( userMapMarkers instanceof TWTU.UserMapMarkers, 'userMapMarkers created' );
	} );

	test( 'when adding a user to the users, addMarker is called', function() {
		users.insert( user );

		ok( map.isMarkerAdded(), 'Marker has been added to map' );
	} );

	test( 'when removing a marker from users, removeMarker is called', function() {
		users.insert( user );
		users.remove( 0 );

		ok( map.isMarkerRemoved(), 'Marker has been removed from map' );
	} );

	test( 'when updating latitude of user, map is updated', function() {
		users.insert( user );

		user.set( 'lat', 1 );
		ok( map.isMarkerMoved(), 'Marker has been moved' );
	} );

	function MapStub() {
		var markerAdded, markerRemoved, markerMoved;

		this.reset = function() {
			markerAdded = markerRemoved = markerMoved = false;
		};

		this.addMarker = function( name, position ) {
			markerAdded = true;
			return 1;
		};

		this.isMarkerAdded = function() {
			return markerAdded;
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
