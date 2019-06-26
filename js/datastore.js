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

  App.DataStore = DataStore;
  window.App = App;
})(window);
