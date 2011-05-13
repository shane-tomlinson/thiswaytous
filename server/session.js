(function() {
	"use strict";

	var AFrame = require( './aframe-current-node' );
	var userSchema = {
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
		init: function( config ) {
			this.userID = 0;
			Session.sc.init.call( this, config );
		},

		addUser: function( name, lat, lon ) {
			var userID = this.userID;
			this.userID++;

			var users = this.get( 'users' );

			users.push( {
				name: name,
				lat: lat,
				lon: lon,
				id: userID
			} );

			return userID;
		},

		updateUser: function( id, lat, lon ) {
			var user = this.users[ id ];
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

	module.exports = Session;
}());
