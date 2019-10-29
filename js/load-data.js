'use strict';

window.loadData = (function () {
  var COUNTER = 3;

  var data = null;
  var counter = COUNTER;

  var onErrorLoadData = function (message) {
    var msg = '';
    window.util.map.insertBefore(window.util.createErrorPopup('При загрузке объявлений произошла ошибка. ' + message), window.filter.container);
    var error = document.querySelector('.error');
    var errorButton = error.querySelector('.error__button');
    if (counter > 0) {
      errorButton.addEventListener('mousedown', function (evt) {
        evt.preventDefault();
        error.remove();
        window.loadData.download();
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
    window.loadData.data = loadedData;
    window.pin.insert();
    window.form.activateFilter();
  };

  var downloadData = function () {
    var URL = 'https://js.dump.academy/keksobooking/data';
    if (window.loadData.data === null) {
      window.transferData(URL, 'GET', onSuccessLoadData, onErrorLoadData);
    }
  };

  return {
    data: data,
    download: downloadData
  };
})();
