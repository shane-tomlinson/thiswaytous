TWTU.UserMapMarkers = (function() {
	"use strict";

	var Markers = AFrame.Class( AFrame.AObject, {
		importconfig: [ 'map', 'users' ],
		events: {
			'onInsert users': onUserAdd,
			'onRemove users': onUserRemove
		},

		init: function( config ) {
			this.markers = {};

			Markers.sc.init.call( this, config );
		}
	} );

	function onUserAdd( event ) {
		var user = event.item,
			markerID = this.map.addMarker( getUserInfo( user ) );

		this.markers[ user.getCID() ] = markerID;

		user.bindEvent( 'onSet', onUserChange, this );
	}

	function onUserRemove( event ) {
		var user = event.item, markerID = getMarkerIDForUser.call( this, user );
		if( markerID ) {
			this.map.removeMarker( markerID );
		}
	}

	function onUserChange( event ) {
		var user = event.target, markerID = getMarkerIDForUser.call( this, user );
		if( AFrame.defined( markerID ) ) {
			this.map.moveMarker( markerID, getUserInfo( user ) );
		}
	}

	function getUserInfo( user ) {
		return {
			name: user.get( 'name' ),
			latitude: user.get( 'lat' ),
			longitude: user.get( 'lon' )
		}
	}

	function getMarkerIDForUser( user ) {
		return this.markers[ user.getCID() ];
	}

	return Markers;
}() );
