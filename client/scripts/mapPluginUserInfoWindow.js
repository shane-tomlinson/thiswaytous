TWTU.MapPluginUserInfoWindow = ( function() {
	"use strict";

	var Plugin = AFrame.Plugin.extend( {
        importconfig: [ 'controller' ], 
		events: {
			'markerclick plugged' : onMarkerClick
		}
	} );

    function onMarkerClick( event, markerInfo ) {
        var url = '/' + markerInfo.type;
        if( AFrame.defined( markerInfo.id ) ) {
            url += '/' + markerInfo.id;
        }
        this.controller.pushState( url );
	}

	return Plugin;

}() );
