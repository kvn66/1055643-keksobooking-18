'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var data = null;
  var main = document.querySelector('main');
  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');

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


  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    data: data,
    map: map,
    mapFiltersContainer: mapFiltersContainer,
    createErrorPopup: createErrorPopup,
    createSuccessPopup: createSuccessPopup
  };
})();
