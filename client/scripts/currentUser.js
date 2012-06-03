/*global define */
define("currentUser", ["aframe-current-jquery", "user"], function(AFrame, User) {
	"use strict";

	var canStore = 'localStorage' in window && window.localStorage !== null;
	var localStorage = window.localStorage;

	var CurrentUser = AFrame.Class( User, {
		events: {
			'onSet': save
		},
		init: function( config ) {
			var me=this;
			config.cid = 'currentUser';
			config.data = loadData.call( me );
			loadData.call( me, config );

			User.sc.init.call( me, config );
		},

		hasData: function() {
			return !!this.get( 'name' );
		}
	} );

	function save() {
		if( canStore ) {
			var localUser = JSON.stringify( this.serializeItems() );

			localStorage.setItem( 'localUser', localUser );
		}
	}

	function loadData( config ) {
		var data = {};

		if( canStore ) {
			var store = localStorage.getItem( 'localUser' );

			if( store ) {
				data = JSON.parse( store );
			}
		}

		data.id = data.id || 'currentUser';

		return data;
	}

	return CurrentUser;
});
