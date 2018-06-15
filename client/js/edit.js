const url = new URL(window.location.href);
const id = url.searchParams.get('id');
const editRequest = document.getElementById('edit');
const apiUrl = `/api/v1/users/requests/${id}`;
const apiUrl2 = '/api/v1/users/requests/';
const token = JSON.parse(sessionStorage.getItem('token'));
const alertBox = document.getElementById('alert-box');
const messageBox = document.getElementById('alert-warning');

const myHeader = new Headers({
  Authorization: `Bearer ${token.token}`,
});

if (token && token.auth) {
  fetch(apiUrl2, {
    headers: myHeader,
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
                Oops! Sorry, Your session has ended, therefore You are not Authorized to view this page, kindly log in!!
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
    headers: myHeader,
  })
    .then(res => res.json())
    .then((result) => {
      document.getElementById('name').value = result.result[0].requester_name;
      document.getElementById('email').value = result.result[0].requester_email;
      document.getElementById('dept').value = result.result[0].dept;
      document.getElementById('request').value = result.result[0].request;
    });

  editRequest.addEventListener('submit', (e) => {
    e.preventDefault();
    const payload = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      dept: document.getElementById('dept').value,
      request: document.getElementById('request').value,
    };

    fetch(apiUrl, {
      method: 'PUT',
      body: `name=${payload.name}&email=${payload.email}&dept=${payload.dept}&request=${payload.request}`,
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
          window.location.href = 'user.html?success=true&type=1';
        }
      })
      .catch(error => console.error(`Error: ${error}`));
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
