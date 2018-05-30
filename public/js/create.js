const token = JSON.parse(localStorage.getItem('token'));
const apiUrl = '/api/v1/users/requests/';
const createRequest = document.getElementById('createRequest');


if (token) {
  createRequest.addEventListener('submit', (e) => {
    e.preventDefault();
    const payload = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      dept: document.getElementById('dept').value,
      request: document.getElementById('request').value,
    };

    fetch(apiUrl, {
      method: 'POST',
      body: `name=${payload.name}&email=${payload.email}&dept=${payload.dept}&request=${payload.request}`,
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      }),
    })
      .then(res => res.json())
      .then((data) => {
        if (data.message !== '') {
          window.location.href = 'user.html';
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
