angular-card
============

Angular directive for card https://github.com/jessepollak/card

![screen shot 2014-12-20 at 4 37 52 pm](https://cloud.githubusercontent.com/assets/507195/5514998/9a252c80-8866-11e4-81ad-dea3dc5e6870.png)

## Demo

http://jessepollak.github.io/card/

## Installation

### npm
`npm install angular-card`

## Usage

### `name` is required for form and inputs (you can use any unique name)
### `width` is optional, it can be set on the element or the options object (defaults to 350)

```html
<form action="#"
  name="cardForm"
  data-card
  data-width="500"
  data-card-container="#card-container"
  data-placeholders="cardPlaceholders"
  data-options="cardOptions"
  data-messages="cardMessages">

  <div>
    <input placeholder="Card number" type="text" name="CardNumber" card-number data-ng-model="card.number" />

    <input placeholder="Full name" type="text" name="CardName" card-name data-ng-model="card.name" />
  </div>
  <div>
    <input placeholder="MM / YYYY" type="text" name="CardExpiry" card-expiry data-ng-model="card.expiry" />

    <input placeholder="CVC" type="text" name="CardCvc" card-cvc data-ng-model="card.cvc" />

    <input type="button" value="Change card" data-ng-click="changeCard()" />
    <input type="button" value="Clear" data-ng-click="clear()" />
  </div>

</form>
```

```js
angular.module('app', ['gavruk.card'])
.controller('ExampleCtrl', ['$scope', function($scope) {

  $scope.card = {
    name: 'Mike Brown',
    number: '5555 4444 3333 1111',
    expiry: '11 / 2020',
    cvc: '123'
  };

  $scope.cardPlaceholders = {
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
    formatting: true,
    width: 500 //optional
  };

}]);
```

#### Using multiple fields

Simply use 2 input fields for the expiry, and pass either `month`, or `year` to the directive.

```js
<input placeholder="MM" type="text" name="CardExpiryMonth" card-expiry="month" data-ng-model="card.expiryMonth" />
<input placeholder="YYYY" type="text" name="CardExpiryYear" card-expiry="year" data-ng-model="card.expiryYear" />
```


Simply use 2 input fields for the name, and pass either `first`, or `last` to the directive.

```js
<input placeholder="CARD" type="text" name="CardFirstName" card-name="first" data-ng-model="card.firstName" />
<input placeholder="HOLDER" type="text" name="CardLastName" card-name="last" data-ng-model="card.lastName" />
```
