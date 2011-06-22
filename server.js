var sys = require( 'sys' ), 
    http = require( 'http' ), 
    fs = require( 'fs' ),
	AFrame = require( './server/aframe-current-node' ), 
    Sessions = require( './server/sessions' ),
	sessions = Sessions.create(), 
    Session = require( './server/session' ),
	Users = require('./server/users'), 
    sessionID = 0;

var express = require( 'express' );

var root = './';

var app = express.createServer();
app.use( express.bodyParser() );

app.get( '/client/(*)', function( req, res ) {
	sendFile( 'client/' + req.params[ 0 ], res );
} );
app.get( '/', function( req, res ) {
	sendFile( 'client/templates/index.mtp', res );
} );

app.post( '/session/start', function( req, res ) {
    var body = req.body;
	var session = sessions.createSession();

    var user = JSON.parse( body.user );
	session.addUpdateUser( user );

    if( body.destination ) {
        var dest = JSON.parse( body.destination );
        session.setDestination( dest );
    }

    session.set( 'creator_id', user.id );

	writeContentType( res, ContentTypes.json );
	res.end( session.toString() );
} );

app.post( '/session/join', joinUpdateUser );
app.post( '/session/update', joinUpdateUser );

app.listen( 8000 );

function joinUpdateUser( req, res ) {
	var body = req.body;
	var sessionData = JSON.parse( body.session );
	var session = sessions.getSessionByData( sessionData );

	if( session ) {
	    var user = JSON.parse( body.user );
		session.addUpdateUser( user );

        if( body.destination ) {
            var dest = JSON.parse( body.destination );
            session.setDestination( dest );
        }
		
        writeContentType( res, ContentTypes.json );
		res.end( session.toString() );
	}
	else {
		console.log( 'session not found' );
		res.writeHead( 404 );
		res.end();
	}
}

function sendFile( fileName, res ) {
	fs.readFile( root + fileName, function( err, data ) {
		writeContentType( res, getContentTypes( fileName ) );
		res.end( data );
	} );
}

var ContentTypes = {
	'html': 'text/html',
	'mtp': 'text/html',
	'js': 'text/javascript',
	'css': 'text/css',
	'json': 'application/json'
}

function writeContentType( res, type ) {
	res.writeHead( 200, {
		'Content-Type': type
	} );
}

function getContentTypes( url ) {
	var extension = url.match( /\.(\w+)$/ );
	var type = ContentTypes[ extension[ 1 ] ] || 'text/html';
	return type;
}
