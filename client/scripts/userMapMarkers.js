TWTU.UserMapMarkers = (function() {
	"use strict";

	var Markers = AFrame.AObject.extend( {
		importconfig: [ 'map', 'markers' ],
		events: {
			'onInsert markers': onMarkerAdd,
			'onRemove markers': onMarkerRemove
		},

		init: function( config ) {
			var me=this;
            me.markers = {};

			Markers.sc.init.call( me, config );
		}
	} );

    function addMarker( marker ) {
        var me=this,
            markerID = me.map.addMarker( marker.getDataObject() );
        marker.set( 'mapID', markerID );

        me.markers[ marker.getCID() ] = marker;
        marker.bindEvent( 'onSet', onMarkerChange, me );
    }

	function onMarkerAdd( event ) {
		var marker = event.item;
        addMarker.call( this, marker );
	}

	function onMarkerRemove( event ) {
		var marker = event.item, markerID = getMapIDForMarker.call( this, marker );
		if( markerID ) {
			this.map.removeMarker( markerID );
		}
	}

	function onMarkerChange( event ) {
		var me = this, 
            marker = event.target, 
            markerID = getMapIDForMarker.call( me, marker );

        me.map.moveMarker( markerID, marker.getDataObject() );
	}

	function getMapIDForMarker( marker ) {
		return marker.get( 'mapID' );
	}

	return Markers;
}() );
