(function() {
	"use strict";

	var testCase = require('nodeunit').testCase,
		assert = require('../assert-extras'),
		User = require('../user.js'),
		AFrame = require('../aframe-current-node.js');

	var user, userInfo;

	module.exports = testCase({
		setUp: function( callback ) {
			userInfo = {
				name: 'Shane',
				lat: 0,
				lon: 0,
				id: 'user0'
			};
			user = User.create( {
				data: userInfo
			} );
			callback();
		},

		tearDown: function( callback ) {
			user.teardown();
			user = null;

			callback();
		},

		'can initialize, initial data set': function( test ) {
			test.ok( user instanceof User, 'can initialize' );

			test.strictEqual( 'Shane', user.get( 'name' ), 'we have a name' );
			test.done();
		}
	});
}());
