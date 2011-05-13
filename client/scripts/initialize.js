
(function() {

	"use strict";

	var map, userPosition = AFrame.create( TWTU.UserPosition ), markerID,
		pages = {}, session, currentUser = AFrame.create( TWTU.User );

//	currentUser.set( 'name', 'Shane' );

	function initialize() {
		attachButtons();
		createSession();
		createPages();
		showUserInfo();
		userPosition.getPosition( createMapSetPosition );
	}

	function showUserInfo() {
		var page = pages[ 'userInfo' ];
		page.show();
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
			enterCode: TWTU.JoinPage,
			userInfo: TWTU.UserInfoPage,
			'default': TWTU.Page
		};

		$( '.page' ).each( function( index, element ) {
			var id = $( element ).attr( 'id' );
			var constr = constructors[ id ] || constructors[ 'default' ];

			var page = AFrame.create( constr, {
				target: element,
				session: session,
				user: currentUser
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

