TWTU.Page = (function() {
	"use strict";

	var Page = AFrame.Class( AFrame.Display, {
		domevents: {
			'click .submit': 'onSubmit',
			'click .cancel': 'onCancel'
		},

		onSubmit: function( event ) {
			event.preventDefault();

			this.hide();
		},

		onCancel: function( event ) {
			event.preventDefault();

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
