TWTU.Markers = (function() {
    "use strict";

    var Markers = AFrame.CollectionArray.extend( {
        importconfig: [ 'users', 'destination' ],
        events: {
            'onInsert users': onUserInsert,
            'onRemove users': onUserRemove
        },

        init: function( config ) {
            var me=this;
            Markers.sc.init.call( me, config );

            this.insert( me.destination );
        },

        insert: function( item ) {
            if( item.get( 'visible' ) ) {
                Markers.sc.insert.call( this, item );
            }
            item.bindEvent( 'onSet-visible', onVisibilityChange.bind( this ) );
        }
    } );

    function onUserInsert( event ) {
        this.insert( event.item );
    }

    function onUserRemove( event ) {
        this.remove( event.item.getCID() );
    }

    function onVisibilityChange( event ) {
        var me = this, item = event.target;

        if( item.get( 'visible' ) ) {
            if( !me.get( item.getCID() ) ) {
                Markers.sc.insert.call( me, item );
            }
        }
        else {
            Markers.sc.remove.call( me, item.getCID() );
        }
    }
    
    return Markers;
}() );
