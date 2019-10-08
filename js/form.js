'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var formFieldsets = form.querySelectorAll('fieldset');
  var address = document.querySelector('#address');
  var formTitle = form.querySelector('#title');
  var formType = form.querySelector('#type');
  var formPrice = form.querySelector('#price');
  var formTimeIn = form.querySelector('#timein');
  var formTimeOut = form.querySelector('#timeout');
  var formResetButton = form.querySelector('.ad-form__reset');

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
    var minPrice = getMinPrice(formType).toString();
    formPrice.min = minPrice;
    formPrice.placeholder = minPrice;
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

  var validateTimeInOut = function (listIn, listOut) {
    listOut.selectedIndex = listIn.selectedIndex;
  };

  formTimeIn.addEventListener('change', function () {
    validateTimeInOut(formTimeIn, formTimeOut);
  });

  formTimeOut.addEventListener('change', function () {
    validateTimeInOut(formTimeOut, formTimeIn);
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
    var pin = window.pin.getMainPinData(isInit);
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

  var activatePage = function () {
    if (window.util.data === null) {
      window.loadData();
    }
    activateForm();
  };

  var deactivateForm = function () {
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
    document.querySelector('.map__filters').classList.add('ad-form--disabled');
    disableElement(formFieldsets);
    calculateAddress(true);
  };

  var initForm = function () {
    disableElement(formFieldsets);
    var minPrice = getMinPrice(formType).toString();
    formPrice.min = minPrice;
    formPrice.placeholder = minPrice;
    changeCapacity();
    validateCapacity();
    calculateAddress(true);
  };

  initForm();

  var resetPage = function () {
    document.forms[0].reset();
    document.forms[1].reset();
    deactivateForm();
    window.pin.closeCard();
    window.pin.removePins();
    window.pin.resetMainPinPosition();
    calculateAddress(true);
  };

  formResetButton.addEventListener('click', resetPage);

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

    resetPage();
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

  form.addEventListener('submit', function (evt) {
    window.uploadData(new FormData(form), onSuccessUploadData, onErrorUploadData);
    evt.preventDefault();
  });


  window.form = {
    activatePage: activatePage,
    calculateAddress: calculateAddress
  };
})();
