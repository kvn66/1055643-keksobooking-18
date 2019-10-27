'use strict';

window.transferData = (function () {
  return function (url, method, onSuccess, onError, data) {
    data = data || null;

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    method = method.toUpperCase();

    xhr.open(method, url);

    switch (method) {
      case 'GET':
        xhr.send();
        break;
      case 'POST':
        if (data !== null) {
          xhr.send(data);
        } else {
          onError('Нет данных для передачи на сервер.');
        }
        break;
      default:
        onError('В функцию передачи данных поступил неизвестный метод: ' + method);
        break;
    }
  };
})();
