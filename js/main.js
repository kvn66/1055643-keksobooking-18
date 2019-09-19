'use strict';

var RANDOM_MULTIPLIER = 500;
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
  var max = Math.floor(Math.random() * array.length) + 1;
  for (var i = 0; i < max; i++) {
    result.push(array[i]);
  }
  return result;
};

var getRandomItem = function (array) {
  return array[(Math.floor(Math.random() * RANDOM_MULTIPLIER)) % array.length];
};

var createAuthor = function (num) {
  return {
    avatar: 'img/avatars/user0' + (num + 1).toString() + '.png'
  };
};

var createLocation = function () {
  return {
    x: getRandomNumber(MIN_WIDTH, MAX_WIDTH),
    y: getRandomNumber(MIN_HEIGHT, MAX_HEIGHT)
  };
};

var createOffer = function (num) {
  var address = createLocation();
  return {
    title: 'Объявление ' + (num + 1).toString(),
    address: address.x.toString() + ', ' + address.y.toString(),
    price: getRandomNumber(MIN_PRICE, MAX_PRICE),
    type: getRandomItem(HOTEL_TYPES),
    rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
    guests: getRandomNumber(MIN_GUESTS, MAX_GUESTS),
    checkin: getRandomItem(TIMES),
    checkout: getRandomItem(TIMES),
    features: getRandomArray(FEATURES),
    description: 'Описание ' + (num + 1).toString(),
    photos: getRandomArray(PHOTOS)
  };
};

var createDataArray = function () {
  var dataArray = [];
  for (var i = 0; i < DATA_ARRAY_COUNT; i++) {
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

  pinElement.style = 'left: ' + (dataElement.location.x).toString() + 'px; top: ' + (dataElement.location.y).toString() + 'px;';
  pinElement.querySelector('img').src = dataElement.author.avatar;
  pinElement.querySelector('img').alt = dataElement.offer.title;

  return pinElement;
};

var createPins = function (dataArray) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < DATA_ARRAY_COUNT; i++) {
    fragment.appendChild(createPin(dataArray[i]));
  }
  return fragment;
};

window.insertPins = (function () {
  var mapPins = document.querySelector('.map__pins');
  mapPins.appendChild(createPins(createDataArray()));
})();

window.unblockMap = (function () {
  document.querySelector('.map').classList.remove('map--faded');
})();
