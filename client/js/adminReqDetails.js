const urlString = window.location.href;
const url = new URL(urlString);
const param = url.searchParams.get('id');
const token = JSON.parse(localStorage.getItem('token'));
const apiUrl = `/api/v1/requests/admin/${param}`;
const reqDetails = document.getElementById('user-details');
const reqBtn = document.getElementById('admin-btn');
const errorMessage = document.getElementById('error-message');

const myHeaders = new Headers({
  Authorization: `Bearer ${token}`,
});


fetch(apiUrl, {
  headers: myHeaders,
})
  .then(res => res.json())
  .then((result) => {
    if (result.message || result.errors) {
      errorMessage.innerHTML = `
    <header>
        <a class="brand" href="#">M-Tracker</a>
        <nav class="nav-bar">
            <ul>
                <li><a class="btn btn-default" href="../sign-in.html">Log in</a></li>
            </ul>
        </nav>
    </header>
    <div class="wrapper" style="margin-top: 200px">
        <div class="alert alert-warning" id="403-error">
            <p>
                Oops! Sorry, You cannot access this page at the moment!,<br>
                 <strong>Kindly login as an admin</strong>
            </p>
        </div>
    </div>
    <footer>
        <p>&copy;2018 VeeqTor</p>
    </footer>
      `;
      document.getElementById('403-error').style.display = 'block';
    } else {
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
                    <li><a href="javascript:void(0)" 
                        onclick='adminRequestActions(${result.result[0].id},"approve")'
                        class="btn btn-approve ${result.result[0].status === 'resolved' || result.result[0].status === 'approved' ? 'disabled' : ''}"
                        title="Click to approve"><i class="fa fa-thumbs-up"></i> Approve</a>
                     </li>
                    <li><a href="javascript:void(0)" onclick='adminRequestActions(${result.result[0].id}, "resolve")' 
                        class="btn btn-edit ${result.result[0].status === 'disapproved' || result.result[0].status === 'resolved' ? 'disabled' : ''}" 
                        title="Click to resolve"><i class="fa fa-check-square"></i> Resolve</a>
                    </li>
                    <li><a href="javascript:void(0)" 
                    onclick='adminRequestActions(${result.result[0].id}, "disapprove")'
                        class="btn btn-delete ${result.result[0].status === 'resolved' || result.result[0].status === 'approved' ? 'disabled' : ''}" 
                        title="Click to disapprove"><i class="fa fa-thumbs-down"></i> Disapprove</a>
                        </li>
                    <li><a href="../admin.html" class="btn btn-default" 
                        title="Click to go back"><i class="fa fa-arrow-left"></i> Back</a>
                    </li>
      `;
      reqBtn.innerHTML = output2;
      reqDetails.innerHTML = output;
    }
  });

function adminRequestActions(requestId, action) {
  const res = confirm('ARE YOU SURE?');
  if (res) {
    fetch(`api/v1/requests/${requestId}/${action}`, {
      method: 'PUT',
      headers: myHeaders,
    })
      .then(resp => resp.json())
      .then((data) => {
        if (data.message !== '') {
          window.location.reload(true);
        }
      });
  }
}
