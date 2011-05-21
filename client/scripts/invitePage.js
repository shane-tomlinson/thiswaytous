TWTU.InvitePage = (function() {
	"use strict";

	var Page = AFrame.Class( TWTU.Page, {
		importconfig: [ 'session' ],
		show: function() {
			var me=this;

			me.session.start();

			Page.sc.show.call( me );
		}
	} );

	return Page;
}() );
