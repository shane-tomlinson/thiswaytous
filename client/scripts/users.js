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

		init: function( config ) {
			var me=this;

			Users.sc.init.call( me, config );

			me.session.bindEvent( 'requestComplete', onSessionUpdate, me );
		}
	} );

	function onSessionUpdate( event, data ) {
		var users = data && data.users
		if( users ) {
			insertUpdateUsers.call( this, users );
		}
	}

	function insertUpdateUsers( users ) {
		var me=this;
		users.forEach( function( user, index ) {
			var existingUser = me.search( searchForItemWithID.curry( user.id ) );

			if( existingUser ) {
				existingUser.set( 'name', user.name );
				existingUser.set( 'lat', user.lat );
				existingUser.set( 'lon', user.lon );
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
