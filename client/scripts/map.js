TWTU.Map = ( function() {
	"use strict";

	var maps = google.maps, event=maps.event;

	var Map = AFrame.Display.extend( {
		init: function( config ) {
			var me=this;
			Map.sc.init.call( me, config );

			me.markers = AFrame.CollectionArray.create();
			me.currMarkerID = 0;

			var options = {
				zoom: 15,
				center: toGLatLng( config.position ),
				mapTypeId: maps.MapTypeId.ROADMAP,
				maxZoom: 18
			};
			var map = me.map = new maps.Map( me.getDOMElement(), options );
			event.addListener( map, 'dragend', triggerViewportChange.bind( me ) );
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

		/**
		* Set the center of the map
		* @method setCenter
		* @param {location} position - center of map
		*/
		setCenter: function( position ) {
			var gLatLng = toGLatLng( position );
			this.map.panTo( gLatLng );
			triggerViewportChange.call( this );
		},

		/**
		* Set the map's viewport
		* @method setViewport
		* @param {object} viewport - an object with ne and sw
		*/
		setViewport: function( viewport ) {
			var bounds = new maps.LatLngBounds( toGLatLng( viewport.sw ), toGLatLng( viewport.ne ) );
			this.map.fitBounds( bounds );
			triggerViewportChange.call( this );
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

	function triggerViewportChange() {
		this.triggerEvent( 'viewportchange' );
	}

	return Map;
}() );
