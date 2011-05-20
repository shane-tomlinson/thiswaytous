TWTU.CurrentUser = (function() {
	"use strict";

	var canStore = 'localStorage' in window && window['localStorage'] !== null;
	var localStorage = window.localStorage;

	var User = AFrame.Class( TWTU.User, {
		init: function( config ) {
			var me=this;
			config.cid = 'currentUser';
			config.data = loadData.call( me );
			loadData.call( me, config );

			User.sc.init.call( me, config );
		},

		save: function() {
			if( canStore ) {
				var localUser = JSON.stringify( this.serializeItems() );

				localStorage.setItem( 'localUser', localUser );
			}
		},

		hasData: function() {
			return this.haveData;
		}
	} );

	function loadData( config ) {
		var data = {};

		if( canStore ) {
			var store = localStorage.getItem( 'localUser' );

			if( store ) {
				data = JSON.parse( store );
				this.haveData = !!data.name;
			}
		}

		data.id = data.id || 'currentUser';

		return data;
	}

	return User;
}() );
