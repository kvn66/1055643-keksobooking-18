'use strict';

(function () {
  var MAX_VISIBLE_PINS = 5;

  var mapFiltersContainer = document.querySelector('.map__filters-container');

  var filterDefinition = [
    mapFiltersContainer.querySelector('#housing-type'),
    mapFiltersContainer.querySelector('#housing-price'),
    mapFiltersContainer.querySelector('#housing-rooms'),
    mapFiltersContainer.querySelector('#housing-guests'),
    mapFiltersContainer.querySelector('#filter-wifi'),
    mapFiltersContainer.querySelector('#filter-dishwasher'),
    mapFiltersContainer.querySelector('#filter-parking'),
    mapFiltersContainer.querySelector('#filter-washer'),
    mapFiltersContainer.querySelector('#filter-elevator'),
    mapFiltersContainer.querySelector('#filter-conditioner')
  ];

  var onFilterChange = function () {
    window.pin.closeCard();
    window.pin.removePins();
    window.pin.insertPins();
  };

  var initFilter = function () {
    filterDefinition.forEach(function (value) {
      value.addEventListener('change', onFilterChange);
    });
  };

  initFilter();

  var filterHousingType = function (item) {
    var type = filterDefinition[0].value;
    return item.offer.type === type || type === 'any';
  };

  var filterData = function (origData) {
    var data = origData.slice();
    data = data.filter(filterHousingType);
    return data.slice(0, MAX_VISIBLE_PINS);
  };

  window.filter = {
    filterData: filterData
  };
})();
