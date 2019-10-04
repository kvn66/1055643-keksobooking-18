'use strict';

(function () {
  var data = null;
  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');

  var createErrorPopup = function (message) {
    var similarErrorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
    var errorElement = similarErrorTemplate.cloneNode(true);

    errorElement.querySelector('.error__message').textContent = message;

    return errorElement;
  };

  var createSuccessPopup = function () {
    var similarSuccessTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
    var successElement = similarSuccessTemplate.cloneNode(true);
    map.insertBefore(successElement, mapFiltersContainer);
    document.addEventListener('click', function () {
      onclick();
    })
  };


  window.util = {
    data: data,
    map: map,
    mapFiltersContainer: mapFiltersContainer,
    createErrorPopup: createErrorPopup,
    createSuccessPopup: createSuccessPopup
  };
})();
