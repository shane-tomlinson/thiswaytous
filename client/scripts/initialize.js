
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
		createInviteCodeForm();
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
		currentUser = TWTU.CurrentUser.create();
	}

	function createSession() {
		session = TWTU.Session.create( {
			currentUser: currentUser
		} );
	}

	function createUsers() {
		users = TWTU.Users.create( {
			session: session
		} );
	}

	function createInviteCodeForm() {
		var form = AFrame.DataForm.create( {
			target: '#invitecode',
			dataSource: session
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

			var page = constr.create( {
				target: element,
				session: session,
				user: currentUser
			} );

			pages[ id ] = page;
		} );
	}

	function createMapSetPosition( position ) {
		map = TWTU.Map.create( {
			target: $( '#map' ),
			position: position.coords
		} );

		var markers = TWTU.UserMapMarkers.create( {
			users: users,
			map: map
		} );

		updateCurrentUserCoords( position );

		// do this after we have created the map/marker so the initial user
		//	gets inserted
		users.insert( currentUser );
		startPositionUpdate();
	}

	function startPositionUpdate() {
		userPosition.intervalUpdate( updateCurrentUserCoords );
	}

	function updateCurrentUserCoords( position ) {
		var coords = position.coords;

		currentUser.set( 'lat', coords.latitude );
		currentUser.set( 'lon', coords.longitude );

		session.update();
	}

	function showUserInfo() {
		if( !currentUser.hasData() ) {
			var page = pages[ 'userInfo' ];
			page.show();
		}
	}

}() );

