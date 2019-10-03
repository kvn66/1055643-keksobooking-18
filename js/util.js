'use strict';

(function () {
  var data = null;
  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');

  window.util = {
    data: data,
    map: map,
    mapFiltersContainer: mapFiltersContainer
  };
})();
