'use strict';

var signUp = document.getElementById('signUp');

signUp.addEventListener('submit', function (e) {

  e.preventDefault();
  var apiUrl = '/api/v1/auth/signup';
  var payload = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  };

  var myHeaders = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded'
  });

  fetch(apiUrl, {
    method: 'POST',
    body: 'name=' + payload.name + '&email=' + payload.email + '&password=' + payload.password,
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
//# sourceMappingURL=signUp.js.map