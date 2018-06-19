const auth = JSON.parse(localStorage.getItem('auth'));
const token = JSON.parse(localStorage.getItem('token'));
const errorMessage = document.getElementById('error-message');

let tokenExp = '';
if (auth) {
  tokenExp = (auth.exp) * 1000;
}

const headers = new Headers({
  'Content-Type': 'application/x-www-form-urlencoded',
  Authorization: `Bearer ${token}`,
});

const fetchOptions = (payload, method) => {
  return {
    method: method,
    body: `dept=${payload.dept}&request=${payload.request}`,
    headers,
  };
};

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
  if (typeof data.errors === 'string') {
    alertBox.style.display = 'block';
    alertBox.innerHTML = `${data.errors}`;
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

const dateFormat = (timestamp) => {
  return new Date(timestamp).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
