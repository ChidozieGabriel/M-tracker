const requests = document.getElementById('userRequests');
const token = JSON.parse(localStorage.getItem('token'));
const apiUrl = '/api/v1/users/requests/';

if (token) {
  fetch(apiUrl, {
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  })
    .then(res => res.json())
    .then((data) => {
      let count = 0;
      let output = '';
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
    })
    .catch(error => console.error(error));

  function deleteData(requestId) {
    const res = confirm('ARE YOU SURE?');
    if (res) {
      fetch(`api/v1/users/requests/${requestId}/delete`, {
        method: 'DELETE',
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      })
        .then(resp => resp.json())
        .then((data) => {
          if (data.message !== '') {
            window.location.href = 'user.html';
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
