TWTU.MapPluginBounds = (function() {
	"use strict";

	var maps = google.maps;

	var Plugin = AFrame.Plugin.extend( {
		importconfig: [ 'users' ],
		events: {
			'updatecomplete users': updateBounds
		}
	} );

	function updateBounds() {
		var plugged = this.getPlugged(), users = this.users, bounds = {}, maxIndex;

		users.forEach( function( marker, index ) {
			if( index === 0 ) {
				setBounds( bounds, marker );
			}
			else {
				expandBounds( bounds, marker );
			}

			maxIndex = index;
		} );

		if( maxIndex === 0 ) {
			plugged.setCenter( bounds.ne );
		}
		else {
			plugged.setViewport( bounds );
		}
	}

	function setBounds( bounds, marker ) {
		var lat = marker.get( 'lat' ), lon = marker.get( 'lon' );

		bounds.ne = {
			latitude: lat,
			longitude: lon
		};

		bounds.sw = {
			latitude: lat,
			longitude: lon
		};
	}

	function expandBounds( bounds, marker ) {
		var lat = marker.get( 'lat' ), lon = marker.get( 'lon' );

		if( lat > bounds.ne.latitude ) {
			bounds.ne.latitude = lat;
		}

		if( lat < bounds.sw.latitude ) {
			bounds.sw.latitude = lat;
		}

		if( lon > bounds.ne.longitude ) {
			bounds.ne.longitude = lon;
		}

		if( lon < bounds.sw.longitude ) {
			bounds.sw.longitude = lon;
		}

	}

	return Plugin;
}() );
