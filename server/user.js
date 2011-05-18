( function() {
	"use strict";

	var AFrame = require( './aframe-current-node' );

	var schema = {
		id: 'string',
		name: 'string',
		lat: 'number',
		lon: 'number'
	};

	var User = AFrame.Class( AFrame.Model, {
		schema: schema
	} );

	module.exports = User;

}() );
