'use strict';

var token = JSON.parse(localStorage.getItem('token'));
var apiUrl = '/api/v1/users/requests/';
var createRequest = document.getElementById('createRequest');

if (token) {
  createRequest.addEventListener('submit', function (e) {
    e.preventDefault();
    var payload = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      dept: document.getElementById('dept').value,
      request: document.getElementById('request').value
    };

    fetch(apiUrl, {
      method: 'POST',
      body: 'name=' + payload.name + '&email=' + payload.email + '&dept=' + payload.dept + '&request=' + payload.request,
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + token
      })
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      if (data.message !== '') {
        window.location.href = 'user.html';
      }
    }).catch(function (error) {
      return console.error('Error: ' + error);
    });
  });
} else {
  document.getElementById('alert').innerHTML = '\n      <p>\n            Oops!! You do not have access to this page!!\n      </p>\n      ';
}
//# sourceMappingURL=create.js.map