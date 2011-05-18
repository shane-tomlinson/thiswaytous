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
			var me=this, userID = userData.id,
				user = userID && me.getUser( userID );

			if( !user ) {
				userID = me.addUser( userData.name, userData.lat, userData.lon );
			}
			else {
				me.updateUser( userID, userData.lat, userData.lon );
			}

			me.set( 'user_id', userID );

			return userID;

		},

		addUser: function( name, lat, lon ) {
			var userID = Session.userID;
			Session.userID++;

			var users = this.get( 'users' );

			users.push( {
				name: name,
				lat: lat,
				lon: lon,
				id: userID
			} );

			return userID;
		},

		getUser: function( id ) {
			return this.get( 'users' )[ id ];
		},

		updateUser: function( id, lat, lon ) {
			var user = this.getUser( id );
			if( user ) {
				user.lat = lat;
				user.lon = lon;
			};
		},

		removeUser: function( id ) {
			AFrame.remove( this.users, id );
		},

		toString: function() {
			return JSON.stringify( this.serializeItems() );
		}
	} );
	Session.userID = 0;

	module.exports = Session;
}());
