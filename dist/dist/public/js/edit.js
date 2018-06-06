'use strict';

var url = new URL(window.location.href);
var id = url.searchParams.get('id');
var editRequest = document.getElementById('edit');
var apiUrl = '/api/v1/users/requests/' + id;
var apiUrl2 = '/api/v1/users/requests/';
var token = JSON.parse(sessionStorage.getItem('token'));
var alertBox = document.getElementById('alert-box');
var messageBox = document.getElementById('alert-warning');

var myHeader = new Headers({
  Authorization: 'Bearer ' + token.token
});

if (token && token.auth) {
  fetch(apiUrl2, {
    headers: myHeader
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.error) {
      alertBox.innerHTML = '\n    <header>\n        <a class="brand" href="#">M-Tracker</a>\n        <nav class="nav-bar">\n            <ul>\n                <li><a class="btn btn-default" href="../sign-in.html">Log in</a></li>\n            </ul>\n        </nav>\n    </header>\n    <div class="wrapper" style="margin-top: 200px">\n        <div class="alert" id="alert-message">\n            <p>\n                Oops! Sorry, Your session has ended, therefore You are not Authorized to view this page, kindly log in!!\n            </p>\n        </div>\n    </div>\n    <footer>\n        <p>&copy;2018 VeeqTor</p>\n    </footer>\n      ';
      document.getElementById('alert-message').style.display = 'block';
    }
  }).catch(function (error) {
    return error;
  });

  fetch(apiUrl, {
    headers: myHeader
  }).then(function (res) {
    return res.json();
  }).then(function (result) {
    document.getElementById('name').value = result.result[0].requester_name;
    document.getElementById('email').value = result.result[0].requester_email;
    document.getElementById('dept').value = result.result[0].dept;
    document.getElementById('request').value = result.result[0].request;
  });

  editRequest.addEventListener('submit', function (e) {
    e.preventDefault();
    var payload = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      dept: document.getElementById('dept').value,
      request: document.getElementById('request').value
    };

    fetch(apiUrl, {
      method: 'PUT',
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
        window.location.href = 'user.html?success=true&type=1';
      }
    }).catch(function (error) {
      return console.error('Error: ' + error);
    });
  });
} else {
  alertBox.innerHTML = '\n    <header>\n        <a class="brand" href="#">M-Tracker</a>\n        <nav class="nav-bar">\n            <ul>\n                <li><a class="btn btn-default" href="../sign-in.html">Log in</a></li>\n            </ul>\n        </nav>\n    </header>\n    <div class="wrapper" style="margin-top: 200px">\n        <div class="alert" id="alert-message">\n            <p>\n                Oops! Sorry, You do not have access to this page!!\n            </p>\n        </div>\n    </div>\n    <footer>\n        <p>&copy;2018 VeeqTor</p>\n    </footer>\n      ';
  document.getElementById('alert-message').style.display = 'block';
}
//# sourceMappingURL=edit.js.map
//# sourceMappingURL=edit.js.map