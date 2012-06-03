define(["jquery"], function($) {
	"use strict";

	var Network = {
		ajax: function( config ) {
			var success = config.success;
			config.success = function( resp ) {
				setTimeout( function() {
					if( success ) {
						success( resp );
					}
				}, 0 );
			}
			return $.ajax( config );
		}
	};

	return Network;
});
