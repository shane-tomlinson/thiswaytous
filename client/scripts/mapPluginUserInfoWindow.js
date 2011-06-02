TWTU.MapPluginUserInfoWindow = ( function() {
	"use strict";

	var maps = google.maps, gEvent = maps.event, userInfoWindow;

	var Plugin = AFrame.Plugin.extend( {
		events: {
			'markeradd plugged' : onMarkerAdd
		}
	} );

	function onMarkerAdd( event, marker ) {
		gEvent.addListener( marker, 'click', openUserInfoWindow.bind( this, marker ) );
	}

	function openUserInfoWindow( marker ) {
		if( !userInfoWindow ) {
			userInfoWindow = new maps.InfoWindow();
		}

		userInfoWindow.setContent( marker.title );
		userInfoWindow.open( this.getPlugged().getMap(), marker );
	}

	return Plugin;

}() );
