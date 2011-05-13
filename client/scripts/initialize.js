
(function() {

	"use strict";

	var map, userPosition = AFrame.create( TWTU.UserPosition ), markerID,
		pages = {}, session, currentUser, users;

	initialize();

	function initialize() {
		attachButtons();
		createCurrentUser();
		createSession();
		createUsers();
		createPages();
		showUserInfo();
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

	function createCurrentUser() {
		currentUser = AFrame.create( TWTU.CurrentUser );
	}

	function createSession() {
		session = AFrame.create( TWTU.Session, {
			currentUser: currentUser
		} );
	}

	function createUsers() {
		users = AFrame.create( TWTU.Users, {
			session: session,
			plugins: [ [ AFrame.CollectionPluginModel, {
				schema: TWTU.User.schema
			} ] ]
		} );

		users.insert( currentUser );
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

		updateCurrentUserCoords( position );

		markerID = map.addMarker( currentUser.get( 'name' ), position );
		startPositionUpdate();
	}

	function startPositionUpdate() {
		userPosition.intervalUpdate( function( position ) {
			updateCurrentUserCoords( position );

			map.moveMarker( markerID, position );
		} );
	}

	function updateCurrentUserCoords( position ) {
		var coords = position.coords;

		currentUser.set( 'lat', coords.latitude );
		currentUser.set( 'lon', coords.longitude );
	}

	function showUserInfo() {
		if( !currentUser.hasData() ) {
			var page = pages[ 'userInfo' ];
			page.show();
		}
	}

}() );

