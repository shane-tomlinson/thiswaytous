(function() {
	var positionChanged = false;

	google = {
		maps: {
			Map: function() {},
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
			MapTypeId: {
				ROADMAP: 0
			},

			isPositionChanged: function() {
				return positionChanged;
			},

			clearChanges: function() {
				positionChanged = false;
			}
		}
	};

}() );
