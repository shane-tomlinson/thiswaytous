
(function() {

	"use strict";

	var map, userPosition = AFrame.create( TWTU.UserPosition ), markerID,
		pages = {}, session, currentUser = AFrame.create( TWTU.User );

	currentUser.set( 'name', 'Shane' );

	function initialize() {
		attachButtons();
		createSession();
		createPages();
		userPosition.getPosition( createMapSetPosition );
	}

	function attachButtons() {
		$( '#main a.button' ).click( function( event ) {
			var target = $( event.currentTarget );
			var href = target.attr( 'href' ).replace( '#', '' );

			var page = href && pages[ href ];
			if( page ) {
				page.show();
			}
		} );
	}

	function createSession() {
		session = AFrame.create( TWTU.Session, {
			currentUser: currentUser
		} );
	}

	function createPages() {
		var constructors = {
			invite: TWTU.InvitePage,
			'default': TWTU.JoinPage
		};

		$( '.page' ).each( function( index, element ) {
			var id = $( element ).attr( 'id' );
			var constr = constructors[ id ] || constructors[ 'default' ];

			var page = AFrame.create( constr, {
				target: element,
				session: session
			} );

			pages[ id ] = page;
		} );
	}

	function createMapSetPosition( position ) {
		map = AFrame.create( TWTU.Map, {
			target: $( '#map' ),
			position: position
		} );

		var coords = position.coords;
		currentUser.set( 'lat', coords.latitude );
		currentUser.set( 'lon', coords.longitude );

		markerID = map.addMarker( 'Shane', position );
		startPositionUpdate();
	}

	function startPositionUpdate() {
		userPosition.intervalUpdate( function( position ) {
			var coords = position.coords;

			currentUser.set( 'lat', coords.latitude );
			currentUser.set( 'lon', coords.longitude );

			map.moveMarker( markerID, position );
		} );
	}

	initialize();
}() );

