( function() {
	"use strict";

	var page, target = $( '#target' );

	module( 'TWTU.Page', {
		setup: function() {
			page = AFrame.create( TWTU.Page, {
				target: target
			} );
		},
		teardown: function() {
			page.teardown();
		}
	} );

	test( 'Page is created', function() {
		ok( page instanceof TWTU.Page, 'page is created' );
	} );

	test( 'show adds class showing, removes class hiding', function() {
		target.addClass( 'hiding' );

		page.show();

		ok( !target.hasClass( 'hiding' ), 'class hiding removed' );
		ok( target.hasClass( 'showing' ), 'class showing added' );
	} );

	test( 'hide removes class showing, adds class hiding', function() {
		target.addClass( 'showing' );

		page.hide();

		ok( target.hasClass( 'hiding' ), 'class hiding added' );
		ok( !target.hasClass( 'showing' ), 'class showing removed' );
	} );

	test( 'submit button hooked up to onSubmit, page hidden', function() {
		target.addClass( 'showing' ).removeClass( 'hiding' );

		$( '.submit', target ).click();

		ok( target.hasClass( 'hiding' ), 'class hiding added' );
		ok( !target.hasClass( 'showing' ), 'class showing removed' );
	} );

	test( 'cancel button hooked up to onCancel, page hidden', function() {
		target.addClass( 'showing' ).removeClass( 'hiding' );

		$( '.cancel', target ).click();

		ok( target.hasClass( 'hiding' ), 'class hiding added' );
		ok( !target.hasClass( 'showing' ), 'class showing removed' );
	} );
}() );
