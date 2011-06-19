( function() {
	"use strict";

	var userMapMarkers, users, map, user, destination;

	module( 'TWTU.UserMapMarkers', {
		setup: function() {
			map = new MapStub();

			users = AFrame.CollectionArray.create();
            destination = AFrame.DataContainer.create();

			userMapMarkers = TWTU.UserMapMarkers.create( {
				map: map,
				users: users,
                destination: destination
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

		user.set( 'latitude', 1 );
		ok( map.isMarkerMoved(), 'Marker has been moved' );
	} );

	test( 'when removing a user, map is updated', function() {
		var id = users.insert( user );

		users.remove( id );
		ok( map.isMarkerRemoved(), 'Marker has been removed' );
	} );

    test( 'when setting the destination\'s lat, lng, moveMarker is called', function() {
        destination.set( 'latitude', 1 );

        ok( map.isMarkerMoved(), 'Marker has been moved' );
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
