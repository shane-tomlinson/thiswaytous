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

	test( 'requestComplete adds users', function() {
		users.bindEvent( 'updatestart', Events.eventHandler );
		users.bindEvent( 'updatecomplete', Events.eventHandler );

		session.triggerEvent( 'requestComplete', {
			users: [ {
				id: 0,
				name: 'shane'
			} ]
		} );

		var user = users.get( 0 );

		strictEqual( 0, user.get( 'id' ), 'user was inserted from requestComplete' );

		ok( Events.isTriggered( 'updatestart' ), 'updatestart triggered' );
		ok( Events.isTriggered( 'updatecomplete' ), 'updatecomplete triggered' );
	} );

}() );
