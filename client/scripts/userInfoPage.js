TWTU.UserInfoPage = (function() {
	"use strict";

	var Page = AFrame.Class( TWTU.Page, {
		importconfig: [ 'user' ],
		init: function( config ) {
			var me = this;

			Page.sc.init.call( me, config );

			me.form = AFrame.create( AFrame.DataForm, {
				target: this.getTarget(),
				dataSource: me.user
			} );
		},

		onSubmit: function( event ) {
			var me=this;
			if( me.form.save() ) {
				me.user.save();
				Page.sc.onSubmit.call( me, event );
			}
		}
	} );

	return Page;
}() );
