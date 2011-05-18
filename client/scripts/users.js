Function.prototype.curry = function() {
    var fn = this, args = Array.prototype.slice.call(arguments);
    return function() {
      return fn.apply(this, args.concat(
        Array.prototype.slice.call(arguments)));
    };
};

TWTU.Users = (function() {
	"use strict";
	var Users = AFrame.Class( AFrame.CollectionHash, {
		importconfig: [ 'session' ],
		events: {
			'requestComplete session': onSessionUpdate
		}
	} );

	function onSessionUpdate( event, data ) {
		updateCurrentUserID.call( this, data.user_id );

		var users = data && data.users
		if( users ) {
			insertUpdateUsers.call( this, users );
		}
	}

	function updateCurrentUserID( userID ) {
		var tempUser = this.get( 'currentUser' );
		if( tempUser ) {
			tempUser.set( 'id', userID );
		}
	}

	function insertUpdateUsers( users ) {
		var me=this;
		users.forEach( function( user, index ) {
			var existingUser = me.search( searchForItemWithID.curry( user.id ) );

			if( existingUser ) {
				existingUser.set( user );
			}
			else {
				me.insert( user );
			}
		} );
	}

	function searchForItemWithID( idToFind, item ) {
		return item.get( 'id' ) === idToFind;
	}


	return Users;
}() );
