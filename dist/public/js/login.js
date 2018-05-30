'use strict';

var login = document.getElementById('login');

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
    localStorage.setItem('token', JSON.stringify(data.token));

    var token = JSON.parse(localStorage.getItem('token'));

    if (token) {
      window.location.href = 'user.html';
    } else {
      document.getElementById('alert').innerHTML = 'Authentication failed';
    }
  }).catch(function (error) {
    return console.error('Error: ' + error);
  });
});
//# sourceMappingURL=login.js.map