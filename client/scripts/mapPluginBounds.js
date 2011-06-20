TWTU.MapPluginBounds = (function() {
        "use strict";

        var Plugin = AFrame.Plugin.extend( {
            importconfig: [ 'markers' ],
            events: {
                    'updatestart markers': onUpdateStart,
                    'updatecomplete markers': onUpdateComplete,
                    'onInsert markers': onInsertMarker,
                    'onRemove markers': updateBounds,
                    'viewportchange plugged': onViewportUpdate
            },
            init: function( config ) {
                Plugin.sc.init.call( this, config );

                var plugged = this.getPlugged();
                plugged.fitToMarkers = updateBounds.bind( this );

                $( '#resetmap' ).click( onResetMap.bind( this ) );
                
            }
        } );

        function onViewportUpdate() {
            var me=this;
            if( !me.selfUpdate ) {
                me.viewportUpdate = true;
                $( 'body' ).addClass( 'mapmoved' );
            }
        }

        function onUpdateStart() {
            this.bulkUpdate = true;
        }

        function onInsertMarker( event ) {
            this.viewportUpdate = false;
            
            var item = event.item;
            item.bindEvent( 'onSet', onItemChange, this );

            updateBounds.call( this );
        }

        function onUpdateComplete() {
            this.bulkUpdate = false;
            updateBounds.call( this );
        }

        function onResetMap( event ) {
            event.preventDefault();
            this.viewportUpdate = false;
            updateBounds.call( this );    
        }
        
        function onItemChange( event ) {
            if( 'destination' === event.target.get( 'type' ) ) {
                updateBounds.call( this );
            }
        }

        function updateBounds() {
            if( this.bulkUpdate || this.viewportUpdate ) {
                return;
            }

            $( 'body' ).removeClass( 'mapmoved' );

            var me=this, markers = me.markers;
            me.bounds = {};
            me.maxIndex = 0;

            markers.forEach( updateBoundsForMarker.bind( me ) );

            updateViewport.call( me );
        }

        function updateBoundsForMarker( marker, index ) {
            var me=this, bounds = me.bounds;
            if( index === 0 ) {
                setBounds( bounds, marker );
            }
            else {
                expandBounds( bounds, marker );
            }

            me.maxIndex = index;
        }

        function setBounds( bounds, marker ) {
            var lat = marker.get( 'latitude' ), lon = marker.get( 'longitude' );

            bounds.ne = {
                latitude: lat,
                longitude: lon
            };

            bounds.sw = {
                latitude: lat,
                longitude: lon
            };
        }

        function expandBounds( bounds, marker ) {
            var lat = marker.get( 'latitude' ), lon = marker.get( 'longitude' );

            if( lat > bounds.ne.latitude ) {
                bounds.ne.latitude = lat;
            }

            if( lat < bounds.sw.latitude ) {
                bounds.sw.latitude = lat;
            }

            if( lon > bounds.ne.longitude ) {
                bounds.ne.longitude = lon;
            }

            if( lon < bounds.sw.longitude ) {
                bounds.sw.longitude = lon;
            }

        }

        function updateViewport() {
            var me=this, bounds = me.bounds, plugged = me.getPlugged();
            me.selfUpdate = true;
            if( me.maxIndex === 0 ) {
                plugged.setCenter( bounds.ne );
            }
            else {
                plugged.setViewport( bounds );
            }
            me.selfUpdate = false;
        }

        return Plugin;
}() );
