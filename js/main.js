'use strict';

var RANDOM_MULTIPLIER = 500;
var DATA_ARRAY_COUNT = 8;
var BODY_WIDTH = 1200;
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

var getMinMaxWidth = function () {
  var clientWidth = window.innerWidth;
  return {
    min: (clientWidth / 2) - (BODY_WIDTH / 2),
    max: (clientWidth / 2) + (BODY_WIDTH / 2)
  };
};

var createAuthor = function (num) {
  return {
    avatar: 'img/avatars/user0' + num.toString() + '.png'
  };
};

var createLocation = function () {
  var minMaxWidth = getMinMaxWidth();
  return {
    x: getRandomNumber(minMaxWidth.min, minMaxWidth.max),
    y: getRandomNumber(MIN_HEIGHT, MAX_HEIGHT)
  };
};

var getRandomIndex = function (array) {
  return (Math.floor(Math.random() * RANDOM_MULTIPLIER)) % array.length;
};

var createOffer = function (num) {
  var address = createLocation();
  return {
    title: 'Заголовок ' + num.toString(),
    address: address.x.toString() + ', ' + address.y.toString(),
    price: getRandomNumber(MIN_PRICE, MAX_PRICE),
    type: HOTEL_TYPES[getRandomIndex(HOTEL_TYPES)],
    rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
    guests: getRandomNumber(MIN_GUESTS, MAX_GUESTS),
    checkin: TIMES[getRandomIndex(TIMES)],
    checkout: TIMES[getRandomIndex(TIMES)],
    features: '',
    description: 'Описание ' + num.toString(),
    photos: ''
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

window.unblockMap = (function () {
  document.querySelector('.map').classList.remove('map--faded');
})();
