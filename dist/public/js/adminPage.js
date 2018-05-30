'use strict';

var requests = document.getElementById('adminRequests');
var token = JSON.parse(localStorage.getItem('token'));
var apiUrl = '/api/v1/requests/';

if (token) {
  var approve = function approve(requestId) {
    var res = confirm('ARE YOU SURE?');
    if (res) {
      fetch('api/v1/requests/' + requestId + '/approve', {
        method: 'PUT',
        headers: new Headers({
          Authorization: 'Bearer ' + token
        })
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
        headers: new Headers({
          Authorization: 'Bearer ' + token
        })
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
        headers: new Headers({
          Authorization: 'Bearer ' + token
        })
      }).then(function (resp) {
        return resp.json();
      }).then(function (data) {
        if (data.message !== '') {
          window.location.href = 'admin.html';
        }
      });
    }
  };

  fetch(apiUrl, {
    headers: new Headers({
      Authorization: 'Bearer ' + token
    })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    var output = '';
    data.result.forEach(function (request) {
      output += '\n                <tr>\n                    <td>' + request.requester_name + '</td>\n                    <td>' + request.requester_email + '</td>\n                    <td><span class="label label-' + request.status + ' tableClear">' + request.status + '</span></td>\n                    <td>' + request.date + '</td>\n                    <td>' + request.request + '</td>\n                    <td>\n                        <a href="#" onClick=approve(' + request.id + '); class="btn-sm btn-approve">Approve</a>\n                        <a href="#" onClick=disapprove(' + request.id + '); class="btn-sm btn-delete">Disapprove</a>\n                        <a href="#" onClick=resolve(' + request.id + '); class="btn-sm btn-resolve">Resolve</a>\n                    </td>\n                </tr>\n        ';
    });
    requests.innerHTML = output;
  }).catch(function (error) {
    return console.error(error);
  });
} else {
  document.getElementById('alert').innerHTML = '\n      <p>\n            Oops!! You do not have access to this page!!\n      </p>\n      ';
}
//# sourceMappingURL=adminPage.js.map