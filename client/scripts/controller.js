TWTU.Controller = function( session, pages, currentUser ) {
	"use strict";

	var currentPage;

	var router = TWTU.Router.create( {
			routes: {
				get: {
					'/page/invite': handleInvite,
					'/page/:id': handlePage,
					'/route/:id': handleRoute,
					'/': handleRoot
				},
				post: {
					'/user': handleUser,
					'/session/join': handleJoinSession,
					'/session/:id': handleSessionInvite
				}
			}
		} );

	function handleInvite() {
		if( session.isInSession() ) {
			router.redirect( '/page/alreadyInSession' );
		}
		else {
			router.redirect( '/session/new' );
		}
	}

	function handleSessionInvite( params ) {
		showInvitePage( params.id === 'new' );
	}

	function showInvitePage( newSession ) {
		if( newSession ) {
			session.start();
		}

		displayPage( 'invite' );
	} 

	function handleUser() {
		router.redirect( '/' );
	}

	function handleJoinSession( params ) {
		var code = session.get( 'invite_code_1' ) + '-' + session.get( 'invite_code_2' ) + '-' + session.get( 'invite_code_3' );
		router.redirect( '/route/' + code );
	}

	function handlePage( params ) {
		displayPage( params.id );
	}

	function handleRoot() {
		hideCurrentPage();
		
		if( !currentUser.hasData() ) {
			router.pushState( '/page/userInfo' );
		}
	}

	function handleRoute( params ) {
		handleRoot();
		
		var code = params.id && params.id.split( '-' );
		if( code && code.length == 3 ) {
			session.set( 'invite_code_1', code[0] );
			session.set( 'invite_code_2', code[1] );
			session.set( 'invite_code_3', code[2] );
			session.join();
		}
	}

	function displayPage( pageName ) {
		hideCurrentPage();
		var page = pageName && pages[ pageName ];
		if( page ) {
			page.show();
			currentPage = page;
		}
	}

	function hideCurrentPage() {
		if( currentPage ) {
			currentPage.hide();
			currentPage = null;
		}
	}
};