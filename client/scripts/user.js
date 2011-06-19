TWTU.User = ( function() {
	"use strict";

	var schema = {
		id: 'id',
		name: 'string',
		latitude: 'number',
		longitude: 'number'
	};

	var User = AFrame.Model.extend( {
		schema: schema
	} );

	return User;
}() );
