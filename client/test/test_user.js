(function() {
	"use strict";

	var user;

	module( "TWTU.User", {
		setup: function() {
			user = AFrame.create( TWTU.User );
		},
		teardown: function() {
			user.teardown();
		}
	} );


	test( 'can create new user', function() {
		ok( user instanceof TWTU.User, 'instance created' );
	} );

}() );
