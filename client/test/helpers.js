
var Events = {
	events: {},
	eventHandler: function( event ) {
		Events.events[ event.type ] = true;
	},
	isTriggered: function( type ) {
		return !!Events.events[ type ];
	},
	reset: function() {
		Events.events = {};
	}
};
