'use strict';

window.util = (function () {
  var RADIX = 10;
  var ESC_KEYCODE = 27;
  var main = document.querySelector('main');
  var map = document.querySelector('.map');

  var createErrorPopup = function (message) {
    var similarErrorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
    var errorElement = similarErrorTemplate.cloneNode(true);

    errorElement.querySelector('.error__message').textContent = message;
    main.insertBefore(errorElement, map);
  };

  var createSuccessPopup = function () {
    var similarSuccessTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
    var successElement = similarSuccessTemplate.cloneNode(true);
    main.insertBefore(successElement, map);
  };

  var debounce = function (cb, debounceInterval) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, debounceInterval);
    };
  };

  var resetPage = function () {
    window.card.closeCard();
    window.pin.removePins();
    window.loadData.data = null;
    window.mainPin.resetMainPinPosition();
    window.form.resetForm();
  };

  return {
    ESC_KEYCODE: ESC_KEYCODE,
    RADIX: RADIX,
    map: map,
    resetPage: resetPage,
    createErrorPopup: createErrorPopup,
    createSuccessPopup: createSuccessPopup,
    debounce: debounce
  };
})();
