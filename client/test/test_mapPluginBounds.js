(function() {
	"use strict";

	var plugin, map, markers;

	var Map = AFrame.AObject.extend( {
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

			markers = AFrame.CollectionArray.create( {
				plugins: [ [ AFrame.CollectionPluginModel, {
					schema: {
						latitude: '',
						longitude: ''
					}
				} ] ]
			} );

			plugin = TWTU.MapPluginBounds.create( {
				markers: markers,
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
		markers.insert( {
			latitude: 0,
			longitude: 0
		} );

		ok( map.centered, 'map is centered' );
	} );

	test( 'moveMarker with 2 or more markers causes the viewport to be fitted', function() {
		markers.insert( {
			latitude: 0,
			longitude: 0
		} );

		markers.insert( {
			latitude: 0,
			longitude: 0
		} );

		ok( map.fitted, 'bounds have been fitted' );
	} );

	test( 'removeMarker causes viewport to be centered', function() {
		markers.insert( {
			latitude: 0,
			longitude: 0
		} );

		var cid = markers.insert( {
			latitude: 0,
			longitude: 0
		} );
		map.reset();

		markers.remove( cid );

		ok( map.centered, 'map is centered' );
	} );

	test( 'updating a marker causes viewport to be updated', function() {
		markers.triggerEvent( 'updatestart' );

		markers.insert( {
			latitude: 0,
			longitude: 0
		} );

		var cid = markers.insert( {
			latitude: 0,
			longitude: 0
		} );

		map.reset();

		var user = markers.get( cid );
		user.set( 'latitude', 1 );
		user.set( 'longitude', 1 );

		markers.triggerEvent( 'updatecomplete' );
		ok( map.fitted, 'bounds have been fitted' );
		equal( 1, map.fittedCount, 'setViewport was called once' );
	} );

	test( 'multiple marker operations after session update cause one setViewport', function() {
		markers.triggerEvent( 'updatestart' );

		markers.insert( {
			latitude: 0,
			longitude: 0
		} );

		markers.insert( {
			latitude: 0,
			longitude: 0
		} );

		markers.insert( {
			latitude: 0,
			longitude: 0
		} );

		markers.triggerEvent( 'updatecomplete' );
		equal( 1, map.fittedCount, 'setViewport was called once' );
	} );

        test( 'viewportchange will keep bounds from updating', function() {
	    markers.insert( { latitude: 0, longitude: 0 } );

	    map.triggerEvent( 'viewportchange' );
            map.reset();

            // this has no update nor delete, so we assume only updates
	    markers.triggerEvent( 'updatecomplete' );
            equal( map.fittedCount, 0, 'setViewport not called after viewportchange' );
        } );

	test( 'when a user is added after bounds updated, update map', function() {
	    markers.insert( { latitude: 0, longitude: 0 } );
	    markers.triggerEvent( 'updatecomplete' );

	    map.reset();
	    
	    map.triggerEvent( 'viewportchange' );
	    map.triggerEvent( 'updatestart' );
	    markers.insert( { latitude: 0, longitude: 0 } );
	    markers.triggerEvent( 'updatecomplete' );

	    equal( map.fittedCount, 2, 'setViewport called again after user added' );
	} );

	test( 'adds fitToMarkers decorator', function() {
	    equal( typeof map.fitToMarkers, 'function', 'fitToMarkers added to map' );
	} );

    
    test( 'if onSet marker has type "destination", update immediately', function() {
        var id = markers.insert( {
            latitude: 0,
            longitude: 0,
            visible: true,
            type: 'destination'
        } );
        map.reset();

        var destination = markers.get( id );

        destination.set( 'latitude', 1 );
        ok( map.centered, 'the map has been centered from destination' );
    } );
}() );
