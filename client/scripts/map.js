TWTU.Map = ( function() {
	"use strict";

	var maps = google.maps;

	var Map = AFrame.Class( AFrame.Display, {
		init: function( config ) {
			Map.sc.init.call( this, config );

			this.markers = {};
			this.currMarkerID = 0;

			var options = {
				zoom: 15,
				center: toGLatLng( config.position ),
				mapTypeId: maps.MapTypeId.ROADMAP
			};
			this.map = new maps.Map( this.getDOMElement(), options );
		},

		/**
		* Add a marker to the map
		* @method addMarker
		* @param {string} name - Name to attach to marker
		* @param {coords} position - marker position
		* @return {id} id of marker - used to move/remove the marker.
		*/
		addMarker: function( name, position ) {
			var currPosition = toGLatLng( position );

			var marker = new google.maps.Marker( {
				position: currPosition,
				map: this.map,
				title: name
			} );

			return storeMarker.call( this, marker );
		},

		/**
		* Move a marker
		* @method moveMarker
		* @param {id} id - id of marker to move
		* @param {coords} position - updated position
		*/
		moveMarker: function( id, position ) {
			var marker = this.markers[ id ];
			if( marker ) {
				var currPosition = toGLatLng( position );
				marker.setPosition( currPosition );
			}
		}
	} );

	function toGLatLng( position ) {
		var gLatLng = new google.maps.LatLng( position.latitude, position.longitude );
		return gLatLng;
	}

	/**
	* Store a marker off
	* @method storeMarker
	* @param {GOverlay} marker
	* @return {id} id used to operate on marker later
	* @private
	*/
	function storeMarker( marker ) {
		var id = this.currMarkerID;
		this.currMarkerID++;

		this.markers[ id ] = marker;
		return id;
	}

	return Map;
}() );
