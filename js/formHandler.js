(function(window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  function printRange(r) {
    var range = r || $('input#strengthLevel')[0].value;

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
      fn(data).then(
        function() {
          //reset form after submit when it successes.
          this.reset();
          printRange(30);
          this.elements[0].focus(); //focus on the first form
        }.bind(this)
      );
    });
  };

  FormHandler.prototype.addInputHandler = function(fn) {
    console.log('Setting input handler for form.');
    this.$formElement.on('input', '[name="emailAddress"]', function(event) {
      var emailAddress = event.target.value;
      var message = '';
      if (fn(emailAddress)) {
        event.target.setCustomValidity('');
      } else {
        message = emailAddress + ' is not an authorised email address';
        event.target.setCustomValidity(message);
      }
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
