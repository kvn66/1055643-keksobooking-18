'use strict';

(function () {
  var COUNTER = 3;

  var counter = COUNTER;

  var onErrorUploadData = function (message) {
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

  window.uploadData = function (data, onSuccessUploadData) {
    var URL = 'https://js.dump.academy/keksobooking';
    window.transferData(URL, 'POST', onSuccessUploadData, onErrorUploadData, data);
  };
})();
