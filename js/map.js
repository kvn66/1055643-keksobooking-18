'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var DATA_ARRAY_COUNT = 8;
  var MIN_WIDTH = 0;
  var MAX_WIDTH = 1200;
  var MIN_HEIGHT = 0;
  var MAX_HEIGHT = 750;


  var insertPins = function (dataArray) {
    var mapPins = document.querySelector('.map__pins');
    mapPins.appendChild(window.pin.createPins(dataArray));
  };

  var insertCard = function (dataArray) {
    var map = document.querySelector('.map');
    map.insertBefore(window.card.createCard(dataArray, 0), map.querySelector('.map__filters-container'));
  };

  var loadData = function () {
    var URL = 'https://js.dump.academy/keksobooking/data';

    var dataArray = null;

    var onError = function (message) {
      debugger;
      throw new Error(message);
    };

    var onSuccess = function (data) {
      debugger;
      dataArray = data;
    };

    window.load(URL, onSuccess, onError);
    return dataArray;
  };

  var activatePage = function () {
    var dataArray = loadData();
    insertPins(dataArray);
    insertCard(dataArray);
    window.form.activateForm();
  };

  var pin = window.pin.getPinData(false);

  window.pin.mapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    activatePage();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var currentPosition = {
        x: window.pin.mapPin.offsetLeft - shift.x,
        y: window.pin.mapPin.offsetTop - shift.y
      };

      if (currentPosition.x < MIN_WIDTH - pin.shiftX) {
        currentPosition.x = MIN_WIDTH - pin.shiftX;
      } else if (currentPosition.x > MAX_WIDTH - pin.shiftX) {
        currentPosition.x = MAX_WIDTH - pin.shiftX;
      }

      if (currentPosition.y < MIN_HEIGHT) {
        currentPosition.y = MIN_HEIGHT;
      } else if (currentPosition.y > MAX_HEIGHT - pin.shiftY) {
        currentPosition.y = MAX_HEIGHT - pin.shiftY;
      }

      window.pin.mapPin.style.top = currentPosition.y + 'px';
      window.pin.mapPin.style.left = currentPosition.x + 'px';

      window.form.calculateAddress(false);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    window.form.calculateAddress(false);
  });

  window.pin.mapPin.addEventListener('keydown', function (evt) {
    if (evt.which === ENTER_KEYCODE) {
      activatePage();
    }
  });
})();
