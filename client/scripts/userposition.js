TWTU.UserPosition = (function() {
	"use strict";

	var UserPosition = AFrame.AObject.extend( {
		getPosition: function() {
			var geo = navigator.geolocation, me=this;

			if( geo ) {
				geo.watchPosition( function( results ) {
					me.triggerEvent( 'positionchange', results.coords );
				},
				me.triggerEvent.bind( me, 'positionerror' ),
				{
					enableHighAccuracy: true
				} );
			}
		}
	} );

	return UserPosition;
}() );
