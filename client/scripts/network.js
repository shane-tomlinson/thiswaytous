TWTU.Network = ( function() {
	"use strict";
	
	var Network = {
		ajax: function( config ) {
			return $.ajax( config );
		}
	};
	
	return Network;
}() );