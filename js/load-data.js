'use strict';

(function () {
  var COUNTER = 3;

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
    debugger;
    var msg = '';
    window.util.map.insertBefore(createErrorPopup(message), window.util.mapFiltersContainer);
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
    debugger;
    window.util.data = loadedData;
    window.pin.insertPins(loadedData);
  };

  window.loadData = function () {
    //debugger;
    var URL = 'https://js.dump.academy/keksobooking/data';
    window.transferData(URL, 'GET', onSuccessLoadData, onErrorLoadData, '');
  };
})();
