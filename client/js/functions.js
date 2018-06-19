const auth = JSON.parse(localStorage.getItem('auth'));
const errorMessage = document.getElementById('error-message');

let tokenExp = '';
if (auth) {
  tokenExp = (auth.exp) * 1000;
}

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

const saveToken = (auth, token) => {
  localStorage.setItem('token', JSON.stringify(token));
  localStorage.setItem('auth', JSON.stringify(auth));
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
  if (typeof data.errors === 'object') {
    if (data.errors.dept) {
      deptError.innerHTML = data.errors.dept;
      deptError.style.display = 'block';
    } else if (data.errors.request) {
      requestError.innerHTML = data.errors.request;
      requestError.style.display = 'block';
    }
  }
};

