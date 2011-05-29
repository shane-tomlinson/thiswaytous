(function() {
	"use strict";

	var plugin, map;

	var Map = AFrame.AObject.extend( {
		init: function( config ) {
			this.markers = [];

			Map.sc.init.call( this, config );
		},

		addMarker: function( marker ) {
			this.markers.push( marker );

			this.triggerEvent( 'markeradd', marker );
		},

		forEachMarker: function( callback, context ) {
			this.markers.forEach( callback, context );
		},

		setCenter: function() {
			this.centered = true;
		},

		setViewport: function() {
			this.fitted = true;
		}
	} );

	module( "TWTU.MapPluginBounds", {
		setup: function() {
			map = Map.create();
			plugin = TWTU.MapPluginBounds.create( {
				plugged: map
			} );
		},
		teardown: function() {
			map.teardown();
			map = null;

			plugin.teardown();
			plugin = null;
		}
	} );


	test( 'adding one marker causes a setCenter', function() {
		map.addMarker( {
			latitude: 0,
			longitude: 0
		} );

		ok( map.centered, 'map is centered' );
	} );

	test( 'moveMarker with 2 or more users causes the viewport to be fitted', function() {
		map.addMarker( {
			latitude: 0,
			longitude: 0
		} );

		map.addMarker( {
			latitude: 0,
			longitude: 0
		} );

		ok( map.fitted, 'bounds have been fitted' );
	} );



}() );
