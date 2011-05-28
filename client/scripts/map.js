TWTU.Map = ( function() {
	"use strict";

	var maps = google.maps;

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
			var marker = new google.maps.Marker( {
				position: toGLatLng( position ),
				map: this.map,
				title: name
			} );

			var id = storeMarker.call( this, marker );
			updateMapBounds.call( this );

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
		}
	} );

	function toGLatLng( position ) {
		var gLatLng = new google.maps.LatLng( position.latitude, position.longitude );
		return gLatLng;
	}

	function updateMapBounds() {
		var markers = this.markers, count = markers.getCount();

		if( count >= 2 ) {
			var pos0 = markers.get( 0 ).getPosition(),
				pos1 = markers.get( 1 ).getPosition(),
				poses = getNESW( pos0, pos1 ),
				gLatLngBound = new google.maps.LatLngBounds( poses.sw, poses.ne );

			for( var index = 2, marker; index <= count, marker = markers.get( index ); ++index ) {
				gLatLngBound.extend( marker.getPosition() );
			}

			this.map.fitBounds( gLatLngBound );
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

			var ne = new google.maps.LatLng( north.lat(), east.lng() );
			var sw = new google.maps.LatLng( south.lat(), west.lng() );

			return { ne: ne, sw: sw };
		}
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
