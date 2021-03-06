define(["aframe-current-jquery"], function(AFrame) {
    "use strict";

    var Plugin = AFrame.Plugin.extend( {
        importconfig: [ 'destination' ],
        events: {
            'onInit plugged': onPluggedInit,
            'mapclick plugged': onMapClick
        }
    } );

    function onPluggedInit() {
        $( '#setdestination' ).click( onSetDestination.bind( this ) );
    }

    function onSetDestination( event ) {
        event.preventDefault();

        var plugged = this.getPlugged();
        this.placeMarker = true;
    }

    function onMapClick( event, latLng ) {
        var me=this, plugged = me.getPlugged();
        if( me.placeMarker ) {
            me.destination.set( latLng );
            me.destination.set( 'visible', true );
            me.destination.set( 'created_by_me', true );
            me.placeMarker = false;
        }
    }

    return Plugin;
});
