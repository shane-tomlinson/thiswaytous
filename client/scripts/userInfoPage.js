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

		onSubmit: function() {
			this.form.save();
			Page.sc.onSubmit.apply( this, arguments );
		}
	} );

	return Page;
}() );
