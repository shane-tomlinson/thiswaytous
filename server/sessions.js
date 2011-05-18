(function() {
	"use strict";

	var Session = require( './session' ),
		AFrame = require( './aframe-current-node' ),
		sessionID = 0;

	var Sessions = AFrame.Class( AFrame.CollectionArray, {
		createSession: function() {
			var session = AFrame.create( Session, {
				data: {
					id: sessionID,
					start_date: Date.now(),
					invite_code_1: 'aaa',
					invite_code_2: 'aaa',
					invite_code_3: 'aa' + sessionID,
				}
			} );

			this.insert( session );

			sessionID++;

			return session;
		}
	} );

	module.exports = Sessions;
}() );
