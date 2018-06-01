'use strict';

var token = JSON.parse(sessionStorage.getItem('token'));
var alertBox = document.getElementById('alert-box');
var apiUrl = '/api/v1/users/requests/';
var createRequest = document.getElementById('createRequest');
var messageBox = document.getElementById('alert-warning');

if (token && token.auth) {
  fetch(apiUrl, {
    headers: new Headers({
      Authorization: 'Bearer ' + token.token
    })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.error) {
      alertBox.innerHTML = '\n    <header>\n        <a class="brand" href="#">M-Tracker</a>\n        <nav class="nav-bar">\n            <ul>\n                <li><a class="btn btn-default" href="../sign-in.html">Log in</a></li>\n            </ul>\n        </nav>\n    </header>\n    <div class="wrapper" style="margin-top: 200px">\n        <div class="alert" id="alert-message">\n            <p>\n                Oops! Sorry, Your session has ended, therefore You are not Authorized to view this page, <strong>kindly log in!</strong>\n            </p>\n        </div>\n    </div>\n    <footer>\n        <p>&copy;2018 VeeqTor</p>\n    </footer>\n      ';
      document.getElementById('alert-message').style.display = 'block';
    }
  }).catch(function (error) {
    return error;
  });

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
        Authorization: 'Bearer ' + token.token
      })
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      if (data.error) {
        messageBox.innerHTML = '<p>' + data.error + '</p>';
        messageBox.style.display = 'block';
        setTimeout(function () {
          messageBox.style.display = 'none';
        }, 10000);
      } else if (data.message !== '') {
        window.location.href = 'user.html?success=true&type=2';
      }
    }).catch(function (error) {
      return error;
    });
  });
} else {
  alertBox.innerHTML = '\n    <header>\n        <a class="brand" href="#">M-Tracker</a>\n        <nav class="nav-bar">\n            <ul>\n                <li><a class="btn btn-default" href="../sign-in.html">Log in</a></li>\n            </ul>\n        </nav>\n    </header>\n    <div class="wrapper" style="margin-top: 200px">\n        <div class="alert" id="alert-message">\n            <p>\n                Oops! Sorry, You do not have access to this page!!\n            </p>\n        </div>\n    </div>\n    <footer>\n        <p>&copy;2018 VeeqTor</p>\n    </footer>\n      ';
  document.getElementById('alert-message').style.display = 'block';
}
//# sourceMappingURL=create.js.map