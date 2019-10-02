'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var DATA_ARRAY_COUNT = 8;


  var insertPins = function (dataArray) {
    var mapPins = document.querySelector('.map__pins');
    mapPins.appendChild(window.pin.createPins(dataArray));
  };

  var insertCard = function (dataArray) {
    var map = document.querySelector('.map');
    map.insertBefore(window.card.createCard(dataArray, 0), map.querySelector('.map__filters-container'));
  };

  var activatePage = function () {
    var dataArray = window.createData.createDataArray(DATA_ARRAY_COUNT);
    insertPins(dataArray);
    insertCard(dataArray);
    window.form.activateForm();
  };

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

      window.pin.mapPin.style.top = (window.pin.mapPin.offsetTop - shift.y) + 'px';
      window.pin.mapPin.style.left = (window.pin.mapPin.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.pin.mapPin.addEventListener('keydown', function (evt) {
    if (evt.which === ENTER_KEYCODE) {
      activatePage();
    }
  });
})();
