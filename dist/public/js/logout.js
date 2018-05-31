'use strict';

var logout = document.getElementById('logout');

logout.addEventListener('click', function (e) {
  e.preventDefault();
  sessionStorage.clear();
  window.location.href = 'index.html';
});
//# sourceMappingURL=logout.js.map