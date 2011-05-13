TWTU.Session = (function() {
	"use strict";

	var schema = {
		id: { type: 'string' },
		start_date: { type: 'iso8601' },
		invite_code_1: { type: 'string' },
		invite_code_2: { type: 'string' },
		invite_code_3: { type: 'string' }/*,
		users: { type: TWTU.Users, has_many: true }*/
	};

	var Session = AFrame.Class( AFrame.Model, {
		importconfig: [ 'currentUser' ],
		schema: schema,
		start: function() {
			var me=this;
			me.set( 'invite_code_1', '' );
			me.set( 'invite_code_2', '' );
			me.set( 'invite_code_3', '' );

			makeRequest.call( me, 'start' );
		},
		join: function() {
			var me=this;
			makeRequest.call( me, 'join' );
		},
		update: function() {

		}
	} );


	var urlBase = '/session/';
	var services = {
		start: 'start',
		join: 'join',
		update: 'update'
	};

	function makeRequest( service ) {
		this.triggerEvent( 'requestStart' );
		TWTU.Network.ajax( {
			url: urlBase + services[ service ],
			success: onSessionInitialized.bind( this ),
			data: this.currentUser.serializeItems(),
			type: 'POST'
		} );
	}

	function onSessionInitialized( data ) {
		for( var key in data ) {
			this.set( key, data[ key ] );
		}
		AFrame.log( 'session updated' );
		this.triggerEvent( 'requestComplete', data );
	}

	return Session;
}() );
