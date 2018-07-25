const auth = JSON.parse(localStorage.getItem('auth'));
const token = JSON.parse(localStorage.getItem('token'));
const errorMessage = document.getElementById('error-message');
const filter = document.getElementById('filter');

let tokenExp = '';
if (auth) {
  tokenExp = auth.exp * 1000;
}

const headers = new Headers({
  'Content-Type': 'application/x-www-form-urlencoded',
  Authorization: `Bearer ${token}`,
});

const fetchOptions = (payload, method) => ({
  method,
  body: `dept=${payload.dept}&request=${payload.request}`,
  headers,
});

const redirectUser = (role) => {
  switch (role) {
    case true:
      window.location.href = 'admin.html';
      break;
    case false:
      window.location.href = 'user.html';
      break;
    default:
      window.location.href = 'user.html';
      break;
  }
};

const checkAuth = () => {
  const now = new Date();
  if (now < tokenExp) {
    redirectUser();
  }
  // expired
};

const saveToken = (auth, token) => {
  localStorage.setItem('token', JSON.stringify(token));
  localStorage.setItem('auth', JSON.stringify(auth));
};

const saveRedirect = (data) => {
  if (data.auth && data.token) {
    saveToken(data.auth, data.token);
    redirectUser(data.auth.admin);
  }
};

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

const requestFormErrorHandling = (data) => {
  if (data.errors.message) {
    alertBox.style.display = 'block';
    alertBox.innerHTML = `${data.errors.message}`;
  } else if (typeof data.errors === 'object') {
    if (data.errors.email) {
      emailError.innerHTML = data.errors.email;
      emailError.style.display = 'block';
    } else if (data.errors.password) {
      passwordError.innerHTML = data.errors.password;
      passwordError.style.display = 'block';
    } else if (data.errors.dept) {
      deptError.innerHTML = data.errors.dept;
      deptError.style.display = 'block';
    } else if (data.errors.request) {
      requestError.innerHTML = data.errors.request;
      requestError.style.display = 'block';
    } else if (data.errors.name) {
      nameError.innerHTML = data.errors.name;
      nameError.style.display = 'block';
    }
  }
};

const requestStatus = (status) => {
  let requestStat = '';
  switch (status) {
    default:
      requestStat = 'pending';
      break;
    case '1':
      requestStat = 'approved';
      break;
    case '2':
      requestStat = 'disapproved';
      break;
    case '3':
      requestStat = 'resolved';
      break;
  }
  return requestStat;
};

const dateFormat = timestamp =>
  new Date(timestamp).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

const requestTable = result => `
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
                          <td>${dateFormat(result.result[0].date)}</td>
                      </tr>
                      <tr>
                          <td><i>Department:</i></td>
                          <td>${result.result[0].dept}</td>
                      </tr>
                      <tr>
                          <td><i>Status:</i></td>
                          <td class="${requestStatus(result.result[0].status)}">
                            ${requestStatus(result.result[0].status)}
                          </td>
                      </tr>
                      <tr>
                          <td><i>Request:</i></td>
                          <td>
                              <p>${result.result[0].request}</p>
                          </td>
                      </tr>`;

const requestFilter = (url) => {
  const selectedValue = filter.options[filter.selectedIndex].value;

  switch (selectedValue) {
    case '1':
      displayTable(`/api/v1/${url}/approved`);
      break;
    case '2':
      displayTable(`/api/v1/${url}/disapproved`);
      break;
    case '3':
      displayTable(`/api/v1/${url}/resolved`);
      break;
    case '4':
      displayTable(`/api/v1/${url}/pending`);
      break;
  }
};
