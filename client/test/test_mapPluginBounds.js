(function() {
	"use strict";

	var plugin, map, users;

	var Map = AFrame.AObject.extend( {
		init: function( config ) {
			this.markers = [];

			Map.sc.init.call( this, config );
		},

		setCenter: function() {
			this.centered = true;
			this.centeredCount++;
		},

		setViewport: function() {
			this.fitted = true;
			this.fittedCount++;
		},

		reset: function() {
			this.centeredCount = this.fittedCount = 0;
			this.centered = this.fitted = false;
		}
	} );

	module( "TWTU.MapPluginBounds", {
		setup: function() {
			map = Map.create();
			map.reset();
			
			users = AFrame.CollectionArray.create( {
				plugins: [ [ AFrame.CollectionPluginModel, {
					schema: {
						lat: '',
						lon: ''
					}
				} ] ]
			} );

			plugin = TWTU.MapPluginBounds.create( {
				users: users,
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
		users.insert( {
			lat: 0,
			lon: 0
		} );

		users.triggerEvent( 'updatecomplete' );
		ok( map.centered, 'map is centered' );
	} );

	test( 'moveMarker with 2 or more users causes the viewport to be fitted', function() {
		users.insert( {
			lat: 0,
			lon: 0
		} );

		users.insert( {
			lat: 0,
			lon: 0
		} );

		users.triggerEvent( 'updatecomplete' );
		ok( map.fitted, 'bounds have been fitted' );
	} );

	test( 'removeMarker causes viewport to be centered', function() {
		users.insert( {
			lat: 0,
			lon: 0
		} );

		var cid = users.insert( {
			lat: 0,
			lon: 0
		} );
		map.reset();

		users.remove( cid );

		users.triggerEvent( 'updatecomplete' );
		ok( map.centered, 'map is centered' );
	} );

	test( 'updating a marker causes viewport to be updated', function() {
		users.insert( {
			lat: 0,
			lon: 0
		} );

		var cid = users.insert( {
			lat: 0,
			lon: 0
		} );

		map.reset();

		var user = users.get( cid );
		user.set( 'lat', 1 );

		users.triggerEvent( 'updatecomplete' );
		ok( map.fitted, 'bounds have been fitted' );
		ok( 1, map.fittedCount, 'setViewport was alled once' );
	} );



}() );
