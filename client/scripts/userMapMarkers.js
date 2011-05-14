TWTU.UserMapMarkers = (function() {
	"use strict";

	var Markers = AFrame.Class( AFrame.AObject, {
		importconfig: [ 'map', 'users' ],
		events: {
			'onInsert users': onUserAdd,
			'onRemove users': onUserRemove
		}
	} );

	function onUserAdd( event, user ) {

	}

	function onUserRemove( event, user ) {

	}

	return Markers;
}() );
