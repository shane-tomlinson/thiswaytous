
TWTU.Users = (function() {
	"use strict";

	var Users = AFrame.Class( AFrame.CollectionArray, {
		importconfig: [ 'session' ],
		events: {
			'requestComplete session': onSessionUpdate
		},
		plugins: [ [ AFrame.CollectionPluginModel, {
			schema: TWTU.User
		} ] ]
	} );

	function onSessionUpdate( event, data ) {
		var me=this;
		updateCurrentUserID.call( me, data.user_id );

		me.triggerEvent( 'updatestart' );

		var users = data && data.users
		if( users ) {
			users.forEach( insertUpdateUser, this );
		}

		me.triggerEvent( 'updatecomplete' );
	}

	function updateCurrentUserID( userID ) {
		var tempUser = this.get( 'currentUser' );
		if( tempUser ) {
			tempUser.set( 'id', userID );
		}
	}

	function insertUpdateUser( user, index ) {
		var me = this, existingUser = me.search( searchForItemWithID.bind( null, user.id ) );

		if( existingUser ) {
			existingUser.set( user );
		}
		else {
			me.insert( user );
		}
	}

	function searchForItemWithID( idToFind, item ) {
		return item.get( 'id' ) === idToFind;
	}


	return Users;
}() );
