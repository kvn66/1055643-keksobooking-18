'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var MIN_WIDTH = 0;
  var MAX_WIDTH = 1200;
  var MIN_HEIGHT = 0;
  var MAX_HEIGHT = 750;

  var activatePage = function () {
    if (window.util.data === null) {
      window.loadData();
    }
    window.form.activateForm();
  };

  var pin = window.pin.getMainPinData(false);

  window.pin.mainPin.addEventListener('mousedown', function (evt) {
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
        x: window.pin.mainPin.offsetLeft - shift.x,
        y: window.pin.mainPin.offsetTop - shift.y
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

      window.pin.mainPin.style.top = currentPosition.y + 'px';
      window.pin.mainPin.style.left = currentPosition.x + 'px';

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

  window.pin.mainPin.addEventListener('keydown', function (evt) {
    if (evt.which === ENTER_KEYCODE) {
      activatePage();
    }
  });
})();
