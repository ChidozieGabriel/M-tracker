const urlString = window.location.href;
const url = new URL(urlString);
const param = url.searchParams.get('id');
const token = JSON.parse(localStorage.getItem('token'));
const apiUrl = `/api/v1/requests/admin/${param}`;
const reqDetails = document.getElementById('user-details');
const reqBtn = document.getElementById('admin-btn');
const alertBox = document.getElementById('alert-box');

const myHeaders = new Headers({
  Authorization: `Bearer ${token.token}`,
});


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
                    <li><a href="javascript:void(0)" onclick='approve(${result.result[0].id})'
                        class="btn btn-approve ${result.result[0].status === 'resolved' || result.result[0].status === 'approved' ? 'disabled' : ''}"
                        title="Click to approve"><i class="fa fa-thumbs-up"></i> Approve</a>
                     </li>
                    <li><a href="javascript:void(0)" onclick='resolve(${result.result[0].id})' 
                        class="btn btn-edit ${result.result[0].status === 'disapproved' || result.result[0].status === 'resolved' ? 'disabled' : ''}" 
                        title="Click to resolve"><i class="fa fa-check-square"></i> Resolve</a>
                    </li>
                    <li><a href="javascript:void(0)" onclick='disapprove(${result.result[0].id})'
                        class="btn btn-delete ${result.result[0].status === 'resolved' || result.result[0].status === 'approved' ? 'disabled' : ''}" 
                        title="Click to disapprove"><i class="fa fa-thumbs-down"></i> Disapprove</a></li>
                    <li><a href="../admin.html" class="btn btn-default" 
                        title="Click to go back"><i class="fa fa-arrow-left"></i> Back</a>
                    </li>
      `;

    reqBtn.innerHTML = output2;
    reqDetails.innerHTML = output;
  })
  .catch(error => error);


function approve(requestId) {
  const res = confirm('ARE YOU SURE?');
  if (res) {
    fetch(`api/v1/requests/${requestId}/approve`, {
      method: 'PUT',
      headers: myHeaders,
    })
      .then(resp => resp.json())
      .then((data) => {
        if (data.message !== '') {
          window.location.href = 'admin.html';
        }
      });
  }
}

function disapprove(requestId) {
  const res = confirm('ARE YOU SURE?');
  if (res) {
    fetch(`api/v1/requests/${requestId}/disapprove`, {
      method: 'PUT',
      headers: myHeaders,
    })
      .then(resp => resp.json())
      .then((data) => {
        if (data.message !== '') {
          window.location.href = 'admin.html';
        }
      });
  }
}

function resolve(requestId) {
  const res = confirm('ARE YOU SURE?');
  if (res) {
    fetch(`api/v1/requests/${requestId}/resolve`, {
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
