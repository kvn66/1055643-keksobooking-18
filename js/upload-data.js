'use strict';

window.uploadData = (function () {
  var closeErrorPopup = function () {
    var error = document.querySelector('.error');
    error.remove();
    document.removeEventListener('click', closeErrorPopup);
    document.removeEventListener('keydown', onErrorEscPress);
  };

  var onErrorEscPress = function (evt) {
    if (evt.which === window.util.ESC_KEYCODE) {
      closeErrorPopup();
    }
  };

  var onErrorUploadData = function (message) {
    window.util.createErrorPopup('При отправке формы произошла ошибка. ' + message);
    var error = document.querySelector('.error');
    var errorButton = error.querySelector('.error__button');
    errorButton.textContent = 'Закрыть';
    errorButton.addEventListener('click', closeErrorPopup);
    document.addEventListener('click', closeErrorPopup);
    document.addEventListener('keydown', onErrorEscPress);
  };

  var closeSuccessPopup = function () {
    var success = document.querySelector('.success');
    success.remove();
    document.removeEventListener('click', closeSuccessPopup);
    document.removeEventListener('keydown', onSuccessEscPress);

    window.util.resetPage();
  };

  var onSuccessEscPress = function (evt) {
    if (evt.which === window.util.ESC_KEYCODE) {
      closeSuccessPopup();
    }
  };

  var onSuccessUploadData = function () {
    window.util.createSuccessPopup();

    document.addEventListener('click', closeSuccessPopup);
    document.addEventListener('keydown', onSuccessEscPress);
  };

  return function (data) {
    var URL = 'https://js.dump.academy/keksobooking';
    window.transferData(URL, 'POST', onSuccessUploadData, onErrorUploadData, data);
  };
})();
