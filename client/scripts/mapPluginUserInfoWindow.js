TWTU.MapPluginUserInfoWindow = ( function() {
	"use strict";

	var maps = google.maps, gEvent = maps.event;

	var Plugin = AFrame.Plugin.extend( {
        importconfig: [ 'controller' ], 
		events: {
			'markeradd plugged' : onMarkerAdd
		}
	} );

	function onMarkerAdd( event, marker ) {
		gEvent.addListener( marker, 'click', openUserInfoWindow.bind( this, marker ) );
	}

	function openUserInfoWindow( marker ) {
        this.controller.pushState( '/user/' + marker.id );
	}

	return Plugin;

}() );
