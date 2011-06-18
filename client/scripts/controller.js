TWTU.Controller = function( config ) {
    var session = config.session,
        pages = config.pages,
        currentUser = config.currentUser,
        displayedUser = config.displayedUser,
        users = config.users;

	"use strict";

	var currentPage;

	var router = TWTU.Router.create( {
			routes: {
				get: {
					'/page/invite': handleInvite,
					'/page/:id': handlePage,
					'/route/:id': handleRoute,
                    '/user/:id': handleUser,
					'/': handleRoot
				},
				post: {
					'/user': handleUserPost,
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

    function handleUserPost() {
        router.redirect( '/' );
    }

    function handleUser( params ) {
        var id = params.id;
        if( id === 'me' ) {
            displayPage( 'userInfo' );
        }
        else {
            var user = users.get( ~~id );
            displayedUser.set( user.getDataObject() );
            displayPage( 'displayUser' );        
        }
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
			router.pushState( '/user/me' );
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

    return router;
};
