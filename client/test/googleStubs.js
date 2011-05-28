google = (function() {
	"use strict";

	var positionChanged = false, fitBoundsCalled = false, markerRemoved = false;

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

				this.setMap = function( map ) {
					if( map === null ) {
						markerRemoved = true;
					}
				}

				this.getPosition = function() {
					return new function() {
						this.lat = function() {
							return 0;
						}
						this.lng = function() {
							return 0;
						}
					};
				}
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

			isMarkerRemoved: function() {
				return markerRemoved;
			},

			clearChanges: function() {
				positionChanged = false;
				fitBoundsCalled = false;
				markerRemoved = false;
			}
		}
	};
	return google;
}() );
