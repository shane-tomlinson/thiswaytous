define(["aframe-current-jquery", "page"], function(AFrame, Page) {
	"use strict";

	var FormPage = AFrame.Class( Page, {
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

	return FormPage;
});
