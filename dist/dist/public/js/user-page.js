'use strict';

var requests = document.getElementById('userRequests');
var token = JSON.parse(localStorage.getItem('token'));
var apiUrl = '/api/v1/users/requests/';
var createRequest = document.getElementById('createRequest');

if (token) {
  fetch(apiUrl, {
    headers: new Headers({
      Authorization: 'Bearer ' + token
    })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    // console.log(data.result);
    var requestss = '';
    data.result.forEach(function (request) {
      requestss += '\n         <li>\n              <a href=\'user-view-details.html?id=' + request.id + '\' title="Click to view details">\n                  <p>' + request.request + '</p>\n                  <span class="request-date">' + request.date + '</span>\n                  <span class="label label-' + request.status + '">' + request.status + '</span>\n              </a>\n          </li>\n        ';
    });
    requests.innerHTML = requestss;
  }).catch(function (error) {
    return console.error(error);
  });

  createRequest.addEventListener('submit', function (e) {
    e.preventDefault();
    var apiUrl2 = '/api/v1/users/requests/';
    var payload = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      dept: document.getElementById('dept').value,
      request: document.getElementById('request').value
    };

    fetch(apiUrl2, {
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
        createRequest.reset();
        console.log(data.message);
      }
    }).catch(function (error) {
      return console.error('Error: ' + error);
    });
  });
} else {
  document.getElementById('alert').innerHTML = '\n      <p>\n            Oops!! You do not have access to this page!!\n      </p>\n      ';
}
//# sourceMappingURL=userPage.js.map
//# sourceMappingURL=userPage.js.map
