TWTU.Map = ( function() {
	"use strict";

	var maps = google.maps, event=maps.event;

	var Map = AFrame.Display.extend( {
		init: function( config ) {
			Map.sc.init.call( this, config );

			this.markers = AFrame.CollectionArray.create();

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
			var marker = new maps.Marker( {
				position: toGLatLng( position ),
				map: this.map,
				title: name
			} );

			var id = storeMarker.call( this, marker );

			this.triggerEvent( 'onMarkerAdd', name, marker );

			return id;
		},

		/**
		* Move a marker
		* @method moveMarker
		* @param {id} id - id of marker to move
		* @param {coords} position - updated position
		*/
		moveMarker: function( id, position ) {
			var marker = this.markers.get( id );
			if( marker ) {
				var currPosition = toGLatLng( position );
				marker.setPosition( currPosition );

				updateMapBounds.call( this );
			}
		},

		/**
		* Remove a marker
		* @method removeMarker
		* @param {id} id - id of the marker to remove
		*/
		removeMarker: function( id ) {
			var marker = this.markers.get( id );
			if( marker ) {
				marker.setMap( null );
			}
		},

		getMap: function() {
			return this.map;
		}
	} );

	function toGLatLng( position ) {
		var gLatLng = new maps.LatLng( position.latitude, position.longitude );
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

		this.markers.insert( marker, id );
		return id;
	}

	return Map;
}() );
