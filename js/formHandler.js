(function(window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  function printRange() {
    var range = $('input#strengthLevel')[0].value;

    if (range <= 30) {
      $('span.caffeine-rate')
        .text(range)
        .css('color', 'green');
    } else if (30 < range && range <= 70) {
      $('span.caffeine-rate')
        .text(range)
        .css('color', 'yellow');
    } else {
      $('span.caffeine-rate')
        .text(range)
        .css('color', 'red');
    }
  }
  printRange();

  function rangeHandler() {
    $('input#strengthLevel').change(function() {
      printRange();
    });
  }
  rangeHandler();

  function FormHandler(selector) {
    if (!selector) {
      throw new Error('No Selector provided.');
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  //method for when user submit form
  FormHandler.prototype.addSubmitHandler = function(fn) {
    console.log('Setting submit handler for form.');
    this.$formElement.on('submit', function(event) {
      event.preventDefault();
      var data = {};
      $(this)
        .serializeArray()
        .forEach(function(item) {
          data[item.name] = item.value;
          console.log(item.name + ' is ' + item.value);
        });
      console.log(data);
      fn(data);

      //reset form after submit.
      this.reset();
      this.element[0].focus(); //focus on the first form
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
