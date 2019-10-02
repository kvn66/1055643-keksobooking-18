'use strict';

(function () {
  window.load = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    debugger;

    xhr.responseType = 'json';

/*
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
*/

    xhr.timeout = 10000; // 10s

    xhr.open('GET', url);
    xhr.send();

    xhr.onload = function() {
      if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
        alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
      } else { // если всё прошло гладко, выводим результат
        alert(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
      }
    };

    xhr.onprogress = function(event) {
      if (event.lengthComputable) {
        alert(`Получено ${event.loaded} из ${event.total} байт`);
      } else {
        alert(`Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
      }

    };

    xhr.onerror = function() {
      alert("Запрос не удался");
    };
  };
})();
