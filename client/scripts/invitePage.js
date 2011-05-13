TWTU.InvitePage = (function() {
	"use strict";

	var Page = AFrame.Class( TWTU.Page, {
		importconfig: [ 'session' ],
		init: function( config ) {
			var me = this;

			Page.sc.init.call( me, config );

			me.form = AFrame.create( AFrame.DataForm, {
				target: '#invitecode',
				dataSource: me.session
			} );
		},


		show: function() {
			var me=this;

			me.session.start();

			Page.sc.show.call( me );
		}
	} );

	return Page;
}() );
