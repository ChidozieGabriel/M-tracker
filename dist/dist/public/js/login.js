'use strict';

var login = document.getElementById('login');
var alertBox = document.getElementById('alert-box');

login.addEventListener('submit', function (e) {
  e.preventDefault();
  var url = '/api/v1/auth/login';
  var payload = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  };
  var myHeaders = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded'
  });
  fetch(url, {
    method: 'POST',
    body: 'email=' + payload.email + '&password=' + payload.password,
    headers: myHeaders
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.error) {
      alertBox.style.display = 'block';
      alertBox.innerHTML = '<p> ' + data.error + ' </p>';
    }
    if (data.auth) {
      sessionStorage.setItem('token', JSON.stringify(data));
      window.location.href = 'user.html';
    }
  }).catch(function (error) {
    return console.error('Error: ' + error);
  });
});
//# sourceMappingURL=login.js.map
//# sourceMappingURL=login.js.map