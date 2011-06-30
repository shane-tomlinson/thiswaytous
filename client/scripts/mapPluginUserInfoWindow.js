TWTU.MapPluginUserInfoWindow = ( function() {
	"use strict";

	var Plugin = AFrame.Plugin.extend( {
        importconfig: [ 'controller' ], 
		events: {
			'markerclick plugged' : onMarkerClick
		}
	} );

    function onMarkerClick( event, markerInfo ) {
        if( markerInfo.type !== 'destination' ) {
            this.controller.pushState( '/user/' + markerInfo.id );
        }
	}

	return Plugin;

}() );
