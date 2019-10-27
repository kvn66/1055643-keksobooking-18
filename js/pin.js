'use strict';

window.pin = (function () {
  var searchPinIndex = function (dataArray, pin) {
    var left = parseInt(pin.style.left, window.util.RADIX);
    var top = parseInt(pin.style.top, window.util.RADIX);
    for (var i = 0; i < dataArray.length; i++) {
      if (dataArray[i].location.x === left && dataArray[i].location.y === top) {
        return i;
      }
    }
    return 0;
  };

  var setEventHandlers = function () {
    var mapPinCollection = document.querySelectorAll('.map__pin');
    mapPinCollection.forEach(function (item) {
      if (!item.classList.contains('map__pin--main')) {
        item.addEventListener('click', function () {
          window.card.openCard(item);
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

  var insertPins = function () {
    var pins = document.querySelector('.map__pins');
    pins.appendChild(createPins(window.filter.filterData(window.loadData.data)));
    setEventHandlers();
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin');
    pins.forEach(function (item) {
      if (!item.classList.contains('map__pin--main')) {
        item.remove();
      }
    });
  };

  return {
    insertPins: insertPins,
    removePins: removePins,
    searchPinIndex: searchPinIndex
  };
})();
