const urlString = window.location.href;
const url = new URL(urlString);
const param = url.searchParams.get('id');
const token = JSON.parse(localStorage.getItem('token'));
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
                      <tr>
                          <td><i>Created&nbsp;by:</i></td>
                          <td>${result.result[0].requester_name}</td>
                      </tr>
                      <tr>
                          <td><i>Email:</i></td>
                          <td>${result.result[0].requester_email}</td>
                      </tr>
                      <tr>
                          <td><i>Date&nbsp;created:</i></td>
                          <td>${result.result[0].date}</td>
                      </tr>
                      <tr>
                          <td><i>Department:</i></td>
                          <td>${result.result[0].dept}</td>
                      </tr>
                      <tr>
                          <td><i>Status:</i></td>
                          <td class="${result.result[0].status}">${result.result[0].status}</td>
                      </tr>
                      <tr>
                          <td><i>Request:</i></td>
                          <td>
                              <p>${result.result[0].request}</p>
                          </td>
                      </tr>`;
      const output2 = ` 
                    <div>
                       <a href="user.html" class="left btn btn-primary" title="Click to go back"><i
                                class="fa fa-arrow-left"></i> Back</a>
                    </div>
                    <div>
                        <a href="edit-request.html?id=${result.result[0].id}" 
                        class="right btn btn-primary ${result.result[0].status === 'resolved' || result.result[0].status === 'approved' ? 'disabled' : ''}"
                           title="Click to edit request"><i
                                class="fa fa-edit"></i> Edit</a>
                    </div>
                    <div class="clearfix"></div>
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

