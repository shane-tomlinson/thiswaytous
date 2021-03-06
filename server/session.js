(function() {
	"use strict";

	var AFrame = require( './aframe-current-node' );

	var schema = {
		id: { type: 'id' },
		user_id: { type: 'id' },
		start_date: { type: 'iso8601' },
		invite_code_1: { type: 'string' },
		invite_code_2: { type: 'string' },
		invite_code_3: { type: 'string' }
	};

	var Session = AFrame.Model.extend( {
		importconfig: [ 'users' ],
		schema: schema,
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

        setDestination: function( dest ) {
            this.destination = dest;
        },

		toString: function() {
			var items = this.serializeItems();

			var users = [];
			this.users.forEach( function( user, index ) {
				users.push( user.serializeItems() );
			} );

			items.users = users;
            items.destination = this.destination;

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
