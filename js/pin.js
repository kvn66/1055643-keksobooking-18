'use strict';

(function () {
  var RADIX = 10;

  var mapPin = document.querySelector('.map__pin--main');

  var createPin = function (dataElement) {
    var similarPinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');
    var pinElement = similarPinTemplate.cloneNode(true);

    pinElement.style = 'left: ' + dataElement.location.x + 'px; top: ' + dataElement.location.y + 'px;';
    pinElement.querySelector('img').src = dataElement.author.avatar;
    pinElement.querySelector('img').alt = dataElement.offer.title;

    return pinElement;
  };

  var calculateAddress = function (isInit) {
    var pinStyle = getComputedStyle(mapPin);
    var shiftX = Math.floor(parseInt(pinStyle.width, RADIX) / 2);
    var shiftY = parseInt(pinStyle.height, RADIX);
    if (isInit) {
      shiftY = Math.floor(shiftY / 2);
    }
    var x = parseInt(pinStyle.left, RADIX) + shiftX;
    var y = parseInt(pinStyle.top, RADIX) + shiftY;
    return x + ', ' + y;
  };

  var createPins = function (dataArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < dataArray.length; i++) {
      fragment.appendChild(createPin(dataArray[i]));
    }
    return fragment;
  };

  window.pin = {
    mapPin: mapPin,
    calculateAddress: calculateAddress,
    createPins: createPins
  };
})();
