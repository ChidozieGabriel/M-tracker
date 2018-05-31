'use strict';

var requests = document.getElementById('userRequests');
var alertBox = document.getElementById('alert-box');
var token = JSON.parse(sessionStorage.getItem('token'));

var url = new URL(window.location.href);
var successMessage = url.searchParams.get('success');
var successType = url.searchParams.get('type');
var messageBox = document.getElementById('alert-success');

if (successMessage === 'true') {
  switch (successType) {
    case '1':
      messageBox.innerHTML = '<p>Successfully updated</p>';
      messageBox.style.display = 'block';
      break;
    case '2':
      messageBox.innerHTML = '<p>Successfully created a new request</p>';
      messageBox.style.display = 'block';
      break;
    case '3':
      messageBox.innerHTML = '<p>Request delete was successful</p>';
      messageBox.style.display = 'block';
  }
  setTimeout(function () {
    messageBox.style.display = 'none';
  }, 3000);
}

var myHeader = new Headers({
  Authorization: 'Bearer ' + token.token
});

var apiUrl = '/api/v1/users/requests/';

if (token && token.auth) {
  fetch(apiUrl, {
    headers: myHeader
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    var output = '';
    if (data.result.length > 0) {
      var count = 0;
      data.result.forEach(function (request) {
        output += '\n                <tr>\n                    <td>' + (count += 1) + '</td>\n                    <td>' + request.requester_name + '</td>\n                    <td>' + request.requester_email + '</td>\n                    <td><span class="label label-' + request.status + ' tableClear">' + request.status + '</span></td>\n                    <td>' + request.date + '</td>\n                    <td>\n                        <a href="user-view-details.html?id=' + request.id + '" class="btn-sm btn-primary">View</a>\n                        <a href="edit-request.html?id=' + request.id + '" class="btn-sm btn-edit">Edit</a>\n                        <a href="javascript:void(0)" onClick=deleteData(' + request.id + '); class="btn-sm btn-delete">Delete</a>\n                    </td>\n                </tr>\n        ';
      });
      requests.innerHTML = output;
    } else {
      output = '\n        <div class="alert" style="display: block">\n            <p>No requests yet</p>\n        </div>';
      requests.innerHTML = output;
    }
  }).catch(function (error) {
    alertBox.innerHTML = '\n    <header>\n        <a class="brand" href="#">M-Tracker</a>\n        <nav class="nav-bar">\n            <ul>\n                <li><a class="btn btn-default" href="../sign-in.html">Log in</a></li>\n            </ul>\n        </nav>\n    </header>\n    <div class="wrapper" style="margin-top: 200px">\n        <div class="alert" id="alert-message">\n            <p>\n                Oops! Sorry, Your session has ended, therefore You are not Authorized to view this page, <strong>kindly log in!</strong>\n            </p>\n        </div>\n    </div>\n    <footer>\n        <p>&copy;2018 VeeqTor</p>\n    </footer>\n      ';
    document.getElementById('alert-message').style.display = 'block';
  });
} else {
  alertBox.innerHTML = '\n    <header>\n        <a class="brand" href="#">M-Tracker</a>\n        <nav class="nav-bar">\n            <ul>\n                <li><a class="btn btn-default" href="../sign-in.html">Log in</a></li>\n            </ul>\n        </nav>\n    </header>\n    <div class="wrapper" style="margin-top: 200px">\n        <div class="alert" id="alert-message">\n            <p>\n                Oops! Sorry, You do not have access to this page!!\n            </p>\n        </div>\n    </div>\n    <footer>\n        <p>&copy;2018 VeeqTor</p>\n    </footer>\n      ';
  document.getElementById('alert-message').style.display = 'block';
}

function deleteData(requestId) {
  var res = confirm('Are you sure?');
  if (res) {
    fetch('api/v1/users/requests/' + requestId + '/delete', {
      method: 'DELETE',
      headers: myHeader
    }).then(function (resp) {
      return resp.json();
    }).then(function (data) {
      if (data.message !== '') {
        window.location.href = 'user.html?success=true&type=3r';
      }
    });
  }
}
//# sourceMappingURL=userPage.js.map