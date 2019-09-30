'use strict';

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

(function () {
  window.createDataArray = function (count) {
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
})();
