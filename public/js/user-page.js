const requests = document.getElementById('userRequests');
const token = JSON.parse(localStorage.getItem('token'));
const apiUrl = '/api/v1/users/requests/';
const createRequest = document.getElementById('createRequest');


if (token) {
  fetch(apiUrl, {
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  })
    .then(res => res.json())
    .then((data) => {
      // console.log(data.result);
      let requestss = '';
      data.result.forEach((request) => {
        requestss += `
         <li>
              <a href='user-view-details.html?id=${request.id}' title="Click to view details">
                  <p>${request.request}</p>
                  <span class="request-date">${request.date}</span>
                  <span class="label label-${request.status}">${request.status}</span>
              </a>
          </li>
        `;
      });
      requests.innerHTML = requestss;
    })
    .catch(error => console.error(error));

  createRequest.addEventListener('submit', (e) => {
    e.preventDefault();
    const apiUrl2 = '/api/v1/users/requests/';
    const payload = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      dept: document.getElementById('dept').value,
      request: document.getElementById('request').value,
    };

    fetch(apiUrl2, {
      method: 'POST',
      body: `name=${payload.name}&email=${payload.email}&dept=${payload.dept}&request=${payload.request}`,
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      }),
    })
      .then(res => res.json())
      .then((data) => {
        if (data.message !== ''){
          createRequest.reset();
          console.log(data.message);
        }
      })
      .catch(error => console.error(`Error: ${error}`));
  });


} else {
  document.getElementById('alert').innerHTML = `
      <p>
            Oops!! You do not have access to this page!!
      </p>
      `;
}
