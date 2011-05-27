google = (function() {
	"use strict";

	var positionChanged = false, fitBoundsCalled = false;

	var google = {
		maps: {
			Map: function() {
				this.fitBounds = function() {
					fitBoundsCalled = true;
				};
			},
			Marker: function( config ) {
				var currentPosition = config.position;
				positionChanged = true;

				this.setPosition = function( position ) {
					if( position.latitude != currentPosition.latitude ||
						position.longitude != currentPosition.longitude ) {
						positionChanged = true;
						currentPosition = position;
					}
				};
			},
			LatLng: function() {},
			LatLngBounds: function() {
				this.extend = function() {};
			},
			MapTypeId: {
				ROADMAP: 0
			},

			isPositionChanged: function() {
				return positionChanged;
			},

			areBoundsFitted: function() {
				return fitBoundsCalled;
			},

			clearChanges: function() {
				positionChanged = false;
				fitBoundsCalled = false;
			}
		}
	};
	return google;
}() );
