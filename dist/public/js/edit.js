'use strict';

var url = new URL(window.location.href);
var id = url.searchParams.get('id');
var editRequest = document.getElementById('edit');
var apiUrl = '/api/v1/users/requests/' + id;
var token = JSON.parse(localStorage.getItem('token'));

var myHeaders = new Headers({
  Authorization: 'Bearer ' + token
});

fetch(apiUrl, {
  headers: myHeaders
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
//# sourceMappingURL=edit.js.map