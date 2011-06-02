
/*
 Copyright 2011 Paul Kinlan

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

var routes = function() {
  var _routes = [];
  var me = this;

  this.parseRoute = function(path) {
    this.parseGroups = function(loc) {
      var nameRegexp = new RegExp(":([^/.\\\\]+)", "g");
      var newRegexp = "" + loc;
      var groups = {};
      var matches = null;
      var i = 0;

      // Find the places to edit.
      while(matches = nameRegexp.exec(loc)) {
        groups[matches[1]] = i++;
        newRegexp = newRegexp.replace(matches[0], "([^/.\\\\]+)");
      }

      newRegexp += "$"; // Only do a full string match

      return { "groups" : groups, "regexp": new RegExp(newRegexp)};
    };

    return this.parseGroups(path);
  };

  var matchRoute = function(url, e) {
    var route = null;
    for(var i = 0; route = _routes[i]; i ++) {
      var routeMatch = route.regex.regexp.exec(url);
      if(!!routeMatch == false) continue;

      var params = {};
      for(var g in route.regex.groups) {
        var group = route.regex.groups[g];
        params[g] = routeMatch[group + 1];
      }

      var values = {};
      if(e && e.target instanceof HTMLFormElement) {
        var form = e.target;
        var items = form.length;
        var item;
        for(var j = 0; item = form[j]; j++) {
          if(!!item.name) values[item.name] = item.value;
        }
      }

      route.callback({"url": url, "params": params, "values" : values, "e": e});
      return true;
    }

    return false;
  };

  this.get = function(route, callback) {
    _routes.push({regex: this.parseRoute(route), "callback": callback, method: "get"});
  };

  this.post = function(route, callback) {
    _routes.push({regex: this.parseRoute(route), "callback": callback, method: "post"});
  };

  this.test = function(url) {
    matchRoute(url);
  };

  this.getRoutes = function() {
    return _routes;
  };

  var attach = function() {
	var matchedPath;

    me.run = handler;


    // Intercept FORM submissions.
    window.addEventListener("submit", function(e) {
      if(e.target.method == "post") {
        if (matchRoute(e.target.action, e)) {
           e.preventDefault();
           return false;
        }
      }
      // If we haven't matched a URL let the normal request happen.
      return true;
    },false);

	window.addEventListener("load", function(e){
		var location = document.location;
		location.hash = location.hash || '/';
		handler(e);
	}, false );
    window.addEventListener("popstate", handler, false );
    window.addEventListener("hashchange", handler, false );

	function handler(e) {
		var path = getPath();
		if( path === matchedPath ) {
			return;
		}

		if( matchRoute( path ) ) {
			matchedPath = path;
		}
	}

	function getPath() {
		return document.location.hash.replace('#','');
	}
  };

  attach();
};
