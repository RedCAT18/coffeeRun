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
    return this.db.add(order.emailAddress, order);
  };

  //method deleting existing order
  Truck.prototype.deliverOrder = function(customerId) {
    console.log('Delivering order for ' + customerId);
    return this.db.remove(customerId);
  };

  //method printing orders
  Truck.prototype.printOrders = function(printFn) {
    //get all customers from orders
    return this.db.getAll().then(
      function(orders) {
        // var customerIdArray = Object.keys(this.db.getAll());
        var customerIdArray = Object.keys(orders);
        console.log('Truck # ' + this.truckId + ' has pending orders : ');
        customerIdArray.forEach(
          function(id) {
            console.log(orders[id]);
            if (printFn) {
              printFn(orders[id]);
            }
          }.bind(this)
        );
      }.bind(this)
    );
  };
  App.Truck = Truck;
  window.App = App;
})(window);
