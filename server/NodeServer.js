var sys = require( 'sys' ), http = require( 'http' ), fs = require( 'fs' ),
	AFrame = require( './aframe-current-node' ), Session = require( './session' ),
	sessions = AFrame.create( AFrame.CollectionArray ), sessionID = 0;

var express = require( 'express' );

var root = '../';

var app = express.createServer();
app.use( express.bodyParser() );

app.get( '/client/(*)', function( req, res ) {
	sendFile( 'client/' + req.params[ 0 ], res );
} );
app.get( '/', function( req, res ) {
	sendFile( 'client/templates/index.mtp', res );
} );

app.post( '/session/start', function( req, res ) {
	console.log( req.body );
	var session = AFrame.create( Session, {
		data: {
			id: sessionID++,
			start_date: Date.now(),
			invite_code_1: 'abc',
			invite_code_2: 'def',
			invite_code_3: 'geh',
		}
	} );
	sessions.insert( session );

	var user = req.body;
	var userID = session.addUser( user.name, user.lat, user.lon );
	session.set( 'user_id', userID );

	writeContentType( res, 'json' );
	res.end( session.toString() );
} );

app.post( '/session/join', function( req, res ) {
	var body = req.body;
	var session = sessions.get( body.session_id || 0 );

	if( session ) {
		var userID = body.id;
		var user = userID && session.getUser( userID );

		if( !user ) {
			userID = session.addUser( body.name, body.lat, body.lon );
			session.set( 'user_id', userID );
		}
		else {
			user.name = body.name;
			user.lat = body.lat;
			user.lon = body.lon;
		}

		session.set( 'user_id', userID );
	}

	writeContentType( res, 'json' );
	res.end( session.toString() );
} );

app.listen( 8000 );

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
		'Content-Type': ContentTypes[ type ]
	} );
}

function getContentTypes( url ) {
	var extension = url.match( /\.(\w+)$/ );
	var type = ContentTypes[ extension[ 1 ] ] || 'text/html';
	return type;
}
