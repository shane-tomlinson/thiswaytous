(function() {
	"use strict";

	var AFrame = require( './aframe-current-node' );
	var Users = require( './users' );

	var schema = {
		id: { type: 'id' },
		user_id: { type: 'id' },
		start_date: { type: 'iso8601' },
		invite_code_1: { type: 'string' },
		invite_code_2: { type: 'string' },
		invite_code_3: { type: 'string' }/*,
		users: { type: userSchema, has_many: true }
		*/
	};

	var Session = AFrame.Model.extend( {
		schema: schema,
		init: function( config ) {
			this.users = Users.create();
			Session.sc.init.call( this, config );
		},

		addUpdateUser: function( userData ) {
			var func = this.getUser( userData.id ) ? updateUser : addUser;

			var userID = func.call( this, userData );
			this.set( 'user_id', userID );

			return userID;
		},

		getUser: function( id ) {
			return this.users.get( id );
		},

		removeUser: function( id ) {
			this.users.remove( id );
		},

		toString: function() {
			var items = this.serializeItems();

			var users = [];
			this.users.forEach( function( user, index ) {
				users.push( user.serializeItems() );
			} );

			items.users = users;

			return JSON.stringify( items );
		}
	} );

	function addUser( userData ) {
		return this.users.insert( userData );
	}

	function updateUser( userData ) {
		var user = this.getUser( userData.id );
		user.set( userData );
		return userData.id;
	}

	module.exports = Session;
}());
