'use strict';

(function () {
  var RADIX = 10;

  var form = document.querySelector('.ad-form');
  var formFieldsets = form.querySelectorAll('fieldset');
  var address = document.querySelector('#address');

  var formTitle = form.querySelector('#title');

  formTitle.addEventListener('invalid', function () {
    if (formTitle.validity.tooShort) {
      formTitle.setCustomValidity('Заголовок должен состоять минимум из 30-и символов');
    } else if (formTitle.validity.tooLong) {
      formTitle.setCustomValidity('Заголовок не должен превышать 100-а символов');
    } else if (formTitle.validity.valueMissing) {
      formTitle.setCustomValidity('Обязательное поле');
    } else {
      formTitle.setCustomValidity('');
    }
  });

  var formType = form.querySelector('#type');
  var formPrice = form.querySelector('#price');

  var getListSelected = function (list) {
    return list.value;
  };

  var getMinPrice = function (list) {
    var minPrice = {
      flat: 1000,
      bungalo: 0,
      house: 5000,
      palace: 10000
    };
    return minPrice[getListSelected(list)];
  };

  var onPriceInvalid = function () {
    if (formPrice.validity.rangeUnderflow) {
      formPrice.setCustomValidity('Цена должна быть не меньше ' + formPrice.min);
    } else if (formPrice.validity.rangeOverflow) {
      formPrice.setCustomValidity('Цена не должна превышать 1 000 000');
    } else if (formPrice.validity.valueMissing) {
      formPrice.setCustomValidity('Обязательное поле');
    } else {
      formPrice.setCustomValidity('');
    }
  };

  formPrice.addEventListener('invalid', onPriceInvalid);

  formType.addEventListener('change', function () {
    formPrice.min = getMinPrice(formType).toString();
    formPrice.removeEventListener('invalid', onPriceInvalid);
    formPrice.addEventListener('invalid', onPriceInvalid);
  });

  var formRoomNumber = form.querySelector('#room_number');
  var formCapacity = form.querySelector('#capacity');

  var changeCapacity = function () {
    var selectedRoomNumber = getListSelected(formRoomNumber);

    disableElement(formCapacity.options);

    switch (selectedRoomNumber) {
      case '3':
        formCapacity.options[0].disabled = false;
        formCapacity.options[1].disabled = false;
        formCapacity.options[2].disabled = false;
        break;
      case '2':
        formCapacity.options[1].disabled = false;
        formCapacity.options[2].disabled = false;
        break;
      case '1':
        formCapacity.options[2].disabled = false;
        break;
      case '100':
        formCapacity.options[3].disabled = false;
        break;
    }
  };

  var validateCapacity = function () {
    var selectedRoomNumber = getListSelected(formRoomNumber);
    var selectedCapacity = getListSelected(formCapacity);

    formCapacity.setCustomValidity('');
    switch (selectedRoomNumber) {
      case '3':
        if (selectedCapacity === '0') {
          formCapacity.setCustomValidity('Такое количество комнат предназначено для 1-3 гостей');
        }
        break;
      case '2':
        if (selectedCapacity === '0' || selectedCapacity === '3') {
          formCapacity.setCustomValidity('Такое количество комнат предназначено для 1-2 гостей');
        }
        break;
      case '1':
        if (selectedCapacity !== '1') {
          formCapacity.setCustomValidity('Такое количество комнат предназначено для 1 гостя');
        }
        break;
      case '100':
        if (selectedCapacity !== '0') {
          formCapacity.setCustomValidity('Такое количество комнат не для гостей');
        }
        break;
    }
  };

  formRoomNumber.addEventListener('change', function () {
    changeCapacity();
    validateCapacity();
  });

  formCapacity.addEventListener('change', function () {
    validateCapacity();
  });

  var disableElement = function (element) {
    for (var i = 0; i < element.length; i++) {
      element[i].disabled = true;
    }
  };

  var enableElement = function (element) {
    for (var i = 0; i < element.length; i++) {
      element[i].disabled = false;
    }
  };

  var calculateAddress = function (isInit) {
    var pin = window.pin.getPinData(isInit);
    var x = pin.left + pin.shiftX;
    var y = pin.top + pin.shiftY;
    address.value = x + ', ' + y;
  };

  var activateForm = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    document.querySelector('.map__filters').classList.remove('ad-form--disabled');
    enableElement(formFieldsets);
    calculateAddress(false);
  };

  var initForm = function () {
    disableElement(formFieldsets);
    formPrice.min = getMinPrice(formType).toString();
    changeCapacity();
    validateCapacity();
    calculateAddress(true);
  };

  initForm();

  window.form = {
    activateForm: activateForm,
    calculateAddress: calculateAddress
  };
})();
