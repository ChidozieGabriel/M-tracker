const urlString = window.location.href;
const url = new URL(urlString);
const param = url.searchParams.get('id');
const token = JSON.parse(localStorage.getItem('token'));
const apiUrl = `/api/v1/users/requests/${param}`;
const reqDetails = document.getElementById('user-details');

const myHeaders = new Headers({
  Authorization: `Bearer ${token}`,
});

if (token) {
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
      reqDetails.innerHTML = output;
    });
} else {
  document.getElementById('alert').innerHTML = `
      <p>
            Oops!! You do not have access to this page!!
      </p>
      `;
}

