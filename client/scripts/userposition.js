TWTU.UserPosition = (function() {
	var UserPosition = AFrame.AObject.extend( {
		getPosition: function( success ) {
			var geo = navigator.geolocation;
			if( geo ) {
				geo.watchPosition( success,
				function( error ) {
					switch( error ) {
						case error.TIMEOUT:
							alert( 'Timeout' );
							break;
						case error.POSITION_UNAVAILABLE:
							alert( 'Position unavailable' );
							break;
						case error.PERMISSION_DENIED:
							alert( 'Permission denied' );
							break;
						case error.UNKNOWN_ERROR:
							alert( 'Unknown error' );
							break;
					}
				},
				{
					enableHighAccuracy: true
				});
			}
		}
	} );

	return UserPosition;
}() );
