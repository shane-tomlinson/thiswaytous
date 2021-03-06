google = (function() {
	"use strict";

	var positionChanged = false,
		fitBoundsCalled = false,
		markerRemoved = false,
		panToCalled = false,
		panToBoundsCalled = false,
        callbacks = {};

	var google = {
		maps: {
			Map: function() {
				this.fitBounds = function() {
					fitBoundsCalled = true;
				};

				this.panTo = function() {
					panToCalled = true;
				};

				this.panToBounds = function() {
					panToBoundsCalled = true;
				};
			},

			Marker: function( config ) {
				var currentPosition = config.position;
				positionChanged = true;

				this.setPosition = function( position ) {
					if( position.latitude !== currentPosition.latitude ||
						position.longitude !== currentPosition.longitude ) {
						positionChanged = true;
						currentPosition = position;
					}
				};

				this.setMap = function( map ) {
					if( map === null ) {
						markerRemoved = true;
					}
				};

				this.getPosition = function() {
					return new(function() {
						this.lat = function() {
							return 0;
						};
						this.lng = function() {
							return 0;
						};
					});
				};

				this.getTitle = function() {
					return '';
				};
			},

            event: {
				addListener: function( map, event, callback ) {
					callbacks[ event ] = callback;
				},

				triggerEvent: function( event ) {
                    callbacks[ event ] && callbacks[ event ]();
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

			isCentered: function() {
				return panToCalled;
			},

			isViewPortSet: function() {
				return panToBoundsCalled || fitBoundsCalled;
			},

			clearChanges: function() {
				positionChanged =
				fitBoundsCalled =
				markerRemoved =
				panToCalled =
				panToBoundsCalled = false;
                callbacks = {};
			}
		}
	};
	return google;
}() );
