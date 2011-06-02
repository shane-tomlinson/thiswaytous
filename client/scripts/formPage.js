TWTU.FormPage = (function() {
	"use strict";

	var Page = AFrame.Class( TWTU.Page, {
		importconfig: [ 'form' ],
		onSubmit: function( event ) {
			var me=this;
			if( me.form.save() ) {
				Page.sc.onSubmit.call( me, event );
			}
			else {
				event.preventDefault();
			}
		}
	} );

	return Page;
}() );
