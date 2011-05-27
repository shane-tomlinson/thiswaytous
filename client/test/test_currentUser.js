(function() {
	"use strict";

	var user, originalUserData;

	module( "TWTU.CurrentUser", {
		setup: function() {
			originalUserData = localStorage.getItem( 'localUser' );

			localStorage.removeItem( 'localUser' );

			user = AFrame.create( TWTU.CurrentUser );
		},
		teardown: function() {
			if( originalUserData ) {
				localStorage.setItem( 'localUser', originalUserData );
			}
		}
	} );


	test( 'can create new user, id is currentUser', function() {
		ok( user instanceof TWTU.CurrentUser, 'instance created' );
		equal( user.get( 'id' ), 'currentUser', 'currentUser used as ID if no data ' );
	} );

	test( 'Can set, and reload data and it stays the same', function() {
		// this should cause a save to happen
		user.set( {
			name: 'Test User',
			lat: 0.01,
			lon: 0.01,
			id: 1
		} );

		user = AFrame.create( TWTU.CurrentUser );

		equal( user.get( 'name' ), 'Test User', 'name is loaded on startup' );
		equal( user.get( 'id' ), 1, 'id is loaded on startup' );
	} );
}() );
