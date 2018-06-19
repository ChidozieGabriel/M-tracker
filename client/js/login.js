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
      if (data.errors) {
        return requestFormErrorHandling(data);
      }
      saveRedirect(data);
    });
};

window.onload = () => {
  return checkAuth();
  // expired
};

login.addEventListener('submit', userLogin);
email.addEventListener('focus', () => { emailError.style.display = 'none'; });
password.addEventListener('focus', () => { passwordError.style.display = 'none'; });
