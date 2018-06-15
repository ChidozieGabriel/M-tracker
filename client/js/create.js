const token = JSON.parse(sessionStorage.getItem('token'));
const alertBox = document.getElementById('alert-box');
const apiUrl = '/api/v1/users/requests/';
const createRequest = document.getElementById('createRequest');
const messageBox = document.getElementById('alert-warning');


if (token && token.auth) {
  fetch(apiUrl, {
    headers: new Headers({
      Authorization: `Bearer ${token.token}`,
    }),
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

  createRequest.addEventListener('submit', (e) => {
    e.preventDefault();
    const payload = {
      name: document.getElementById('name').value,
      dept: document.getElementById('dept').value,
      request: document.getElementById('request').value,
    };
    fetch(apiUrl, {
      method: 'POST',
      body: `name=${payload.name}&dept=${payload.dept}&request=${payload.request}`,
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token.token}`,
      }),
    })
      .then(res => res.json())
      .then((data) => {
        if (data.error) {
          messageBox.innerHTML = `<p>${data.error}</p>`;
          messageBox.style.display = 'block';
          setTimeout(() => {
            messageBox.style.display = 'none';
          }, 10000);
        } else if (data.message !== '') {
          window.location.href = 'user.html?success=true&type=2';
        }
      })
      .catch(error => error);
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
