
$(function() {

	"use strict";

	var map, userPosition, markerID,
		pages = {}, session, currentUser, users,
		currentPage, state, router;

	initialize();

	function initialize() {
		createCurrentUser();
		createSession();
		createUsers();
		createInviteCodeForm();
		createPages();
		createController();
		createUserPosition();

	}

	function createController() {
		var controller = TWTU.Controller( session, pages, currentUser );
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
			enterCode: enterCode,
			userInfo: userInfo,
			'default': defaultPage
		};


		$( '.page' ).each( function( index, element ) {
			var id = $( element ).attr( 'id' );
			var constr = constructors[ id ] || constructors[ 'default' ];

			var page = constr( element );

			pages[ id ] = page;
		} );

		function enterCode( target ) {
			var form = AFrame.DataForm.create( {
				target: '#enterCodeForm',
				dataSource: session
			} );

			var page = TWTU.FormPage.create({
				form: form,
				target: target
			});
			return page;
		}

		function userInfo( target ) {
			var form = AFrame.DataForm.create( {
				target: target,
				dataSource: currentUser
			} );

			var page = TWTU.FormPage.create({
				form: form,
				target: target
			});
			return page;
		}

		function defaultPage( target ) {
			var page = TWTU.Page.create( {
				target: target
			} );
			return page;
		}
	}

	function createUserPosition() {
		userPosition = AFrame.create( TWTU.UserPosition );
		userPosition.bindEvent( 'positionchange', createMapSetPosition );
		userPosition.getPosition();
	}

	function createMapSetPosition( event, position ) {
		updateCurrentUserCoords( position );

		if( !map ) {
			map = TWTU.Map.create( {
				target: $( '#map' ),
				position: position,
				plugins: [ [ TWTU.MapPluginBounds, {
					users: users
				} ]/*, TWTU.MapPluginUserInfoWindow*/ ]
			} );

			var markers = TWTU.UserMapMarkers.create( {
				users: users,
				map: map
			} );

			// do this after we have created the map/marker so the initial user
			//	gets inserted
			users.insert( currentUser );
		}
	}

	function updateCurrentUserCoords( position ) {
		currentUser.set( 'lat', position.latitude );
		currentUser.set( 'lon', position.longitude );

		session.update();
	}



} );

