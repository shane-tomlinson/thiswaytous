(function() {
    "use strict";

    var destination, map, plugin

    module( 'TWTU.MapPluginDestination', {
        setup: function() {
            $( '<a href="#" id="setdestination">Button</a>' ).appendTo( $( 'body' ) );
            destination = AFrame.DataContainer.create();
            
            map = new AFrame.AObject();
            
            plugin = TWTU.MapPluginDestination.create( {
                destination: destination,
                plugged: map
            } );

            map.init( {} );
        },

        teardown: function() {
            destination.teardown();
            destination = null;

            $( '#setdestination' ).remove();
        }

    } );

    test( 'Can create', function() {
        ok( plugin instanceof TWTU.MapPluginDestination, 'created' );
    } );

    test( 'clicking setdestination then click on the map, the destination' +
            ' location is set', function() {
        $( '#setdestination' ).click();

        map.triggerEvent( 'mapclick', { latitude: 0, longitude: 0 } );
        ok( destination.get( 'visible' ), 'destination is now visible' );

        map.triggerEvent( 'mapclick', { latitude: 1, longitude: 1 } );
        equal( destination.get( 'latitude' ), 0, 'after first click, next click' + 
            ' does not update marker' );
        equal( destination.get( 'longitude' ), 0, 'after first click, next click' + 
            ' does not update marker' );
    } );
}() );
