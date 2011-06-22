( function() {
	"use strict";

	var AFrame = require( './aframe-current-node' );

	var schema = {
        id: { type: 'string' },
		name: { type: 'string' },
		latitude: { type: 'number' },
		longitude: { type: 'number' },
        visible: { type: 'boolean' },
        type: { type: 'string' }
	};

	var User = AFrame.Class( AFrame.Model, {
		schema: schema
	} );

	module.exports = User;

}() );
