'use strict';

var ENTER_KEYCODE = 13;
var DATA_ARRAY_COUNT = 8;
var PHOTO_WIDTH = 45;
var PHOTO_HEIGHT = 40;


var insertPins = function (dataArray) {
  var mapPins = document.querySelector('.map__pins');
  mapPins.appendChild(createPins(dataArray));
};

var createCardFeatures = function (dataElement) {
  var ul = document.createElement('ul');
  ul.classList.add('popup__features');

  for (var i = 0; i < dataElement.offer.features.length; i++) {
    var li = document.createElement('li');
    li.classList.add('popup__feature');
    li.classList.add('popup__feature--' + dataElement.offer.features[i]);
    ul.append(li);
  }

  return ul;
};

var createCardPhotos = function (cardElement, dataElement, width, height) {
  var popupPhotos = cardElement.querySelector('.popup__photos');
  popupPhotos.removeChild(cardElement.querySelector('.popup__photo'));

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < dataElement.offer.photos.length; i++) {
    var img = document.createElement('img');
    img.classList.add('popup__photo');
    img.src = dataElement.offer.photos[i];
    img.width = width;
    img.height = height;
    img.alt = 'Фотография жилья';
    fragment.appendChild(img);
  }
  popupPhotos.appendChild(fragment);
};

var createCard = function (dataArray, index) {
  var typeConverter = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var similarCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var cardElement = similarCardTemplate.cloneNode(true);

  var dataElement = dataArray[index];
  cardElement.querySelector('.popup__title').textContent = dataElement.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = dataElement.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = dataElement.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = typeConverter[dataElement.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = dataElement.offer.rooms + ' комнаты для ' + dataElement.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + dataElement.offer.checkin + ', выезд до ' + dataElement.offer.checkout;
  cardElement.replaceChild(createCardFeatures(dataElement), cardElement.querySelector('.popup__features'));
  cardElement.querySelector('.popup__description').textContent = dataElement.offer.description;
  cardElement.querySelector('.popup__avatar').src = dataElement.author.avatar;
  createCardPhotos(cardElement, dataElement, PHOTO_WIDTH, PHOTO_HEIGHT);

  return cardElement;
};

var insertCard = function (dataArray) {
  var map = document.querySelector('.map');
  map.insertBefore(createCard(dataArray, 0), map.querySelector('.map__filters-container'));
};

var mapPin = document.querySelector('.map__pin--main');
var pinStyles = getComputedStyle(mapPin);
var address = document.querySelector('#address');
var form = document.querySelector('.ad-form');
var formFieldsets = form.querySelectorAll('fieldset');

var calculateAddress = function (pinStyle, isInit) {
  var shiftX = Math.floor(Number(pinStyle.width.slice(0, -2)) / 2);
  var shiftY = Number(pinStyle.height.slice(0, -2));
  if (isInit) {
    shiftY = Math.floor(shiftY / 2);
  }
  var x = Number(pinStyle.left.slice(0, -2)) + shiftX;
  var y = Number(pinStyle.top.slice(0, -2)) + shiftY;
  return x + ', ' + y;
};

var disableFieldsets = function () {
  for (var i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].disabled = true;
  }
};

var enableFieldsets = function () {
  for (var i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].disabled = false;
  }
};

var activatePage = function () {
  var dataArray = createDataArray(DATA_ARRAY_COUNT);
  insertPins(dataArray);
  insertCard(dataArray);
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  document.querySelector('.map__filters').classList.remove('ad-form--disabled');
  enableFieldsets();
  address.value = calculateAddress(pinStyles, false);
};

mapPin.addEventListener('mousedown', function () {
  activatePage();
});

mapPin.addEventListener('keydown', function (evt) {
  if (evt.which === ENTER_KEYCODE) {
    activatePage();
  }
});

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

var getlistSelected = function (list) {
  return list.value;
};

var getMinPrice = function (list) {
  var minPrice = {
    flat: 1000,
    bungalo: 0,
    house: 5000,
    palace: 10000
  };
  return minPrice[getlistSelected(list)];
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
  var selectedRoomNumber = getlistSelected(formRoomNumber);

  for (var i = 0; i < formCapacity.options.length; i++) {
    formCapacity.options[i].disabled = true;
  }

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

var checkCapacity = function () {
  var selectedRoomNumber = getlistSelected(formRoomNumber);
  var selectedCapacity = getlistSelected(formCapacity);

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
  checkCapacity();
});

formCapacity.addEventListener('change', function () {
  checkCapacity();
});


var initPage = function () {
  address.value = calculateAddress(pinStyles, true);
  disableFieldsets();
  formPrice.min = getMinPrice(formType).toString();
  changeCapacity();
  checkCapacity();
};

initPage();

