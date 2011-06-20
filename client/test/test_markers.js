(function() {
    "use strict";

    var markers, users, destination, user;

    module( 'TWTU.Markers', {
        setup: function() {
            Events.reset();

            users = AFrame.CollectionArray.create();
            destination = AFrame.DataContainer.create( {
                data: {
                    visible: true
                }
            } );

            markers = TWTU.Markers.create( {
                users: users,
                destination: destination
            } );

            user = AFrame.DataContainer.create( {
                data: {
                    name: 'Shane',
                    latitude: 0,
                    longitude: 0,
                    visible: true
                }
            } );
        },

        teardown: function() {
            markers.teardown();
            markers = null;

            users.teardown();
            users = null;

            destination.teardown();
            destination = null;
        }

    } );

    test( 'Markers is created', function() {
        ok( markers instanceof TWTU.Markers, 'markers created' );
    } );

    test( 'when adding a user to users, onInsert is called for markers', function() {
        markers.bindEvent( 'onInsert', Events.eventHandler );
        users.insert( user );

        ok( Events.isTriggered( 'onInsert' ), 'insert triggered' );
    } );

    test( 'when removing an added user, onRemove is called for markers', function() {
        markers.bindEvent( 'onRemove', Events.eventHandler );
        users.insert( user );
        users.remove( user.getCID() );
        ok( Events.isTriggered( 'onRemove' ), 'onRemove triggered' );
    } );

    test( 'destination is in the list automatically, if "visible"' +
            ' is set to true', function() {
        var listDestination = markers.get( destination.getCID() );

        ok( listDestination, 'destination added to list' );
    } );

    test( 'destination is removed from list if "visible" set to false', function() {
        markers.bindEvent( 'onRemove', Events.eventHandler );

        destination.set( 'visible', false );

        ok( Events.isTriggered( 'onRemove' ), 'destination removed' +
            ' whenever visible set to false' );
    } );

    test( 'user is removed/added from list depending on "visible"', function() {
        markers.bindEvent( 'onRemove', Events.eventHandler );
        markers.bindEvent( 'onInsert', Events.eventHandler );

        users.insert( user );

        user.set( 'visible', false );

        ok( Events.isTriggered( 'onRemove' ), 'user is removed whenever ' +
            'visible is set to false' );

        Events.reset();

        user.set( 'visible', true );

        ok( Events.isTriggered( 'onInsert' ), 'user is inserted whenever ' +
            'visible is set to true' );
    } );

    test( 'if item already added to markers, then visibility set to true,' +
            'no re-add.', function() {
        markers.insert( user );         
        var failed = false;
        try {
            user.set( 'visible', true );
        } catch( e ) {
            failed = true;
        }

        equal( failed, false, 'no re-add attempted' );

    } );
            
}() );
