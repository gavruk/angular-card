angular.module('gavruk.card', [])

.controller('CardCtrl', function($scope) {
})

.directive('card', function ($compile) {
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

      $(element).card({
        // a selector or jQuery object for the container
        // where you want the card to appear
        container: scope.cardContainer, // *required*

        numberInput: cardCtrl.numberInput,
        expiryInput: cardCtrl.expiryInput,
        cvcInput: cardCtrl.cvcInput,
        nameInput: cardCtrl.nameInput,

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
      });
    }
  };
})

.directive('cardNumber', function($compile) {
  return {
    restrict: 'A',
    scope: {
      ngModel: '='
    },
    require: ['^card', 'ngModel'],
    link: function (scope, element, attributes, ctrls) {
      cardCtrl = ctrls[0];
      cardCtrl.numberInput = element;
      scope.$watch('ngModel', function() {
        element.trigger('keyup');
      });
    }
  };
})

.directive('cardName', function($compile) {
  return {
    restrict: 'A',
    scope: {
      ngModel: '='
    },
    require: ['^card', 'ngModel'],
    link: function (scope, element, attributes, ctrls) {
      cardCtrl = ctrls[0];
      cardCtrl.nameInput = element;
      scope.$watch('ngModel', function() {
        element.trigger('keyup');
      });
    }
  };
})

.directive('cardExpiry', function($compile) {
  return {
    restrict: 'A',
    scope: {
      ngModel: '='
    },
    require: ['^card', 'ngModel'],
    link: function (scope, element, attributes, ctrls) {
      cardCtrl = ctrls[0];
      cardCtrl.expiryInput = element;
      scope.$watch('ngModel', function() {
        element.trigger('keyup');
      });
    }
  };
})

.directive('cardCvc', function($compile) {
  return {
    restrict: 'A',
    scope: {
      ngModel: '='
    },
    require: ['^card', 'ngModel'],
    link: function (scope, element, attributes, ctrls) {
      cardCtrl = ctrls[0];
      cardCtrl.cvcInput = element;
      scope.$watch('ngModel', function() {
        element.trigger('keyup');
      });
    }
  };
});
