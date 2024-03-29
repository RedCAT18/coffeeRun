(function(window) {
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  var SERVER_URL =
    'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';

  var App = window.App || {};

  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var CheckList = App.CheckList;
  var remoteDS = new RemoteDataStore(SERVER_URL);

  var myTruck = new Truck('ncc-1701', new DataStore());
  // var myTruck = new Truck('ncc-1701', remoteDS);
  //export to global namespace
  window.myTruck = myTruck;
  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  var formHandler = new FormHandler(FORM_SELECTOR);

  //bind method reference
  // formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));
  // console.log(formHandler);

  //bind this and call methods
  formHandler.addSubmitHandler(function(data) {
    return myTruck.createOrder.call(myTruck, data).then(function() {
      checkList.addRow.call(checkList, data);
    });
  });
  formHandler.addInputHandler(Validation.isCompanyEmail);
  //print list when page loaded
  myTruck.printOrders(checkList.addRow.bind(checkList));
})(window);
