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
		var user = event.item;

		console.log( 'added user: ' + user.get( 'name' ) );

		var markerID = this.map.addMarker( user.get( 'name' ),
			getUserPosition( user ) );
		this.markers[ user.get( 'id' ) ] = markerID;
	}

	function onUserRemove( event, user ) {
		console.log( 'removed user' );
	}

	function getUserPosition( user ) {
		return {
			latitude: user.get( 'lat' ),
			longitude: user.get( 'lon' )
		}
	}

	return Markers;
}() );
