'use strict';

var requests = document.getElementById('adminRequests');
var token = JSON.parse(sessionStorage.getItem('token'));
var alertBox = document.getElementById('alert-box');
var apiUrl = '/api/v1/requests/';

if (token && token.auth) {
  var approve = function approve(requestId) {
    var res = confirm('ARE YOU SURE?');
    if (res) {
      fetch('api/v1/requests/' + requestId + '/approve', {
        method: 'PUT',
        headers: myHeader
      }).then(function (resp) {
        return resp.json();
      }).then(function (data) {
        if (data.message !== '') {
          window.location.href = 'admin.html';
        }
      });
    }
  };

  var disapprove = function disapprove(requestId) {
    var res = confirm('ARE YOU SURE?');
    if (res) {
      fetch('api/v1/requests/' + requestId + '/disapprove', {
        method: 'PUT',
        headers: myHeader
      }).then(function (resp) {
        return resp.json();
      }).then(function (data) {
        if (data.message !== '') {
          window.location.href = 'admin.html';
        }
      });
    }
  };

  var resolve = function resolve(requestId) {
    var res = confirm('ARE YOU SURE?');
    if (res) {
      fetch('api/v1/requests/' + requestId + '/resolve', {
        method: 'PUT',
        headers: myHeader
      }).then(function (resp) {
        return resp.json();
      }).then(function (data) {
        if (data.message !== '') {
          window.location.href = 'admin.html';
        }
      });
    }
  };

  var myHeader = new Headers({
    Authorization: 'Bearer ' + token.token
  });
  fetch(apiUrl, {
    headers: myHeader
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    var output = '';
    data.result.forEach(function (request) {
      output += '\n                <tr>\n                    <td>' + request.requester_name + '</td>\n                    <td>' + request.requester_email + '</td>\n                    <td><span class="label label-' + request.status + ' tableClear">' + request.status + '</span></td>\n                    <td>' + request.date + '</td>\n                    <td>' + request.request + '</td>\n                    <td>\n                        <a href="#" onClick=approve(' + request.id + '); class="btn-sm btn-approve">Approve</a>\n                        <a href="#" onClick=disapprove(' + request.id + '); class="btn-sm btn-delete">Disapprove</a>\n                        <a href="#" onClick=resolve(' + request.id + '); class="btn-sm btn-resolve">Resolve</a>\n                    </td>\n                </tr>\n        ';
    });
    requests.innerHTML = output;
  }).catch(function (error) {
    alertBox.innerHTML = '\n    <header>\n        <a class="brand" href="#">M-Tracker</a>\n        <nav class="nav-bar">\n            <ul>\n                <li><a class="btn btn-default" href="../sign-in.html">Log in</a></li>\n            </ul>\n        </nav>\n    </header>\n    <div class="wrapper" style="margin-top: 200px">\n        <div class="alert" id="alert-message">\n            <p>\n                Oops! Sorry, Your session has ended, therefore You are not Authorized to view this page, <strong>kindly log in</strong>!!\n                <br>OR<br>\n                You are not an <strong>Admin.</strong>\n            </p>\n        </div>\n    </div>\n    <footer>\n        <p>&copy;2018 VeeqTor</p>\n    </footer>\n      ';
    document.getElementById('alert-message').style.display = 'block';
  });
} else {
  alertBox.innerHTML = '\n    <header>\n        <a class="brand" href="#">M-Tracker</a>\n        <nav class="nav-bar">\n            <ul>\n                <li><a class="btn btn-default" href="../sign-in.html">Log in</a></li>\n            </ul>\n        </nav>\n    </header>\n    <div class="wrapper" style="margin-top: 200px">\n        <div class="alert" id="alert-message">\n            <p>\n                Oops! Sorry, You do not have access to this page!!\n            </p>\n        </div>\n    </div>\n    <footer>\n        <p>&copy;2018 VeeqTor</p>\n    </footer>\n      ';
  document.getElementById('alert-message').style.display = 'block';
}
//# sourceMappingURL=adminPage.js.map