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
    $.post(this.serverUrl, val, function(serverResponse) {
      console.log(serverResponse);
    });
  };

  //get all order data
  RemoteDataStore.prototype.getAll = function(cb) {
    $.get(this.serverUrl, function(serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  //get an order by email address
  RemoteDataStore.prototype.get = function(key, cb) {
    $.get(this.serverUrl + '/' + key, function(serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  //remove order after order delivered
  RemoteDataStore.prototype.remove = function(key) {
    $.ajax(this.serverUrl + '/' + key, { type: 'DELETE' });
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
