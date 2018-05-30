const requests = document.getElementById('adminRequests');
const token = JSON.parse(localStorage.getItem('token'));
const apiUrl = '/api/v1/requests/';

if (token) {
  fetch(apiUrl, {
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  })
    .then(res => res.json())
    .then((data) => {
      let output = '';
      data.result.forEach((request) => {
        output += `
                <tr>
                    <td>${request.requester_name}</td>
                    <td>${request.requester_email}</td>
                    <td><span class="label label-${request.status} tableClear">${request.status}</span></td>
                    <td>${request.date}</td>
                    <td>${request.request}</td>
                    <td>
                        <a href="#" onClick=approve(${request.id}); class="btn-sm btn-approve">Approve</a>
                        <a href="#" onClick=disapprove(${request.id}); class="btn-sm btn-delete">Disapprove</a>
                        <a href="#" onClick=resolve(${request.id}); class="btn-sm btn-resolve">Resolve</a>
                    </td>
                </tr>
        `;
      });
      requests.innerHTML = output;
    })
    .catch(error => console.error(error));

  function approve(requestId) {
    const res = confirm('ARE YOU SURE?');
    if (res) {
      fetch(`api/v1/requests/${requestId}/approve`, {
        method: 'PUT',
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
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
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
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
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      })
        .then(resp => resp.json())
        .then((data) => {
          if (data.message !== '') {
            window.location.href = 'admin.html';
          }
        });
    }
  }
} else {
  document.getElementById('alert').innerHTML = `
      <p>
            Oops!! You do not have access to this page!!
      </p>
      `;
}
