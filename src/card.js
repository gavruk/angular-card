angular.module('gavruk.card', [])

.controller('CardCtrl', ['$scope', function($scope) {
}])

.directive('card', ['$compile', function ($compile) {
  return {
    restrict: 'A',
    scope: {
      cardContainer: '@', // required
      width: '@',
      values: '=',
      options: '=',
      messages: '=',
    },
    controller: 'CardCtrl',
    link: function (scope, element, attributes, cardCtrl) {
      var defaultValues = {
        number: '•••• •••• •••• ••••',
        name: 'Full Name',
        expiry: '••/••',
        cvc: '•••'
      };
      var defaultMessages = {
        validDate: 'valid\nthru',
        monthYear: 'month/year',
      };
      var defaultOptions = {
        debug: false,
        formatting: true
      };

      var values = angular.extend(defaultValues, scope.values);
      var messages = angular.extend(defaultMessages, scope.messages);
      var options = angular.extend(defaultOptions, scope.options);


      var opts = {
        // a selector or jQuery object for the container
        // where you want the card to appear
        container: scope.cardContainer, // *required*

        formSelectors: {},

        width: scope.width || 350,

        // Strings for translation - optional
        messages: {
          validDate: messages.validDate,
          monthYear: messages.monthYear
        },

        // Default values for rendered fields - options
        values: {
          number: values.number,
          name: values.name,
          expiry: values.expiry,
          cvc: values.cvc
        },

        formatting: options.formatting, // optional - default true
        debug: options.debug // if true, will log helpful messages for setting up Card
      };

      if (cardCtrl.numberInput && cardCtrl.numberInput.length > 0) {
        opts.formSelectors.numberInput = 'input[name="' + cardCtrl.numberInput[0].name + '"]';
      }
      if (cardCtrl.expiryInput && cardCtrl.expiryInput.length > 0) {
        opts.formSelectors.expiryInput = 'input[name="' + cardCtrl.expiryInput[0].name + '"]';
      }
      if (cardCtrl.cvcInput && cardCtrl.cvcInput.length > 0) {
        opts.formSelectors.cvcInput = 'input[name="' + cardCtrl.cvcInput[0].name + '"]';
      }
      if (cardCtrl.nameInput && cardCtrl.nameInput.length > 0) {
        opts.formSelectors.nameInput = 'input[name="' + cardCtrl.nameInput[0].name + '"]';
      }

      $(element).card(opts);
    }
  };
}])

.directive('cardNumber', ['$compile', function($compile) {
  return {
    restrict: 'A',
    scope: {
      ngModel: '='
    },
    require: ['^card', 'ngModel'],
    link: function (scope, element, attributes, ctrls) {
      cardCtrl = ctrls[0];
      cardCtrl.numberInput = element;
      scope.$watch('ngModel', function(newVal, oldVal) {
        if (!oldVal && !newVal) {
          return;
        }
        if (oldVal === newVal && !newVal) {
          return;
        }

        var evt = document.createEvent('HTMLEvents');
        evt.initEvent('keyup', false, true);
        element[0].dispatchEvent(evt);
      });
    }
  };
}])

.directive('cardName', ['$compile', function($compile) {
  return {
    restrict: 'A',
    scope: {
      ngModel: '='
    },
    require: ['^card', 'ngModel'],
    link: function (scope, element, attributes, ctrls) {
      cardCtrl = ctrls[0];
      cardCtrl.nameInput = element;
      scope.$watch('ngModel', function(newVal, oldVal) {
        if (!oldVal && !newVal) {
          return;
        }
        if (oldVal === newVal && !newVal) {
          return;
        }

        var evt = document.createEvent('HTMLEvents');
        evt.initEvent('keyup', false, true);
        element[0].dispatchEvent(evt);
      });
    }
  };
}])

.directive('cardExpiry', ['$compile', function($compile) {
  return {
    restrict: 'A',
    scope: {
      ngModel: '='
    },
    require: ['^card', 'ngModel'],
    link: function (scope, element, attributes, ctrls) {
      cardCtrl = ctrls[0];
      cardCtrl.expiryInput = element;
      scope.$watch('ngModel', function(newVal, oldVal) {
        if (!oldVal && !newVal) {
          return;
        }
        if (oldVal === newVal && !newVal) {
          return;
        }

        var evt = document.createEvent('HTMLEvents');
        evt.initEvent('keyup', false, true);
        element[0].dispatchEvent(evt);
      });
    }
  };
}])

.directive('cardCvc', ['$compile', function($compile) {
  return {
    restrict: 'A',
    scope: {
      ngModel: '='
    },
    require: ['^card', 'ngModel'],
    link: function (scope, element, attributes, ctrls) {
      cardCtrl = ctrls[0];
      cardCtrl.cvcInput = element;
      scope.$watch('ngModel', function(newVal, oldVal) {
        if (!oldVal && !newVal) {
          return;
        }
        if (oldVal === newVal && !newVal) {
          return;
        }

        var evt = document.createEvent('HTMLEvents');
        evt.initEvent('keyup', false, true);
        element[0].dispatchEvent(evt);
      });
    }
  };
}]);
