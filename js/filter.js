'use strict';

(function () {
  var MAX_VISIBLE_PINS = 5;
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  var filterDefinition = {
    housingType: mapFiltersContainer.querySelector('#housing-type'),
    housingPrice: mapFiltersContainer.querySelector('#housing-price'),
    housingRooms: mapFiltersContainer.querySelector('#housing-rooms'),
    housingGuests: mapFiltersContainer.querySelector('#housing-guests'),
    filterWifi: mapFiltersContainer.querySelector('#filter-wifi'),
    filterDishwasher: mapFiltersContainer.querySelector('#filter-dishwasher'),
    filterParking: mapFiltersContainer.querySelector('#filter-parking'),
    filterWasher: mapFiltersContainer.querySelector('#filter-washer'),
    filterElevator: mapFiltersContainer.querySelector('#filter-elevator'),
    filterConditioner: mapFiltersContainer.querySelector('#filter-conditioner')
  };

  var filterCondition = {
    housingType: filterDefinition.housingType.value,
    housingPrice: filterDefinition.housingPrice.value,
    housingRooms: filterDefinition.housingRooms.value,
    housingGuests: filterDefinition.housingGuests.value,
    isFilterWifi: filterDefinition.filterWifi.checked,
    isFilterDishwasher: filterDefinition.filterDishwasher.checked,
    isFilterParking: filterDefinition.filterParking.checked,
    isFilterWasher: filterDefinition.filterWasher.checked,
    isFilterElevator: filterDefinition.filterElevator.checked,
    isFilterConditioner: filterDefinition.filterConditioner.checked
  };

  filterDefinition.filterWifi.addEventListener('change', function () {
    alert(this.value);
  });

  var filterData = function (origData) {
    var data = 7;
  };

  window.filter = {
    MAX_VISIBLE_PINS: MAX_VISIBLE_PINS,
    filterCondition: filterCondition
  };
})();
