TWTU.UserPosition = (function() {
	var UserPosition = AFrame.Class( AFrame.AObject, {
		intervalUpdate: function( success ) {
			this.getPosition( success );
			setInterval( this.getPosition.bind( this, success ), 10000 );
		},
		
		getPosition: function( success ) {
			var geo = navigator.geolocation;
			if( geo ) {
				geo.getCurrentPosition( success,
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
				} );
			}			
		}
	} );
	
	return UserPosition;
}() );