'use strict';

(function () {
  var COUNTER = 3;

  var counter = COUNTER;

  var onErrorLoadData = function (message) {
    var msg = '';
    window.util.map.insertBefore(window.util.createErrorPopup('При загрузке объявлений произошла ошибка. ' + message), window.util.mapFiltersContainer);
    var error = document.querySelector('.error');
    var errorButton = error.querySelector('.error__button');
    if (counter > 0) {
      errorButton.addEventListener('mousedown', function (evt) {
        evt.preventDefault();
        error.remove();
        window.loadData();
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
    window.util.data = loadedData;
    window.pin.insertPins();
  };

  window.loadData = function () {
    var URL = 'https://js.dump.academy/keksobooking/data';
    window.transferData(URL, 'GET', onSuccessLoadData, onErrorLoadData);
  };
})();
