(function() {
	"use strict";

	var AFrame = require( './aframe-current-node' );
	var userSchema = {
		id: 'id',
		name: 'string',
		lat: 'number',
		lon: 'number'
	};

	var Users = AFrame.CollectionHash.extend( {
		plugins: [ [ AFrame.CollectionPluginModel, {
			schema: userSchema
		}
		] ],
		insert: function( model ) {
			var userID = getUserID( model.get( 'id' ) );
			model.cid = userID;
			model.set( 'id', userID );
			return Users.sc.insert.call( this, model );
		}
	} );

	function getUserID( seed ) {
		var id = ( seed === 'currentUser' ) || !AFrame.defined( seed ) ? createUserID() : seed;
		return id;
	}

	var userID = 0;
	function createUserID() {
		var id = 'user' + userID;
		userID++;
		return id;
	}

	module.exports = Users;


}() );
