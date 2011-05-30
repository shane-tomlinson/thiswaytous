TWTU.UserPosition = (function() {
	"use strict";
	var key = 'position';

	var UserPosition = AFrame.AObject.extend( {
		getPosition: function() {
			var me=this;
			startWatch.call( me );
			loadCache.call( me );
		},

		clearCache: function() {
			localStorage.removeItem( key );
		}
	} );

	function startWatch() {
		var geo = navigator.geolocation, me=this;
		if( geo ) {
			geo.watchPosition( success.bind( me ), failure.bind( me ),
			{
				enableHighAccuracy: true
			} );
		}
	}

	function loadCache() {
		var cache = localStorage.getItem( key );
		if( cache ) {
			var results = JSON.parse( cache );
			if( AFrame.defined( results.latitude ) ) {
				success.call( this, results );
			}
		}
	}

	function success( results ) {
		var coords = results.coords || results;
		this.triggerEvent( 'positionchange', coords );

		var cache = {
			latitude: coords.latitude,
			longitude: coords.longitude
		};
		localStorage.setItem( key, JSON.stringify( cache ) );
	}

	function failure( results ) {
		this.triggerEvent( 'positionerror', results );
	}



	return UserPosition;
}() );
