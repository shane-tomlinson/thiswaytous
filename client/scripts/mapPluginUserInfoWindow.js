TWTU.MapPluginUserInfoWindow = ( function() {
	"use strict";

	var maps = google.maps, gEvent = maps.event, userInfoWindow;

	var Plugin = AFrame.Plugin.extend( {
		events: {
			'onMarkerAdd plugged' : onMarkerAdd
		}
	} );

	function onMarkerAdd( event, name, marker ) {
		gEvent.addListener( marker, 'click', openUserInfoWindow.bind( this, name, marker ) );
	}

	function openUserInfoWindow( user, marker ) {
		if( !userInfoWindow ) {
			userInfoWindow = new maps.InfoWindow();
		}

		userInfoWindow.setContent( user );
		userInfoWindow.open( this.getPlugged().getMap(), marker );
	}

	return Plugin;

}() );
