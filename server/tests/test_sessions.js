(function() {
	"use strict";

	var testCase = require('nodeunit').testCase,
		assert = require('../assert-extras'),
		Sessions = require('../sessions'),
		Session = require('../session'),
		AFrame = require('../aframe-current-node');

	var sessions;
	module.exports = testCase({
		setUp: function( callback ) {
			sessions = Sessions.create();

			callback();
		},

		tearDown: function( callback ) {
			sessions.teardown();
			sessions = null;

			callback();
		},

		'can instantiate' : function( test ) {
			test.ok( sessions instanceof Sessions, 'can create sessions' );
			test.done();
		},

		'can create a session': function( test ) {
			var session = sessions.createSession();
			assert.ok( session instanceof Session, 'can get a session' );
			test.done();
		},

		'can get a session once created' : function( test ) {
			var session = sessions.createSession();

			var sessionGet = sessions.getSessionByData( session.getDataObject() );

			test.strictEqual( sessionGet, session, 'session can be looked up by data object' );

			test.done();
		},

		'case of session ids does not matter' : function( test ) {
			var session = sessions.createSession();

			session.set( 'invite_code_1', session.get( 'invite_code_1' ).toUpperCase() );
			session.set( 'invite_code_2', session.get( 'invite_code_2' ).toUpperCase() );
			session.set( 'invite_code_3', session.get( 'invite_code_3' ).toUpperCase() );

			var sessionGet = sessions.getSessionByData( session.getDataObject() );

			test.strictEqual( sessionGet, session, 'session can be looked up by data object' );

			test.done();
		}
	});

}() );
