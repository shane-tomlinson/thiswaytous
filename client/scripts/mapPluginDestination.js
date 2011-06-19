TWTU.MapPluginDestination = (function() {
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
        plugged.disableDrag();
        this.placeMarker = true;
    }

    function onMapClick( event, latLng ) {
        var me=this, plugged = me.getPlugged();
        if( me.placeMarker ) {
            me.destination.set( latLng );    
            plugged.enableDrag();
            me.placeMarker = false;
        }
    }

    return Plugin;
}());
