(function(window) {
  'use strict';

  var App = window.App || {};

  //constructor
  function Truck(truckId, db) {
    this.truckId = truckId;
    this.db = db;
  }

  //method adding new order
  Truck.prototype.createOrder = function(order) {
    console.log('Adding order for ' + order.emailAddress);
    this.db.add(order.emailAddress, order);
  };

  //method deleting existing order
  Truck.prototype.deliverOrder = function(customerId) {
    console.log('Delivering order for ' + customerId);
    this.db.remove(customerId);
  };

  //method printing orders
  Truck.prototype.printOrders = function() {
    //get all customers from orders
    var customerIdArray = Object.keys(this.db.getAll());

    console.log('Truck # ' + this.truckId + ' has pending orders : ');
    customerIdArray.forEach(
      function(id) {
        console.log(this.db.get(id));
      }.bind(this)
    );
  };
  App.Truck = Truck;
  window.App = App;
})(window);
