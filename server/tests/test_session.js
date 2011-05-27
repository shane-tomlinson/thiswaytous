(function() {
	"use strict";

	var testCase = require('nodeunit').testCase,
		Session = require('../session.js'),
		AFrame = require('../aframe-current-node.js');

	var session, userInfo;

	module.exports = testCase({
		setUp: function( callback ) {
			session = Session.create();
			userInfo = {
				name: 'Shane',
				lat: 0,
				lon: 0
			};
			callback();
		},
		tearDown: function( callback ) {
			session.teardown();
			session = null;

			callback();
		},

		'add user no id': function(test) {
			var id = session.addUpdateUser( userInfo );

			test.notStrictEqual( 'undefined', id, 'added user, and id is defined' );
			console.log( 'id: ' + id );
			console.log( 'user_id: ' + session.get( 'user_id' ) );
			test.strictEqual( session.get( 'user_id' ), id, 'user_id is the same as the returned id' );

			test.done();
		},

		'add user with id': function(test) {
			userInfo.id = 1;
			var id = session.addUpdateUser( userInfo );

			test.equal( id, 1 );

			test.done();
		},

		'update user' : function(test) {
			var origID = session.addUpdateUser( userInfo );

			userInfo.id = origID;
			userInfo.name = 'Charlotte';

			var id = session.addUpdateUser( userInfo );

			test.strictEqual( id, origID, 'updated user, and id is same as original id' );
			test.strictEqual( session.get( 'user_id' ), origID, 'user_id is set to original id' );

			var user = session.getUser( origID );

			test.strictEqual( 'Charlotte', user.get( 'name' ), 'user name updated to Charlotte' );

			test.done();
		},

		'test toString': function(test) {
			session.addUpdateUser( userInfo );

			var string = session.toString();
			test.ok( 'string' === typeof string );

			var sessionInfo = JSON.parse( string );
			test.strictEqual( 1, sessionInfo.users && sessionInfo.users.length, 'users are added to the string' );

			test.done();
		}
	});
}());
