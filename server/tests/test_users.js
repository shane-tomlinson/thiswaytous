(function() {
	"use strict";

	var testCase = require('nodeunit').testCase,
		Users = require('../users.js'),
		AFrame = require('../aframe-current-node.js');

	var users, userInfo;

	module.exports = testCase({
		setUp: function( callback ) {
			users = Users.create();
			userInfo = {
				name: 'Shane',
				lat: 0,
				lon: 0
			};
			callback();
		},

		tearDown: function( callback ) {
			users.teardown();
			users = null;

			callback();
		},

		'can initialize': function( test ) {
			test.ok( users instanceof Users );
			test.done();
		},

		'can insert and get user': function( test ) {
			var userID = users.insert( userInfo );
			test.notStrictEqual( 'undefined', typeof userID, 'userID is defined' );

			var user = users.get( userID );
			test.strictEqual( true, user instanceof AFrame.Model, 'can get the user we added' );

			test.strictEqual( userID, user.get( 'id' ), 'userID and the user\'s id are the same' );
			console.log( 'id: ' + JSON.stringify( user.serializeItems() ) );
			test.done();
		},

		'can insert user with userID = currentUser' : function( test ) {
			userInfo.id = 'currentUser';

			var userID = users.insert( userInfo );

			test.notStrictEqual( userID, 'currentUser', 'replaced currentUser id' );
			test.done();
		}
	});
}());
