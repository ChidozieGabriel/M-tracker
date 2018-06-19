const token = JSON.parse(localStorage.getItem('token'));
const errorMessage = document.getElementById('error-message');
const apiUrl = '/api/v1/users/requests/';
const createRequest = document.getElementById('createRequest');
const dept = document.getElementById('dept');
const deptError = document.getElementById('error-dept');
const request = document.getElementById('request');
const requestError = document.getElementById('error-request');

const userAuthError = () => {
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
                Oops! Sorry, You cannot access this page at the moment!!
            </p>
        </div>
    </div>
    <footer>
        <p>&copy;2018 VeeqTor</p>
    </footer>
      `;
  document.getElementById('403-error').style.display = 'block';
};

const userCreateRequest = (e) => {
  e.preventDefault();
  const payload = {
    dept: document.getElementById('dept').value,
    request: document.getElementById('request').value,
  };
  const option = {
    method: 'POST',
    body: `dept=${payload.dept}&request=${payload.request}`,
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`,
    }),
  };
  fetch(apiUrl, option)
    .then(res => res.json())
    .then((data) => {
      if (data.errors && typeof data.errors === 'object') {
        if (data.errors.dept) {
          deptError.innerHTML = data.errors.dept;
          deptError.style.display = 'block';
        } else if (data.errors.request) {
          requestError.innerHTML = data.errors.request;
          requestError.style.display = 'block';
        }
      } else if (data.message !== '') {
        window.location.href = 'user.html?success=true&type=2';
      }
    });
};

fetch(apiUrl, {
  headers: new Headers({
    Authorization: `Bearer ${token}`,
  }),
})
  .then((res) => {
    if (res.status === 401) {
      userAuthError();
    }
  })
  .then(() => {
    createRequest.addEventListener('submit', userCreateRequest);
  });

request.addEventListener('focus', () => { requestError.style.display = 'none'; });

dept.addEventListener('focus', () => { deptError.style.display = 'none'; });
