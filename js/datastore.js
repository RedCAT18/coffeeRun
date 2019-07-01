(function(window) {
  'use strict';
  var App = window.App || {};
  var Promise = window.Promise;

  //constructor
  function DataStore() {
    this.data = {};
  }

  //helper function
  function promiseResolveWith(value) {
    var promise = new Promise(function(resolve, reject) {
      resolve(value);
    });
    return promise;
  }

  //prototype function
  DataStore.prototype.add = function(key, val) {
    // var promise = new Promise(
    //   function(resolve, reject) {
    //     this.data[key] = val;
    //     resolve(null);
    //   }.bind(this)
    // );

    // return promise;
    this.data[key] = val;
    return promiseResolveWith(null);
  };

  //method getting value through key
  DataStore.prototype.get = function(key) {
    // return this.data[key];
    return promiseResolveWith(this.data[key]);
  };

  //method getting all values (no need key)
  DataStore.prototype.getAll = function() {
    // return this.data;
    return promiseResolveWith(this.data);
  };

  //method remobing value through key
  DataStore.prototype.remove = function(key) {
    delete this.data[key];
    return promiseResolveWith(null);
  };

  App.DataStore = DataStore;
  window.App = App;
})(window);
