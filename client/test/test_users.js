( function() {
	"use strict";

	var users, session;
	module( 'TWTU.Users', {
		setup: function() {
			session = AFrame.AObject.create();
			users = TWTU.Users.create( {
				session: session
			} );
		},

		teardown: function() {
			users.teardown();
			session.teardown();
		}
	} );

	test( 'can create TWTU.Users', function() {
		ok( users instanceof TWTU.Users, 'instance created' );
	} );

}() );
