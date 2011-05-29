TWTU.MapPluginBounds = (function() {
	"use strict";

	var maps = google.maps;

	var Plugin = AFrame.Plugin.extend( {
		events: {
			'markeradd plugged': onMarkerAdd
		}
	} );

	function onMarkerAdd() {
		var plugged = this.getPlugged(), bounds = {}, maxIndex;

		plugged.forEachMarker( function( marker, index ) {
			if( index === 0 ) {
				setBounds( bounds, marker );
			}
			else {
				expandBounds( bounds, marker );
			}

			maxIndex = index;

			if( maxIndex === 0 ) {
				plugged.setCenter( bounds.ne );
			}
			else {
				plugged.setViewport( bounds );
			}
		} );
	}

	function setBounds( bounds, marker ) {
		bounds.ne = {
			latitude: marker.latitude,
			longitude: marker.longitude
		};

		bounds.sw = {
			latitude: marker.latitude,
			longitude: marker.longitude
		};
	}

	function expandBounds( bounds, marker ) {
		if( marker.latitude > bounds.ne.latitude ) {
			bounds.ne.latitude = marker.latitude;
		}

		if( marker.latitude < bounds.sw.latitude ) {
			bounds.sw.latitude = marker.latitude;
		}

		if( marker.longitude > bounds.ne.longitude ) {
			marker.ne.longitude = marker.longitude;
		}

		if( marker.longitude < bounds.sw.longitude ) {
			marker.sw.longitude = marker.longitude;
		}

	}

	return Plugin;
}() );
