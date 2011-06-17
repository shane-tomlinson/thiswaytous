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

		ok( map.centered, 'map is centered' );
	} );

	test( 'updating a marker causes viewport to be updated', function() {
		users.triggerEvent( 'updatestart' );

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
		user.set( 'lon', 1 );

		users.triggerEvent( 'updatecomplete' );
		ok( map.fitted, 'bounds have been fitted' );
		equal( 1, map.fittedCount, 'setViewport was called once' );
	} );

	test( 'multiple marker operations after session update cause one setViewport', function() {
		users.triggerEvent( 'updatestart' );

		users.insert( {
			lat: 0,
			lon: 0
		} );

		users.insert( {
			lat: 0,
			lon: 0
		} );

		users.insert( {
			lat: 0,
			lon: 0
		} );

		users.triggerEvent( 'updatecomplete' );
		equal( 1, map.fittedCount, 'setViewport was called once' );
	} );

        test( 'viewportchange will keep bounds from updating', function() {
	    users.insert( { lat: 0, lon: 0 } );

	    map.triggerEvent( 'viewportchange' );
            map.reset();

            // this has no update nor delete, so we assume only updates
	    users.triggerEvent( 'updatecomplete' );
            equal( map.fittedCount, 0, 'setViewport not called after viewportchange' );
        } );

	test( 'when a user is added after bounds updated, update map', function() {
	    users.insert( { lat: 0, lon: 0 } );
	    users.triggerEvent( 'updatecomplete' );

	    map.reset();
	    
	    map.triggerEvent( 'viewportchange' );
	    map.triggerEvent( 'updatestart' );
	    users.insert( { lat: 0, lon: 0 } );
	    users.triggerEvent( 'updatecomplete' );

	    equal( map.fittedCount, 1, 'setViewport called again after user added' );
	} );

	test( 'adds fitToUsers decorator', function() {
	    equal( typeof map.fitToUsers, 'function', 'fitToUsers added to map' );
	} );


}() );
