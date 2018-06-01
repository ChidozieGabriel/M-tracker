'use strict';

var requests = document.getElementById('userRequests');
var token = JSON.parse(localStorage.getItem('token'));
var apiUrl = '/api/v1/users/requests/';

if (token) {
  var deleteData = function deleteData(requestId) {
    var res = confirm('ARE YOU SURE?');
    if (res) {
      fetch('api/v1/users/requests/' + requestId + '/delete', {
        method: 'DELETE',
        headers: new Headers({
          Authorization: 'Bearer ' + token
        })
      }).then(function (resp) {
        return resp.json();
      }).then(function (data) {
        if (data.message !== '') {
          window.location.href = 'user.html';
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
    var count = 0;
    var output = '';
    data.result.forEach(function (request) {
      output += '\n                <tr>\n                    <td>' + (count += 1) + '</td>\n                    <td>' + request.requester_name + '</td>\n                    <td>' + request.requester_email + '</td>\n                    <td><span class="label label-' + request.status + ' tableClear">' + request.status + '</span></td>\n                    <td>' + request.date + '</td>\n                    <td>\n                        <a href="user-view-details.html?id=' + request.id + '" class="btn-sm btn-primary">View</a>\n                        <a href="edit-request.html?id=' + request.id + '" class="btn-sm btn-edit">Edit</a>\n                        <a href="javascript:void(0)" onClick=deleteData(' + request.id + '); class="btn-sm btn-delete">Delete</a>\n                    </td>\n                </tr>\n        ';
    });
    requests.innerHTML = output;
  }).catch(function (error) {
    return console.error(error);
  });
} else {
  document.getElementById('alert').innerHTML = '\n      <p>\n            Oops!! You do not have access to this page!!\n      </p>\n      ';
}
//# sourceMappingURL=userPage.js.map
