TWTU.UserMapMarkers = (function() {
	"use strict";

	var Markers = AFrame.AObject.extend( {
		importconfig: [ 'map', 'users', 'destination' ],
		events: {
			'onInsert users': onUserAdd,
			'onRemove users': onUserRemove
		},

		init: function( config ) {
			var me=this;
            me.markers = {};

			Markers.sc.init.call( me, config );

            var destination = me.destination;
            destination.set( 'icon', 'http://maps.google.com/mapfiles/arrow.png' );
            destination.set( 'shadow', 'http://maps.google.com/mapfiles/arrowshadow.png' );
            destination.bindEvent( 'onSet', onMarkerChange, me );
		}
	} );

    function addMarker( marker ) {
        var me=this;
        attemptAddMarkerToMap.call( me, marker );

        me.markers[ marker.getCID() ] = marker;
        marker.bindEvent( 'onSet', onMarkerChange, me );
    }

    function attemptAddMarkerToMap( marker ) {
        var me=this;

        if( AFrame.defined( marker.get( 'latitude' ) ) ) {
			var markerID = this.map.addMarker( marker.getDataObject() );
            marker.set( 'mapID', markerID );
        }
    }

	function onUserAdd( event ) {
		var user = event.item;
        addMarker.call( this, user );
	}

	function onUserRemove( event ) {
		var user = event.item, markerID = getMarkerIDForUser.call( this, user );
		if( markerID ) {
			this.map.removeMarker( markerID );
		}
	}

	function onMarkerChange( event ) {
        if( event.fieldName === 'markerID' ) {
            return;
        }

		var me = this, 
            user = event.target, 
            markerID = getMarkerIDForUser.call( me, user );

		if( AFrame.defined( markerID ) ) {
			me.map.moveMarker( markerID, user.getDataObject() );
		} else {
            attemptAddMarkerToMap.call( me, user );        
        }
	}

	function getMarkerIDForUser( user ) {
		return user.get( 'mapID' );
	}

	return Markers;
}() );
