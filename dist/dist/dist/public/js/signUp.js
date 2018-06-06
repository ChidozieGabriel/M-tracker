'use strict';

var signUp = document.getElementById('signUp');
var alertBox = document.getElementById('alert-box');

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
    if (data.error) {
      alertBox.style.display = 'block';
      alertBox.innerHTML = '<p> ' + data.error + ' </p>';
    }
    if (data.auth) {
      // console.log(data);
      sessionStorage.setItem('token', JSON.stringify(data));
      window.location.href = 'user.html';
    }
  }).catch(function (error) {
    return console.error('Error: ' + error);
  });
});
//# sourceMappingURL=signUp.js.map
//# sourceMappingURL=signUp.js.map
//# sourceMappingURL=signUp.js.map