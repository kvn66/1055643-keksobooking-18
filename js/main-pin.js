'use strict';

window.mainPin = (function () {
  var HEIGH_SHIFT = 15;
  var ENTER_KEYCODE = 13;
  var MIN_WIDTH = 0;
  var MAX_WIDTH = 1200;
  var MIN_HEIGHT = 50;
  var MAX_HEIGHT = 630;

  var mainPin = document.querySelector('.map__pin--main');
  var mainPinStyle = getComputedStyle(mainPin);

  var mainPinDefaultPosition = {
    x: mainPinStyle.left,
    y: mainPinStyle.top
  };

  var resetMainPinPosition = function () {
    mainPin.style.top = mainPinDefaultPosition.y;
    mainPin.style.left = mainPinDefaultPosition.x;
  };

  var getMainPinData = function (isInit) {
    var shiftY = parseInt(mainPinStyle.height, window.util.RADIX) + HEIGH_SHIFT;
    if (isInit) {
      shiftY = Math.floor(shiftY / 2);
    }
    return {
      shiftX: Math.floor(parseInt(mainPinStyle.width, window.util.RADIX) / 2),
      shiftY: shiftY,
      left: parseInt(mainPinStyle.left, window.util.RADIX),
      top: parseInt(mainPinStyle.top, window.util.RADIX)
    };
  };

  var pin = getMainPinData(false);

  var onMouseDown = function (evt) {
    evt.preventDefault();
    window.loadData.download();
    window.form.activate();
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
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
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

      mainPin.style.top = currentPosition.y + 'px';
      mainPin.style.left = currentPosition.x + 'px';

      window.form.updateAddress(false);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    window.form.updateAddress(false);
  };

  var onEnterPress = function (evt) {
    if (evt.which === ENTER_KEYCODE) {
      window.loadData.download();
      window.form.activate();
    }
  };

  var init = function () {
    mainPin.addEventListener('mousedown', onMouseDown);
    mainPin.addEventListener('keydown', onEnterPress);
  };

  return {
    getData: getMainPinData,
    resetPosition: resetMainPinPosition,
    init: init
  };

})();
