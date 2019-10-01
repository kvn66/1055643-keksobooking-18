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

  window.pin.mapPin.addEventListener('mousedown', function () {
    activatePage();
  });

  window.pin.mapPin.addEventListener('keydown', function (evt) {
    if (evt.which === ENTER_KEYCODE) {
      activatePage();
    }
  });
})();
