(function(window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  function CheckList(selector) {
    if (!selector) {
      throw new Error('No select provided.');
    }

    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error('Could not find element with selector : ' + selector);
    }
  }

  //method to handling click event to remove row
  CheckList.prototype.addClickHandler = function(fn) {
    this.$element.on(
      'click',
      'input',
      function(event) {
        var email = event.target.value;
        fn(email).then(
          function() {
            //remove row when it successes.
            this.removeRow(email);
          }.bind(this)
        );
      }.bind(this)
    );
  };

  //method to create Row instance
  CheckList.prototype.addRow = function(coffeeOrder) {
    //remove any existing rows that match the email address
    //because one person can order only one coffee at once
    this.removeRow(coffeeOrder.emailAddress);

    //create a new instance of a row using the coffee order info
    var rowElement = new Row(coffeeOrder);

    //add the new row instance's element property to the checklist
    this.$element.append(rowElement.$element);
  };

  //method to remove row after order delivered
  CheckList.prototype.removeRow = function(email) {
    //find row through email address and remove it
    this.$element
      .find('[value="' + email + '"]')
      .closest('[data-coffee-order="checkbox"]')
      .remove();
  };

  //constructor: create row (order)
  function Row(coffeeOrder) {
    var $div = $('<div></div>', {
      'data-coffee-order': 'checkbox',
      class: 'checkbox'
    });
    var $label = $('<label></label>');
    var $checkbox = $('<input></input', {
      type: 'checkbox',
      value: coffeeOrder.emailAddress
    });

    var description = ' [' + coffeeOrder.strength + 'X] ';
    description += coffeeOrder.size + ' ';

    if (coffeeOrder.flavour) {
      description += coffeeOrder.flavour + ' ';
    }
    description += coffeeOrder.coffee + ' ';
    description += ' (' + coffeeOrder.emailAddress + ')';

    //append elements
    $label.append($checkbox);
    $label.append(description);
    $div.append($label);

    //ready to use element
    this.$element = $div;
  }

  App.CheckList = CheckList;
  window.App = App;
})(window);
