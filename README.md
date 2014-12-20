angular-card
============

Angular directive for card https://github.com/jessepollak/card

![screen shot 2014-12-20 at 4 37 52 pm](https://cloud.githubusercontent.com/assets/507195/5514998/9a252c80-8866-11e4-81ad-dea3dc5e6870.png)

##Example

```html
<form action="#"
  data-card
  data-width="500"
  data-card-container="#card-container"
  data-values="cardValues"
  data-options="cardOptions"
  data-messages="cardMessages">

  <div>
    <input placeholder="Card number" type="text" card-number data-ng-model="card.number" />

    <input placeholder="Full name" type="text" card-name data-ng-model="card.name" />
  </div>
  <div>
    <input placeholder="MM / YYYY" type="text" card-expiry data-ng-model="card.expiry" />

    <input placeholder="CVC" type="text" card-cvc data-ng-model="card.cvc" />
  </div>
  
</form>
```

```js
angular.module('app', ['gavruk.card'])
.controller('ExampleCtrl', ['$scope', function($scope) {

  var card = {
    name: 'Mike Brown',
    number: '5555 4444 3333 1111',
    expiry: '11 / 2020',
    cvc: '123'
  };

  $scope.cardValues = {
    name: 'Your Full Name',
    number: 'xxxx xxxx xxxx xxxx',
    expiry: 'MM/YY',
    cvc: 'xxx'
  };

  $scope.cardMessages = {
    validDate: 'valid\nthru',
    monthYear: 'MM/YYYY',
  };

  $scope.cardOptions = {
    debug: false,
    formatting: true
  };

}]);
```
