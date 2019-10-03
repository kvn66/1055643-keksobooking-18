'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var MIN_WIDTH = 0;
  var MAX_WIDTH = 1200;
  var MIN_HEIGHT = 0;
  var MAX_HEIGHT = 750;
  var COUNTER = 3;

  var data = null;
  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');

  var insertPins = function (dataArray) {
    var mapPins = document.querySelector('.map__pins');
    mapPins.appendChild(window.pin.createPins(dataArray));
  };

  var insertCard = function (dataArray) {
    map.insertBefore(window.card.createCard(dataArray, 0), mapFiltersContainer);
  };

  var createErrorPopup = function (message) {
    var similarErrorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
    var errorElement = similarErrorTemplate.cloneNode(true);

    errorElement.querySelector('.error__message').textContent = 'При загрузке объявлений произошла ошибка. ' + message;

    return errorElement;
  };

  var counter = COUNTER;

  var onErrorLoadData = function (message) {
    var msg = '';
    map.insertBefore(createErrorPopup(message), mapFiltersContainer);
    var error = document.querySelector('.error');
    var errorButton = error.querySelector('.error__button');
    if (counter > 0) {
      errorButton.addEventListener('mousedown', function (evt) {
        evt.preventDefault();
        error.remove();
        loadData();
      });
    } else {
      msg = 'Попробовать в другой раз';
      errorButton.textContent = msg;
      errorButton.addEventListener('mousedown', function (evt) {
        evt.preventDefault();
        error.remove();
        throw new Error(message);
      });
    }
    counter--;
  };

  var onSuccessLoadData = function (loadedData) {
    data = loadedData;
    insertPins(data);
    insertCard(data);
  };

  var loadData = function () {
    var URL = 'https://js.dump.academy/keksobooking/data';
    window.load(URL, onSuccessLoadData, onErrorLoadData);
  };

  var activatePage = function () {
    if (data === null) {
      loadData();
    }
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
