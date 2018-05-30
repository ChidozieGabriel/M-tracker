'use strict';

var urlString = window.location.href;
var url = new URL(urlString);
var param = url.searchParams.get('id');
var token = JSON.parse(localStorage.getItem('token'));
var apiUrl = '/api/v1/users/requests/' + param;
var reqDetails = document.getElementById('user-details');

var myHeaders = new Headers({
  Authorization: 'Bearer ' + token
});

if (token) {
  fetch(apiUrl, {
    headers: myHeaders
  }).then(function (res) {
    return res.json();
  }).then(function (result) {
    var output = '\n                <li><strong>Creator:</strong>&nbsp;' + result.result[0].requester_name + '</li>\n                <li><strong>Email of creator:</strong>&nbsp;' + result.result[0].requester_email + '</li>\n                <li><strong>Date created:</strong>&nbsp;' + result.result[0].date + '</li>\n                <li><strong>Department:</strong>&nbsp;' + result.result[0].dept + '</li>\n                <li><strong>Status:&nbsp;</strong>' + result.result[0].status + '</li>\n                <li>' + result.result[0].request + '</li>\n      ';
    reqDetails.innerHTML = output;
  });
} else {
  document.getElementById('alert').innerHTML = '\n      <p>\n            Oops!! You do not have access to this page!!\n      </p>\n      ';
}
//# sourceMappingURL=userReqPage.js.map
//# sourceMappingURL=userReqPage.js.map