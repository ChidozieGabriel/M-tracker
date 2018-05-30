'use strict';

var urlString = window.location.href;
var url = new URL(urlString);
var param = url.searchParams.get('id');
var token = JSON.parse(localStorage.getItem('token'));
var apiUrl = '/api/v1/users/requests/' + param;
var reqDetails = document.getElementById('user-details');
var reqBtn = document.getElementById('edit-btn');

var myHeaders = new Headers({
  Authorization: 'Bearer ' + token
});

if (token) {
  fetch(apiUrl, {
    headers: myHeaders
  }).then(function (res) {
    return res.json();
  }).then(function (result) {
    var output = '\n                <li><strong>Creator:</strong>&nbsp;' + result.result[0].requester_name + '</li>\n                <li><strong>Email of creator:</strong>&nbsp;' + result.result[0].requester_email + '</li>\n                <li><strong>Date created:</strong>&nbsp;' + result.result[0].date + '</li>\n                <li><strong>Department:</strong>&nbsp;' + result.result[0].dept + '</li>\n                <li><strong>Status:&nbsp;</strong>' + result.result[0].status + '</li>\n                <li>' + result.result[0].request + '</li>\n       \n      ';
    var output2 = ' \n                <a href="edit-request.html?id=' + result.result[0].id + '" class="btn btn-default" title="Edit">Edit</a>\n                <a href="user.html" title="Go back" class="btn btn-default">Back</a>\n      ';

    reqBtn.innerHTML = output2;
    reqDetails.innerHTML = output;
  });
} else {
  document.getElementById('alert').innerHTML = '\n      <p>\n            Oops!! You do not have access to this page!!\n      </p>\n      ';
}
//# sourceMappingURL=userReqPage.js.map