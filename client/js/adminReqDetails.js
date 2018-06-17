const urlString = window.location.href;
const url = new URL(urlString);
const param = url.searchParams.get('id');
const token = JSON.parse(localStorage.getItem('token'));
const apiUrl = `/api/v1/requests/${param}`;
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
                    <li><a href="javascript:void(0)" class="btn btn-approve disabled" title="Click to go back"><i class="fa fa-thumbs-up"></i> Approve</a></li>
                    <li><a href="javascript:void(0)" class="btn btn-edit" title="Click to go back"><i class="fa fa-check-square"></i> Resolve</a></li>
                    <li><a href="javascript:void(0)" class="btn btn-delete" title="Click to go back"><i class="fa fa-thumbs-down"></i> Disapprove</a></li>
                    <li><a href="../admin.html" class="btn btn-default" title="Click to go back"><i class="fa fa-arrow-left"></i> Back</a></li>
      `;

    reqBtn.innerHTML = output2;
    reqDetails.innerHTML = output;
  })
  .catch(error => error);

