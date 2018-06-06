'use strict';

var urlString = window.location.href;
var url = new URL(urlString);
var param = url.searchParams.get('id');
var token = JSON.parse(sessionStorage.getItem('token'));
var apiUrl = '/api/v1/users/requests/' + param;
var apiUrl2 = '/api/v1/users/requests';
var reqDetails = document.getElementById('user-details');
var reqBtn = document.getElementById('edit-btn');
var alertBox = document.getElementById('alert-box');

var myHeaders = new Headers({
    Authorization: 'Bearer ' + token.token
});

if (token && token.auth) {
    fetch(apiUrl2, {
        headers: myHeaders
    }).then(function (res) {
        return res.json();
    }).then(function (data) {
        // console.log(data);
        if (data.error) {
            alertBox.innerHTML = '\n    <header>\n        <a class="brand" href="#">M-Tracker</a>\n        <nav class="nav-bar">\n            <ul>\n                <li><a class="btn btn-default" href="../sign-in.html">Log in</a></li>\n            </ul>\n        </nav>\n    </header>\n    <div class="wrapper" style="margin-top: 200px">\n        <div class="alert" id="alert-message">\n            <p>\n                Oops! Sorry, Your session has ended, therefore You are not Authorized to view this page, <strong>kindly log in!</strong>\n            </p>\n        </div>\n    </div>\n    <footer>\n        <p>&copy;2018 VeeqTor</p>\n    </footer>\n      ';
            document.getElementById('alert-message').style.display = 'block';
        }
    }).catch(function (error) {
        return error;
    });

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
    alertBox.innerHTML = '\n    <header>\n        <a class="brand" href="#">M-Tracker</a>\n        <nav class="nav-bar">\n            <ul>\n                <li><a class="btn btn-default" href="../sign-in.html">Log in</a></li>\n            </ul>\n        </nav>\n    </header>\n    <div class="wrapper" style="margin-top: 200px">\n        <div class="alert" id="alert-message">\n            <p>\n                Oops! Sorry, You do not have access to this page!!\n            </p>\n        </div>\n    </div>\n    <footer>\n        <p>&copy;2018 VeeqTor</p>\n    </footer>\n      ';
    document.getElementById('alert-message').style.display = 'block';
}
//# sourceMappingURL=userReqPage.js.map
//# sourceMappingURL=userReqPage.js.map
//# sourceMappingURL=userReqPage.js.map