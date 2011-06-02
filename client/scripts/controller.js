TWTU.Controller = function( session, pages, currentUser ) {
	"use strict";

	var currentPage;

	var router = TWTU.Router.create( {
			routes: {
				get: {
					'/invite': showInvite,
					'/enterCode': showPage.bind( null, 'enterCode' ),
					'/route/:id': showRoute,
					'/userInfo': showPage.bind( null, 'userInfo' ),
					'/': showRoot
				},
				post: {
					'/setName': setName,
					'/join': joinRoute
				}
			},
			defaultRoute: '/'
		} );

	function showInvite() {
		session.start();
		showPage( 'invite' );
	}

	function setName() {
		router.redirect( '/' );
	}

	function joinRoute( params ) {
		var code = session.get( 'invite_code_1' ) + '-' + session.get( 'invite_code_2' ) + '-' + session.get( 'invite_code_3' );
		router.redirect( '/route/' + code );
	}

	function showPage( pageName ) {
		hideCurrentPage();
		var page = pageName && pages[ pageName ];
		if( page ) {
			page.show();
			currentPage = page;
		}
	}

	function showRoot() {
		hideCurrentPage();
		
		if( !currentUser.hasData() ) {
			router.pushState( '/userInfo' );
		}
	}

	function showRoute( params ) {
		showRoot();
		
		var code = params.id && params.id.split( '-' );
		if( code && code.length == 3 ) {
			session.set( 'invite_code_1', code[0] );
			session.set( 'invite_code_2', code[1] );
			session.set( 'invite_code_3', code[2] );
			session.join();
		}
	}

	function hideCurrentPage() {
		if( currentPage ) {
			currentPage.hide();
			currentPage = null;
		}
	}
};