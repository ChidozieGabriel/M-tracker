const requests = document.getElementById('userRequests');
const alertBox = document.getElementById('alert-box');
const token = JSON.parse(sessionStorage.getItem('token'));

const url = new URL(window.location.href);
const successMessage = url.searchParams.get('success');
const successType = url.searchParams.get('type');
const messageBox = document.getElementById('alert-success');

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
  setTimeout(() => {
    messageBox.style.display = 'none';
  }, 3000);
}

const myHeader = new Headers({
  Authorization: `Bearer ${token.token}`,
});

const apiUrl = '/api/v1/users/requests/';

if (token && token.auth) {
  fetch(apiUrl, {
    headers: myHeader,
  })
    .then(res => res.json())
    .then((data) => {
      let output = '';
      if (data.result.length > 0) {
        let count = 0;
        data.result.forEach((request) => {
          output += `
                <tr>
                    <td>${count += 1}</td>
                    <td>${request.requester_name}</td>
                    <td>${request.requester_email}</td>
                    <td><span class="label label-${request.status} tableClear">${request.status}</span></td>
                    <td>${request.date}</td>
                    <td>
                        <a href="user-view-details.html?id=${request.id}" class="btn-sm btn-primary">View</a>
                        <a href="edit-request.html?id=${request.id}" class="btn-sm btn-edit">Edit</a>
                        <a href="javascript:void(0)" onClick=deleteData(${request.id}); class="btn-sm btn-delete">Delete</a>
                    </td>
                </tr>
        `;
        });
        requests.innerHTML = output;
      } else {
        output = `
        <div class="alert" style="display: block">
            <p>No requests yet</p>
        </div>`;
        requests.innerHTML = output;
      }
    })
    .catch((error) => {
      alertBox.innerHTML = `
    <header>
        <a class="brand" href="#">M-Tracker</a>
        <nav class="nav-bar">
            <ul>
                <li><a class="btn btn-default" href="../sign-in.html">Log in</a></li>
            </ul>
        </nav>
    </header>
    <div class="wrapper" style="margin-top: 200px">
        <div class="alert" id="alert-message">
            <p>
                Oops! Sorry, Your session has ended, therefore You are not Authorized to view this page, <strong>kindly log in!</strong>
            </p>
        </div>
    </div>
    <footer>
        <p>&copy;2018 VeeqTor</p>
    </footer>
      `;
      document.getElementById('alert-message').style.display = 'block';
    });
} else {
  alertBox.innerHTML = `
    <header>
        <a class="brand" href="#">M-Tracker</a>
        <nav class="nav-bar">
            <ul>
                <li><a class="btn btn-default" href="../sign-in.html">Log in</a></li>
            </ul>
        </nav>
    </header>
    <div class="wrapper" style="margin-top: 200px">
        <div class="alert" id="alert-message">
            <p>
                Oops! Sorry, You do not have access to this page!!
            </p>
        </div>
    </div>
    <footer>
        <p>&copy;2018 VeeqTor</p>
    </footer>
      `;
  document.getElementById('alert-message').style.display = 'block';
}

function deleteData(requestId) {
  const res = confirm('Are you sure?');
  if (res) {
    fetch(`api/v1/users/requests/${requestId}/delete`, {
      method: 'DELETE',
      headers: myHeader,
    })
      .then(resp => resp.json())
      .then((data) => {
        if (data.message !== '') {
          window.location.href = 'user.html?success=true&type=3';
        }
      });
  }
}

