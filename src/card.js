var hasRequire = window && window.angular ? false : typeof require === 'function';

(function (window, document, Card, angular, undefined) {
  'use strict';
  angular
    .module('gavruk.card', [])

  .controller('CardCtrl', ['$scope', function ($scope) {
  }])

  .directive('card', ['$timeout', function ($timeout) {
    return {
      restrict: 'A',
      scope: {
        cardContainer: '@', // required
        width: '@',
        placeholders: '=',
        options: '=',
        messages: '=',
      },
      controller: 'CardCtrl',
      link: function (scope, element, attributes, cardCtrl) {
        var defaultPlaceholders = {
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

        var placeholders = angular.extend(defaultPlaceholders, scope.placeholders);
        var messages = angular.extend(defaultMessages, scope.messages);
        var options = angular.extend(defaultOptions, scope.options);

        var opts = {
          form: '[name="' + attributes.name + '"]',

          // a selector or jQuery object for the container
          // where you want the card to appear
          container: scope.cardContainer, // *required*

          formSelectors: {},

          width: options.width,

          // Strings for translation - optional
          messages: {
            validDate: messages.validDate,
            monthYear: messages.monthYear
          },

          // Default placeholders for rendered fields - options
          placeholders: {
            number: placeholders.number,
            name: placeholders.name,
            expiry: placeholders.expiry,
            cvc: placeholders.cvc
          },

          formatting: options.formatting, // optional - default true
          debug: options.debug // if true, will log helpful messages for setting up Card
        };

        opts.width = opts.width || scope.width || 350;

        if (cardCtrl.numberInput && cardCtrl.numberInput.length > 0) {
          opts.formSelectors.numberInput = 'input[name="' + cardCtrl.numberInput[0].name + '"]';
        }
        if (angular.isDefined(cardCtrl.expiryInput.combined)) {
            opts.formSelectors.expiryInput = 'input[name="' + cardCtrl.expiryInput.combined[0].name + '"]';
        } else if (angular.isDefined(cardCtrl.expiryInput.month) && angular.isDefined(cardCtrl.expiryInput.year)) {
            opts.formSelectors.expiryInput = 'input[name="' + cardCtrl.expiryInput.month[0].name + '"], input[name="' + cardCtrl.expiryInput.year[0].name + '"]';
        }
        if (cardCtrl.cvcInput && cardCtrl.cvcInput.length > 0) {
          opts.formSelectors.cvcInput = 'input[name="' + cardCtrl.cvcInput[0].name + '"]';
        }

        if (angular.isDefined(cardCtrl.nameInput.combined)) {
          opts.formSelectors.nameInput = 'input[name="' + cardCtrl.nameInput.combined[0].name + '"]';
        } else if (angular.isDefined(cardCtrl.nameInput.first) && angular.isDefined(cardCtrl.nameInput.last)) {
          opts.formSelectors.nameInput = 'input[name="' + cardCtrl.nameInput.first[0].name + '"], input[name="' + cardCtrl.nameInput.last[0].name + '"]';
        }

        //Don't initialize card until angular has had a chance to update the DOM with any interpolated bindings
        $timeout(angular.noop)
            .then(function () {
              new Card(opts);
            });
      }
    };
  }])

  .directive('cardNumber', ['$compile', function ($compile) {
    return {
      restrict: 'A',
      scope: {
        ngModel: '='
      },
      require: [
        '^card',
        'ngModel'
      ],
      link: function (scope, element, attributes, ctrls) {
        var cardCtrl = ctrls[0];
        cardCtrl.numberInput = element;
        scope.$watch('ngModel', function (newVal, oldVal) {
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

  .directive('cardName', ['$compile', function ($compile) {
    return {
      restrict: 'A',
      scope: {
        ngModel: '=',
        type: '@cardName'
      },
      require: [
        '^card',
        'ngModel'
      ],
      link: function (scope, element, attributes, ctrls) {
        var cardCtrl = ctrls[0];
        var nameType = scope.type || 'combined';
        if (angular.isUndefined(cardCtrl.nameInput)) {
          cardCtrl.nameInput = {};
        }
        cardCtrl.nameInput[nameType] = element;
        scope.$watch('ngModel', function (newVal, oldVal) {
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

  .directive('cardExpiry', ['$compile', function ($compile) {
    return {
      restrict: 'A',
      scope: {
        ngModel: '=',
        type: '@cardExpiry'
      },
      require: [
        '^card',
        'ngModel'
      ],
      link: function (scope, element, attributes, ctrls) {
        var cardCtrl = ctrls[0];
        var expiryType = scope.type || 'combined';
        if (angular.isUndefined(cardCtrl.expiryInput)) {
            cardCtrl.expiryInput = {};
        }
        cardCtrl.expiryInput[expiryType] = element;
        scope.$watch('ngModel', function (newVal, oldVal) {
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

  .directive('cardCvc', ['$compile', function ($compile) {
    return {
      restrict: 'A',
      scope: {
        ngModel: '='
      },
      require: [
        '^card',
        'ngModel'
      ],
      link: function (scope, element, attributes, ctrls) {
        var cardCtrl = ctrls[0];
        cardCtrl.cvcInput = element;
        scope.$watch('ngModel', function (newVal, oldVal) {
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

})(window, window.document, hasRequire ? require('card') : window.Card, hasRequire ? require('angular') : window.angular);

if(typeof module !== 'undefined') {
  module.exports = 'gavruk.card';
}
