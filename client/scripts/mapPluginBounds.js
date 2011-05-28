TWTU.MapPluginBounds = (function() {
	"use strict";

	var maps = google.maps;

	var Plugin = AFrame.Plugin.extend( {
		events: {
			'onMarkerAdd plugged': onMarkerAdd
		}
	} );

	function onMarkerAdd() {
		var plugged = this.getPlugged(), markers = plugged.markers, count = markers.getCount();

		if( count >= 2 ) {
			var pos0 = markers.get( 0 ).getPosition(),
				pos1 = markers.get( 1 ).getPosition(),
				poses = getNESW( pos0, pos1 ),
				gLatLngBound = new maps.LatLngBounds( poses.sw, poses.ne );

			for( var index = 2, marker; index <= count, marker = markers.get( index ); ++index ) {
				gLatLngBound.extend( marker.getPosition() );
			}

			plugged.getMap().fitBounds( gLatLngBound );
		}

	}

	function getNESW( pos0, pos1 ) {
		var east, west, north, south;

		if( pos0.lng() > pos1.lng() ) {
			east = pos0;
			west = pos1;
		}
		else {
			east = pos1;
			west = pos0;
		}

		if( pos0.lat() > pos1.lat() ) {
			north = pos0;
			south = pos1;
		}
		else {
			north = pos1;
			south = pos0;
		}

		var ne = new maps.LatLng( north.lat(), east.lng() );
		var sw = new maps.LatLng( south.lat(), west.lng() );

		return { ne: ne, sw: sw };
	}

	return Plugin;
}() );
