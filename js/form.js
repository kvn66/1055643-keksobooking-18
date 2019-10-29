'use strict';

window.form = (function () {
  var IMAGE_WIDTH = 70;
  var IMAGE_HEIGHT = 70;


  var filterForm = document.querySelector('.map__filters');
  var filterFormSelects = filterForm.querySelectorAll('select');
  var filterFormFieldsets = filterForm.querySelectorAll('fieldset');
  var form = document.querySelector('.ad-form');
  var formFieldsets = form.querySelectorAll('fieldset');
  var address = document.querySelector('#address');
  var formTitle = form.querySelector('#title');
  var formType = form.querySelector('#type');
  var formPrice = form.querySelector('#price');
  var formTimeIn = form.querySelector('#timein');
  var formTimeOut = form.querySelector('#timeout');
  var formResetButton = form.querySelector('.ad-form__reset');
  var formAvatarInput = form.querySelector('#avatar');
  var formAvatarImage = form.querySelector('.ad-form-header__preview').querySelector('img');
  var formAvatarImageDefault = formAvatarImage.src;
  var formImageInput = form.querySelector('#images');
  var formImagesContainer = form.querySelector('.ad-form__photo-container');
  var formImage = formImagesContainer.querySelector('.ad-form__photo');
  var formRoomNumber = form.querySelector('#room_number');
  var formCapacity = form.querySelector('#capacity');

  var deleteImages = function () {
    var images = form.querySelectorAll('.ad-form__photo');
    images.forEach(function (item) {
      var img = item.querySelector('img');
      if (img !== null) {
        item.remove();
      }
    });
  };

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

  var getMinPrice = function (list) {
    var MinPrice = {
      FLAT: 1000,
      BUNGALO: 0,
      HOUSE: 5000,
      PALACE: 10000
    };
    return MinPrice[getListSelected(list).toUpperCase()];
  };

  var changeMinPrice = function () {
    var minPrice = getMinPrice(formType).toString();
    formPrice.min = minPrice;
    formPrice.placeholder = minPrice;
  };

  formType.addEventListener('change', function () {
    changeMinPrice();
  });

  var changeCapacity = function () {
    var selectedRoomNumber = getListSelected(formRoomNumber);

    disableElements(formCapacity.options);

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

  formTimeIn.addEventListener('change', function () {
    formTimeOut.selectedIndex = formTimeIn.selectedIndex;
  });

  formTimeOut.addEventListener('change', function () {
    formTimeIn.selectedIndex = formTimeOut.selectedIndex;
  });

  var disableElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = true;
    }
  };

  var enableElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = false;
    }
  };

  var updateAddress = function (isInit) {
    var pin = window.mainPin.getData(isInit);
    var x = pin.left + pin.shiftX;
    var y = pin.top + pin.shiftY;
    address.value = x + ', ' + y;
  };

  var activateFilterForm = function () {
    filterForm.classList.remove('ad-form--disabled');
    enableElements(filterFormSelects);
    enableElements(filterFormFieldsets);
  };

  var deactivateFilterForm = function () {
    filterForm.classList.add('ad-form--disabled');
    disableElements(filterFormSelects);
    disableElements(filterFormFieldsets);
  };

  var activateForm = function () {
    window.util.map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    enableElements(formFieldsets);
    changeMinPrice();
    changeCapacity();
    validateCapacity();
    updateAddress(false);
  };

  var deactivateForm = function () {
    window.util.map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    disableElements(formFieldsets);
    updateAddress(true);
  };

  var initForm = function () {
    deactivateFilterForm();
    deactivateForm();
    changeMinPrice();
    changeCapacity();
    validateCapacity();
  };

  var resetForm = function () {
    document.forms[0].reset();
    document.forms[1].reset();
    deactivateFilterForm();
    deactivateForm();
    formAvatarImage.src = formAvatarImageDefault;
    deleteImages();
  };

  formResetButton.addEventListener('click', function () {
    window.util.resetPage();
  });

  form.addEventListener('submit', function (evt) {
    window.uploadData(new FormData(form));
    evt.preventDefault();
  });

  var onLoadImage = function (evt) {
    var div = document.createElement('div');
    div.classList.add('ad-form__photo');
    var image = document.createElement('img');
    image.src = evt.target.result;
    image.width = IMAGE_WIDTH;
    image.height = IMAGE_HEIGHT;
    image.alt = '';
    div.appendChild(image);
    formImagesContainer.insertBefore(div, formImage);
  };

  var onLoadAvatarImage = function (evt) {
    formAvatarImage.src = evt.target.result;
  };

  var initLoadImageFromInput = function (input, onLoadFunction) {
    input.addEventListener('change', function () {
      if (input.files[0].type.match('image.*')) {
        var reader = new FileReader();
        reader.addEventListener('load', onLoadFunction);

        reader.readAsDataURL(input.files[0]);
      }
    });
  };

  var initLoadImage = function () {
    initLoadImageFromInput(formImageInput, onLoadImage);
  };

  var initLoadAvatarImage = function () {
    initLoadImageFromInput(formAvatarInput, onLoadAvatarImage);
  };

  initLoadImage();
  initLoadAvatarImage();

  initForm();

  return {
    activateFilter: activateFilterForm,
    activate: activateForm,
    updateAddress: updateAddress,
    reset: resetForm
  };
})();
