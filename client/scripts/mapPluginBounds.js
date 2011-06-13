TWTU.MapPluginBounds = (function() {
	"use strict";

	var maps = google.maps;

	var Plugin = AFrame.Plugin.extend( {
		importconfig: [ 'users' ],
		events: {
			'updatestart users': onUpdateStart,
			'updatecomplete users': onUpdateComplete,
			'onInsert users': updateBounds,
			'onRemove users': updateBounds
		}
	} );

	function onUpdateStart() {
		this.bulkUpdate = true;
	}

	function onUpdateComplete() {
		this.bulkUpdate = false;
		updateBounds.call( this );
	}

	function updateBounds() {
		if( this.bulkUpdate ) {
			return;
		}

		var me=this, users = me.users;
		me.bounds = {};
		me.maxIndex = 0;

		users.forEach( updateBoundsForUser.bind( me ) );

		updateViewport.call( me );
	}

	function updateBoundsForUser( marker, index ) {
		var me=this, bounds = me.bounds;
		if( index === 0 ) {
			setBounds( bounds, marker );
		}
		else {
			expandBounds( bounds, marker );
		}

		me.maxIndex = index;
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

	function updateViewport() {
		var me=this, bounds = me.bounds, plugged = me.getPlugged();
		if( me.maxIndex === 0 ) {
			plugged.setCenter( bounds.ne );
		}
		else {
			plugged.setViewport( bounds );
		}
	}

	return Plugin;
}() );
