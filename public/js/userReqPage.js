const urlString = window.location.href;
const url = new URL(urlString);
const param = url.searchParams.get('id');
const token = JSON.parse(sessionStorage.getItem('token'));
const apiUrl = `/api/v1/users/requests/${param}`;
const apiUrl2 = '/api/v1/users/requests';
const reqDetails = document.getElementById('user-details');
const reqBtn = document.getElementById('edit-btn');
const alertBox = document.getElementById('alert-box');

const myHeaders = new Headers({
  Authorization: `Bearer ${token.token}`,
});

if (token && token.auth) {
  fetch(apiUrl2, {
    headers: myHeaders,
  })
    .then(res => res.json())
    .then((data) => {
      // console.log(data);
      if (data.error) {
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
      }
    })
    .catch(error => error);

  fetch(apiUrl, {
    headers: myHeaders,
  })
    .then(res => res.json())
    .then((result) => {
      const output = `
                <li><strong>Creator:</strong>&nbsp;${result.result[0].requester_name}</li>
                <li><strong>Email of creator:</strong>&nbsp;${result.result[0].requester_email}</li>
                <li><strong>Date created:</strong>&nbsp;${result.result[0].date}</li>
                <li><strong>Department:</strong>&nbsp;${result.result[0].dept}</li>
                <li><strong>Status:&nbsp;</strong>${result.result[0].status}</li>
                <li>${result.result[0].request}</li>
       
      `;
      const output2 = ` 
                <a href="edit-request.html?id=${result.result[0].id}" class="btn btn-default" title="Edit">Edit</a>
                <a href="user.html" title="Go back" class="btn btn-default">Back</a>
      `;

      reqBtn.innerHTML = output2;
      reqDetails.innerHTML = output;
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

