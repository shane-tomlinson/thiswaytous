(function() {
	"use strict";

	var Session = require( './session' ),
		Users = require( './users' ),
		AFrame = require( './aframe-current-node' ),
		currSession = 0;

	var Sessions = AFrame.Class( AFrame.CollectionHash, {
		createSession: function() {
			var sessionData = createNewSessionID();

			sessionData.id = currSession;
			sessionData.start_date = Date.now();

			var session = AFrame.create( Session, {
				data: sessionData,
				cid: getSessionID( sessionData ),
				users: Users.create()
			} );

			this.insert( session );

			currSession++;

			return session;
		},

		getSessionByData: function( data ) {
			return this.get( getSessionID( data ) );
		}
	} );

	function createNewSessionID() {
		var sessionID = {
			invite_code_1: 'aaa',
			invite_code_2: 'aaa',
			invite_code_3: 'aa' + currSession
		};

		return sessionID;
	}

	function getSessionID( data ) {
		return '' + data.invite_code_1.toLowerCase() + data.invite_code_2.toLowerCase() + data.invite_code_3.toLowerCase();
	}

	module.exports = Sessions;
}() );
