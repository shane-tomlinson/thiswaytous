TWTU.Page = (function() {
	"use strict";

	var Page = AFrame.Class( AFrame.Display, {
		importconfig: [ 'router' ],
		domevents: {
			'click .submit': 'onSubmit',
			'click .cancel': 'onCancel'
		},

		onSubmit: function( event ) {
			this.hide();
		},

		onCancel: function( event ) {
			event.preventDefault();
			history.back();
			this.hide();
		},

		show: function() {
			this.getTarget().removeClass( 'hiding' ).addClass( 'showing' );
		},

		hide: function() {
			this.getTarget().removeClass( 'showing' ).addClass( 'hiding' );
		}
	} );

	return Page;
}() );
