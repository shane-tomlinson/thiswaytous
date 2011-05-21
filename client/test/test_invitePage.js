( function() {
	"use strict";

	var invitePage, sessionStarted;

	module( 'TWTU.InvitePage', {
		setup: function() {
			invitePage = AFrame.create( TWTU.InvitePage, {
				target: '#target',
				session: {
					start: function() {
						sessionStarted = true;
					}
				}
			} );

			sessionStarted = false;
		},
		teardown: function() {
			invitePage.teardown();
		}
	} );

	test( 'invitePage is created', function() {
		ok( invitePage instanceof TWTU.InvitePage, 'invitePage created' );
	} );

	test( 'showing invitePage starts a session', function() {
		ok( !sessionStarted, 'session has not yet been started' );

		invitePage.show();

		ok( sessionStarted, 'session started on invitePage show' );
	} );
}() );
