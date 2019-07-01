(function(window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error('No remote URL supplied.');
    }

    this.serverUrl = url;
  }

  //send data to server
  RemoteDataStore.prototype.add = function(key, val) {
    return $.post(this.serverUrl, val, function(serverResponse) {
      console.log(serverResponse);
    });
  };

  //get all order data
  RemoteDataStore.prototype.getAll = function(cb) {
    return $.get(this.serverUrl, function(serverResponse) {
      if (cb) {
        console.log(serverResponse);
        cb(serverResponse);
      }
    });
  };

  //get an order by email address
  RemoteDataStore.prototype.get = function(key, cb) {
    return $.get(this.serverUrl + '/' + key, function(serverResponse) {
      if (cb) {
        console.log(serverResponse);
        cb(serverResponse);
      }
    });
  };

  //remove order after order delivered
  RemoteDataStore.prototype.remove = function(key) {
    return $.ajax(this.serverUrl + '/' + key, { type: 'DELETE' });
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
