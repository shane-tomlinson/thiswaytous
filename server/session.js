(function() {
	"use strict";

	var AFrame = require( './aframe-current-node' );
	var userSchema = {
		id: 'string',
		name: 'string',
		lat: 'number',
		lon: 'number'
	};

	var schema = {
		id: { type: 'string' },
		user_id: { type: 'number' },
		start_date: { type: 'iso8601' },
		invite_code_1: { type: 'string' },
		invite_code_2: { type: 'string' },
		invite_code_3: { type: 'string' },
		users: { type: userSchema, has_many: true }
	};

	var Session = AFrame.Class( AFrame.Model, {
		schema: schema,
		addUpdateUser: function( userData ) {
			var me=this, userID = getUserID( userData.id ),
				user = AFrame.defined( userID ) && me.getUser( userID ),
				func = user ? 'updateUser' : 'addUser';

			userID = me[ func ]( userID, userData.name, userData.lat, userData.lon );

			me.set( 'user_id', userID );

			return userID;
		},

		addUser: function( id, name, lat, lon ) {
			id = AFrame.defined( id ) ? id : createUserID();

			var users = this.get( 'users' );
			users.push( {
				name: name,
				lat: lat,
				lon: lon,
				id: id
			} );

			console.log( 'adding user: ' + users[ users.length - 1 ] );

			return id;
		},

		getUser: function( id ) {
			return this.get( 'users' )[ id ];
		},

		updateUser: function( id, name, lat, lon ) {
			var user = this.getUser( id );
			if( user ) {
				user.name = name;
				user.lat = lat;
				user.lon = lon;
			};

			console.log( 'updating user: ' + user );
			return id;
		},

		removeUser: function( id ) {
			AFrame.remove( this.users, id );
		},

		toString: function() {
			return JSON.stringify( this.serializeItems() );
		}
	} );

	function getUserID( seed ) {
		var id = seed != 'currentUser' ? seed : undefined;
		return id;
	}

	Session.userID = 0;
	function createUserID() {
		var userID = Session.userID;
		Session.userID++;
		return userID;
	}

	module.exports = Session;
}());
