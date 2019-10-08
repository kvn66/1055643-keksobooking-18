'use strict';

(function () {
  window.uploadData = function (data, onSuccessUploadData, onErrorUploadData) {
    var URL = 'https://js.dump.academy/keksobooking';
    window.transferData(URL, 'POST', onSuccessUploadData, onErrorUploadData, data);
  };
})();
