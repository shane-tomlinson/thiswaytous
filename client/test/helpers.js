
var Events = {
	events: {},
	eventHandler: function( event ) {
		Events.events[ event.type ] = [].slice.call( arguments, 0 );
	},
	isTriggered: function( type ) {
		return !!Events.events[ type ];
	},
	getArguments: function( type ) {
		return Events.events[ type ];
	},
	reset: function() {
		Events.events = {};
	}
};
