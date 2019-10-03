'use strict';

(function () {
  var RADIX = 10;
  var HEIGH_SHIFT = 15;

  var mainPin = document.querySelector('.map__pin--main');
  var mainPinStyle = getComputedStyle(mainPin);

  var getMainPinData = function (isInit) {
    var shiftY = parseInt(mainPinStyle.height, RADIX) + HEIGH_SHIFT;
    if (isInit) {
      shiftY = Math.floor(shiftY / 2);
    }
    return {
      shiftX: Math.floor(parseInt(mainPinStyle.width, RADIX) / 2),
      shiftY: shiftY,
      left: parseInt(mainPinStyle.left, RADIX),
      top: parseInt(mainPinStyle.top, RADIX)
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
    var mainPins = document.querySelector('.map__pins');
    mainPins.appendChild(createPins(dataArray));
  };

  window.pin = {
    mainPin: mainPin,
    getMainPinData: getMainPinData,
    insertPins: insertPins
  };
})();
