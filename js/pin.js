'use strict';

(function () {
  var RADIX = 10;
  var HEIGH_SHIFT = 15;

  var mapPin = document.querySelector('.map__pin--main');
  var pinStyle = getComputedStyle(mapPin);

  var getPinData = function (isInit) {
    var shiftY = parseInt(pinStyle.height, RADIX) + HEIGH_SHIFT;
    if (isInit) {
      shiftY = Math.floor(shiftY / 2);
    }
    return {
      shiftX: Math.floor(parseInt(pinStyle.width, RADIX) / 2),
      shiftY: shiftY,
      left: parseInt(pinStyle.left, RADIX),
      top: parseInt(pinStyle.top, RADIX)
    };
  };

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

  var createPins = function (dataArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < dataArray.length; i++) {
      fragment.appendChild(createPin(dataArray[i]));
    }
    return fragment;
  };

  var insertPins = function (dataArray) {
    var mapPins = document.querySelector('.map__pins');
    mapPins.appendChild(createPins(dataArray));
  };

  window.pin = {
    mapPin: mapPin,
    getPinData: getPinData,
    insertPins: insertPins
  };
})();
