(function(window) {
  'use strict';
  var App = window.App || {};

  //constructor
  function DataStore() {
    this.data = {};
  }

  //prototype function
  DataStore.prototype.add = function(key, val) {
    this.data[key] = val;
  };

  //method getting value through key
  DataStore.prototype.get = function(key) {
    return this.data[key];
  };

  //method getting all values (no need key)
  DataStore.prototype.getAll = function() {
    return this.data;
  };

  //method remobing value through key
  DataStore.prototype.remove = function(key) {
    delete this.data[key];
  };

  App.DataStore = DataStore;
  window.App = App;
})(window);
