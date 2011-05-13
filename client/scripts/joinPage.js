TWTU.JoinPage = (function() {
	"use strict";

	var Page = AFrame.Class( TWTU.Page, {
		importconfig: [ 'session' ],
		init: function( config ) {
			var me = this;

			Page.sc.init.call( me, config );

			me.form = AFrame.create( AFrame.DataForm, {
				target: '#enterCodeForm',
				dataSource: me.session
			} );
		},
		onSubmit: function() {
			var me=this;
			if( me.form.save() ) {
				me.session.join();
			}

			Page.sc.onSubmit.apply( this, arguments );
		}
	} );

	return Page;
}() );
