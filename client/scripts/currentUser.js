TWTU.CurrentUser = (function() {
	"use strict";

	var canStore = 'localStorage' in window && window['localStorage'] !== null;
	var localStorage = window.localStorage;

	var User = AFrame.Class( TWTU.User, {
		init: function( config ) {
			loadData.call( this, config );

			User.sc.init.call( this, config );

			if( !this.get( 'id' ) ) {
				this.set( 'id', 'temp' );
			}
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
		if( canStore ) {
			var data = localStorage.getItem( 'localUser' );

			if( data ) {
				config.dataSource = JSON.parse( data );
				this.haveData = !!config.dataSource.name;
			}

		}
	}

	return User;
}() );
