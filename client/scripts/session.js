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
		importconfig: [ 'currentUser', 'destination' ],
		schema: schema,
		connected: false,
		start: function() {
			var me=this;
			me.set( 'id', '' );
			me.set( 'invite_code_1', '' );
			me.set( 'invite_code_2', '' );
			me.set( 'invite_code_3', '' );

			request.call( me, 'start', 
                getRequestData.call( me, [ 'destination', 'user' ] ),
				function( data ) {
					me.connected = true;
				},
				function( data ) {

			} );
		},

		join: function() {
			var me=this;
			request.call( me, 'join', 
                getRequestData.call( me, [ 'session', 'user' ] ),
				function( data ) {
					me.connected = true;
                    
                    updateDestination.call( me, data.destination );
				},
				function( data ) {

			} );

		},

		update: function() {
            var me=this;
			if( me.connected ) {
				request.call( me, 'update', 
                    getRequestData.call( me, [ 'user', 'destination', 'session' ] ),
					function( data ) {
                        updateDestination.call( me, data.destination );
					},
					function( data ) {

				} );
			}
		},

		isInSession: function() {
			return this.connected;
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

    function getDestination() {
        var destination = this.destination,
            obj = {};
        // only send the destination if we created it. 
        if( destination.get( 'created_by_me' ) ) {
            obj = {
                latitude: destination.get( 'latitude' ),
                longitude: destination.get( 'longitude' ),
                visible: destination.get( 'visible' )
            };
        }
        return obj;
    }

    function updateDestination( dest ) {
        if( dest ) {
            this.destination.set( dest );
            // reset the created_by_me so others have the opportunity
            // to update it.
            this.destination.set( 'created_by_me', false );
        }
    }

    function getRequestData( fields ) {
        var me=this,
            allData = {
                session: JSON.stringify( me.serializeItems() ),
                user: JSON.stringify( me.currentUser.serializeItems() ),
                destination: getDestination.call( me )
            };

        var reqData = {};
        fields.forEach(function( field ) {
            reqData[ field ] = allData[ field ];
        } );

        if( reqData.destination && 
                    'number' === typeof reqData.destination.latitude ) {
            reqData.destination = JSON.stringify( reqData.destination );
        } 
        else {
            delete reqData.destination;
        }
        return reqData;
    }

	return Session;
}() );
