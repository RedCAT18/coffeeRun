(function(window) {
  'use strict';
  var App = window.App || {};

  var Truck = App.Truck;
  var DataStore = App.DataStore;

  var myTruck = new Truck('ncc-1701', new DataStore());
  //export to global namespace
  window.myTruck = myTruck;
})(window);
