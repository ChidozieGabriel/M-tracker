const login = document.getElementById('login');
const email = document.getElementById('email');
const emailError = document.getElementById('error-email');
const password = document.getElementById('password');
const passwordError = document.getElementById('error-password');
const alertBox = document.getElementById('alert-box');

const userLogin = (e) => {
  e.preventDefault();
  const endpoint = '/api/v1/auth/login';
  const payload = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  };
  const myHeaders = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded',
  });
  fetch(endpoint, {
    method: 'POST',
    body: `email=${payload.email}&password=${payload.password}`,
    headers: myHeaders,
  })
    .then(res => res.json())
    .then((data) => {
      if (data.errors && typeof data.errors === 'string') {
        alertBox.style.display = 'block';
        alertBox.innerHTML = `${data.errors}`;
      } else if (data.errors && typeof data.errors === 'object') {
        if (data.errors.email) {
          emailError.innerHTML = data.errors.email;
          emailError.style.display = 'block';
        } else if (data.errors.password) {
          passwordError.innerHTML = data.errors.password;
          passwordError.style.display = 'block';
        }
      }
      if (data.auth && data.token) {
        saveToken(data.auth, data.token);
        redirectUser(data.auth.admin);
      }
    });
};

window.onload = () => {
  const now = new Date();
  if (now < tokenExp) {
    redirectUser();
  }
  // expired
};

login.addEventListener('submit', userLogin);
email.addEventListener('focus', () => { emailError.style.display = 'none'; });
password.addEventListener('focus', () => { passwordError.style.display = 'none'; });
