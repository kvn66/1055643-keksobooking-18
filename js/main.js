'use strict';

var ENTER_KEYCODE = 13;
var DATA_ARRAY_COUNT = 8;
var MIN_WIDTH = 0;
var MAX_WIDTH = 1200;
var MIN_HEIGHT = 130;
var MAX_HEIGHT = 630;
var MIN_PRICE = 100;
var MAX_PRICE = 1000;
var MIN_ROOMS = 0;
var MAX_ROOMS = 5;
var MIN_GUESTS = 1;
var MAX_GUESTS = 4;
var HOTEL_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTO_WIDTH = 45;
var PHOTO_HEIGHT = 40;
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var TIMES = ['12:00', '13:00', '14:00'];

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomArray = function (array) {
  var result = [];
  var max = getRandomNumber(1, array.length);
  for (var i = 0; i < max; i++) {
    result.push(array[i]);
  }
  return result;
};

var getRandomItem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var createAuthor = function (index) {
  return {
    avatar: 'img/avatars/user0' + (index + 1) + '.png'
  };
};

var createLocation = function () {
  return {
    x: getRandomNumber(MIN_WIDTH, MAX_WIDTH),
    y: getRandomNumber(MIN_HEIGHT, MAX_HEIGHT)
  };
};

var createOffer = function (index) {
  var address = createLocation();
  return {
    title: 'Объявление ' + (index + 1),
    address: address.x + ', ' + address.y,
    price: getRandomNumber(MIN_PRICE, MAX_PRICE),
    type: getRandomItem(HOTEL_TYPES),
    rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
    guests: getRandomNumber(MIN_GUESTS, MAX_GUESTS),
    checkin: getRandomItem(TIMES),
    checkout: getRandomItem(TIMES),
    features: getRandomArray(FEATURES),
    description: 'Описание ' + (index + 1),
    photos: getRandomArray(PHOTOS)
  };
};

var createDataArray = function (count) {
  var dataArray = [];
  for (var i = 0; i < count; i++) {
    var dataElement = {
      author: createAuthor(i),
      offer: createOffer(i),
      location: createLocation()
    };
    dataArray.push(dataElement);
  }
  return dataArray;
};

var createPin = function (dataElement) {
  var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style = 'left: ' + dataElement.location.x + 'px; top: ' + dataElement.location.y + 'px;';
  pinElement.querySelector('img').src = dataElement.author.avatar;
  pinElement.querySelector('img').alt = dataElement.offer.title;

  return pinElement;
};

var createPins = function (dataArray) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < dataArray.length; i++) {
    fragment.appendChild(createPin(dataArray[i]));
  }
  return fragment;
};

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
var address = document.querySelector('#address');

var initPage = function () {
  address.value = mapPin.style.left + ', ' + mapPin.style.top;
};

initPage();

var activatePage = function () {
  var dataArray = createDataArray(DATA_ARRAY_COUNT);
  insertPins(dataArray);
  insertCard(dataArray);
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  document.querySelector('.map__filters').classList.remove('ad-form--disabled');
};

mapPin.addEventListener('mousedown', function () {
  activatePage();
});

mapPin.addEventListener('keydown', function (evt) {
  if (evt.which === ENTER_KEYCODE) {
    activatePage();
  }
});

