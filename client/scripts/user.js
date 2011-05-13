TWTU.User = ( function() {
	"use strict";
	
	var schema = {
		name: 'string',
		lat: 'number',
		lon: 'number'
	};
	
	var User = AFrame.Class( AFrame.Model, {
		schema: schema
	} );
	
	return User;
}() );