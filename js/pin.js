'use strict';

(function () {
  var ESC_KEYCODE = 27;
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

  var searchPinIndex = function (dataArray, pin) {
    var left = parseInt(pin.style.left, RADIX);
    var top = parseInt(pin.style.top, RADIX);
    for (var i = 0; i < dataArray.length; i++) {
      if (dataArray[i].location.x === left && dataArray[i].location.y === top) {
        return i;
      }
    }
    return 0;
  };

  var card = null;

  var onPopupEscPress = function (evt) {
    if (evt.which === ESC_KEYCODE) {
      closeCard();
    }
  };

  var closeCard = function () {
    card.remove();
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var openCard = function (pin) {
    window.card.insertCard(window.util.data, searchPinIndex(window.util.data, pin));
    card = document.querySelector('.map__card');
    var cardCloseButton = card.querySelector('.popup__close');
    cardCloseButton.addEventListener('click', function () {
      closeCard();
    });
    document.addEventListener('keydown', onPopupEscPress);
  };

  var setEventHandlers = function () {
    var mapPinCollection = document.querySelectorAll('.map__pin');
    mapPinCollection.forEach(function (item) {
      if (!item.classList.contains('map__pin--main')) {
        item.addEventListener('click', function () {
          openCard(item);
        });
      }
    });
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
    setEventHandlers();
  };

  window.pin = {
    mainPin: mainPin,
    getMainPinData: getMainPinData,
    insertPins: insertPins
  };
})();
