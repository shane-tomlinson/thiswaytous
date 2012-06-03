define(function(require) {
	"use strict";
  return function() {
    console.log("initializing");
    var $ = require("jquery"),
        AFrame = require("aframe-current-jquery"),
        Controller = require("controller"),
        Session = require("session"),
        Users = require("users"),
        User = require("user"),
        CurrentUser = require("currentUser"),
        Markers = require("markers"),
        Map = require("map"),
        FormPage = require("formPage"),
        Page = require("page"),
        UserPosition = require("userposition"),
        MapPluginBounds = require("mapPluginBounds"),
        MapPluginUserInfoWindow = require("mapPluginUserInfoWindow"),
        MapPluginDestination = require("mapPluginDestination"),
        UserMapMarkers = require("userMapMarkers"),
        map,
        userPosition,
        markerID,
        pages = {}, session, currentUser, displayedUser,
          users, destination, markers, currentPage, controller;

    initialize();

    function initialize() {
          createDestination();
      createCurrentUser();
          createDisplayedUser();
      createSession();
      createUsers();
          createMarkers();
      createInviteCodeForm();
      createPages();
      createController();
      createUserPosition();
    }

    function createController() {
      controller = Controller( {
              session: session,
              pages: pages,
              currentUser: currentUser,
              displayedUser: displayedUser,
              users: users
          } );
    }


    function createCurrentUser() {
      currentUser = CurrentUser.create();
    }

      function createDisplayedUser() {
          displayedUser = User.create();
      }

    function createSession() {
      session = Session.create( {
        currentUser: currentUser,
              destination: destination
      } );
    }

    function createUsers() {
      users = Users.create( {
        session: session
      } );
    }

    function createMarkers() {
          markers = Markers.create( {
              users: users,
              destination: destination
          } );
      }

      function createInviteCodeForm() {
      var form = AFrame.DataForm.create( {
        target: '#invitecode',
        dataSource: session
      } );
    }

    function createPages() {
      var constructors = {
        enterCode: enterCode,
        userInfo: userInfo,
              displayUser: displayUserPage,
        'default': defaultPage
      };


      $( '.page' ).each( function( index, element ) {
        var id = $( element ).attr( 'id' );
        var constr = constructors[ id ] || constructors[ 'default' ];

        var page = constr( element );

        pages[ id ] = page;
      } );

      function enterCode( target ) {
        return formPage( target, session );
      }

      function userInfo( target ) {
              return formPage( target, currentUser );
      }

          function displayUserPage( target ) {
              return formPage( target, displayedUser );
          }

          function formPage( target, model ) {
              var form = AFrame.DataForm.create( {
                  target: target,
                  dataSource: model
              } );

              var page = FormPage.create( {
                  form: form,
                  target: target
              } );
              return page;
          }

      function defaultPage( target ) {
        var page = Page.create( {
          target: target
        } );
        return page;
      }
    }

    function createUserPosition() {
      userPosition = AFrame.create( UserPosition );
      userPosition.bindEvent( 'positionchange', createMapSetPosition );
      userPosition.getPosition();
    }

    function createMapSetPosition( event, position ) {
      updateCurrentUserCoords( position );

      if( !map ) {
        map = Map.create( {
          target: $( '#map' ),
          position: position,
          plugins: [ [ MapPluginBounds, {
            markers: markers
          } ], [ MapPluginUserInfoWindow, {
                      controller: controller
                  } ], [ MapPluginDestination, {
                      destination: destination
                  } ] ]
        } );

        var mapMarkers = UserMapMarkers.create( {
          markers: markers,
          map: map
        } );

        // do this after we have created the map/marker so the initial user
        //	gets inserted
        users.insert( currentUser );
      }
    }

      function createDestination() {
          destination = AFrame.DataContainer.create( {
              data: {
                  icon: 'http://maps.google.com/mapfiles/arrow.png',
                  shadow: 'http://maps.google.com/mapfiles/arrowshadow.png',
                  type: 'destination'
              }
          } );
      }

    function updateCurrentUserCoords( position ) {
      currentUser.set( position );
      session.update();
    }

    if( !window.console ) {
      window.console = {};
    }

    if( !console.log ) {
      console.log = function() {};
    }
  }
} );

