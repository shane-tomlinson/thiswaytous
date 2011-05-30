TWTU.Session = (function() {
	"use strict";

	var schema = {
		id: { type: 'id' },
		start_date: { type: 'iso8601' },
		invite_code_1: { type: 'string' },
		invite_code_2: { type: 'string' },
		invite_code_3: { type: 'string' }
	};

	var Session = AFrame.Class( AFrame.Model, {
		importconfig: [ 'currentUser' ],
		schema: schema,
		connected: false,
		start: function() {
			var me=this;
			me.set( 'id', '' );
			me.set( 'invite_code_1', '' );
			me.set( 'invite_code_2', '' );
			me.set( 'invite_code_3', '' );

			request.call( me, 'start', this.currentUser.serializeItems(),
				function( data ) {
					me.connected = true;
				},
				function( data ) {

			} );
		},

		join: function() {
			var me=this;
			request.call( me, 'join', {
					session: JSON.stringify( me.serializeItems() ),
					user: JSON.stringify( me.currentUser.serializeItems() )
				},
				function( data ) {
					me.connected = true;
				},
				function( data ) {

			} );

		},

		update: function() {
			if( this.connected ) {
				var me=this;
				request.call( me, 'update', {
						session: JSON.stringify( me.serializeItems() ),
						user: JSON.stringify( me.currentUser.serializeItems() )
					},
					function( data ) {
					},
					function( data ) {

				} );
			}
		}
	} );


	var urlBase = '/session/';
	var services = {
		start: 'start',
		join: 'join',
		update: 'update'
	};

	function request( service, data, success, failure ) {
		var me=this;
		resetTimeout.call( me );
		TWTU.Network.ajax( {
			url: urlBase + services[ service ],
			success: function( resp ) {
				me.set( resp );

				if( success ) {
					success( resp )
				}

				me.triggerEvent( 'requestComplete', resp );
			},
			failure: failure,
			data: data,
			type: 'POST'
		} );
	}

	function resetTimeout() {
		var me=this;
		if( me.timeoutID ) {
			clearTimeout( me.timeoutID );
		}
		me.timeoutID = setTimeout( me.update.bind( me ), 20000 );
	}

	return Session;
}() );
