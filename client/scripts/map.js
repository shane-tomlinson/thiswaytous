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
		addMarker: function( markerInfo ) {
			var marker = new maps.Marker( {
				position: toGLatLng( markerInfo ),
				map: this.map,
				title: markerInfo.name
			} );

			var id = storeMarker.call( this, marker );
			this.triggerEvent( 'markeradd', toPublicMarker( marker ) );

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
				this.triggerEvent( 'markermove', toPublicMarker( marker ) );
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
				this.triggerEvent( 'markerremove', toPublicMarker( marker ) );
			}
		},

		/**
		* Iterate through each marker, the callback will be called
		* with an object with two fields, latitude and longitude, as well
		* as an index.
		* @method forEachMarker
		* @param {function} callback - callback to call
		* @param {object} context (optional) - context to call callback in.
		*/
		forEachMarker: function( callback, context ) {
			this.markers.forEach( function( marker, index ) {
				var position = marker.getPosition();
				callback.call( context, toPublicMarker( marker ), index );
			}, context );
		},

		/**
		* Set the center of the map
		* @method setCenter
		* @param {location} position - center of map
		*/
		setCenter: function( position ) {
			var gLatLng = toGLatLng( position );
			this.map.panTo( gLatLng );
		},

		/**
		* Set the map's viewport
		* @method setViewport
		* @param {object} viewport - an object with ne and sw
		*/
		setViewport: function( viewport ) {
			var bounds = new maps.LatLngBounds( viewport.sw, viewport.ne );
			this.map.panToBounds( bounds );
		}
	} );

	function toGLatLng( position ) {
		var gLatLng = new maps.LatLng( position.latitude, position.longitude );
		return gLatLng;
	}

	function toPublicMarker( gMarker ) {
		var pos = gMarker.getPosition();

		return {
			name: gMarker.getTitle(),
			latitude: pos.lat(),
			longitude: pos.lng()
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
