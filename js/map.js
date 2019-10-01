'use strict';

var RADIX = 10;
var ENTER_KEYCODE = 13;
var DATA_ARRAY_COUNT = 8;


var mapPin = document.querySelector('.map__pin--main');

var insertPins = function (dataArray) {
  var mapPins = document.querySelector('.map__pins');
  mapPins.appendChild(window.createPins(dataArray));
};

var insertCard = function (dataArray) {
  var map = document.querySelector('.map');
  map.insertBefore(window.createCard(dataArray, 0), map.querySelector('.map__filters-container'));
};

var calculateAddress = function (pinStyle, isInit) {
  var shiftX = Math.floor(parseInt(pinStyle.width, RADIX) / 2);
  var shiftY = parseInt(pinStyle.height, RADIX);
  if (isInit) {
    shiftY = Math.floor(shiftY / 2);
  }
  var x = parseInt(pinStyle.left, RADIX) + shiftX;
  var y = parseInt(pinStyle.top, RADIX) + shiftY;
  return x + ', ' + y;
};

var activatePage = function () {
  var dataArray = createDataArray(DATA_ARRAY_COUNT);
  insertPins(dataArray);
  insertCard(dataArray);
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  document.querySelector('.map__filters').classList.remove('ad-form--disabled');
  enableElement(formFieldsets);
  address.value = calculateAddress(pinStyles, false);
};

mapPin.addEventListener('mousedown', function () {
  activatePage();
});

mapPin.addEventListener('keydown', function (evt) {
  if (evt.which === ENTER_KEYCODE) {
    activatePage();
  }
});

