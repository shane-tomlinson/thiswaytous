TWTU.Router = ( function() {
	"use strict";

	var Router = AFrame.AObject.extend( {
		importconfig: [ 'routes' ],
		init: function( config ) {
			Router.sc.init.call( this, config );

			var me = this, allroutes = me.routes;
			var router = new routes();
			addRoutes.call( router, me, 'get', allroutes.get );
			addRoutes.call( router, me, 'post', allroutes.post );
		},

		pushState: function( url ) {
			document.location.hash = '#' + url;
		},

		redirect: function( url ) {
			history.replaceState( '','', '#' + url );
		}

	} );

	function addRoutes( context, verb, routes ) {
		var me=this;
		for( var key in routes ) {
			me[ verb ]( key, onRouteMatch.bind( context, key, routes[ key ] ) )
		}
	}

	function onRouteMatch( key, route, req ) {
		var params = req.params;
		this.req = req;

		if( AFrame.string( route ) ) {
			this.triggerEvent( route, params );
		}
		else if( AFrame.func( route ) ) {
			route( params );
		}
	}

	return Router;
}() );
