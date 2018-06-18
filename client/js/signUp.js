const signUp = document.getElementById('signUp');
const alertBox = document.getElementById('alert-box');
const name = document.getElementById('name');
const nameError = document.getElementById('error-name');
const email = document.getElementById('email');
const emailError = document.getElementById('error-email');
const password = document.getElementById('password');
const passwordError = document.getElementById('error-password');


const userSignUp = (e) => {
  e.preventDefault();
  const apiUrl = '/api/v1/auth/signup';
  const payload = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  };
  const myHeaders = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded',
  });
  fetch(apiUrl, {
    method: 'POST',
    body: `name=${payload.name}&email=${payload.email}&password=${payload.password}`,
    headers: myHeaders,
  })
    .then(res => res.json())
    .then((data) => {
      console.log(data.errors);
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
        } else if (data.errors.name) {
          nameError.innerHTML = data.errors.name;
          nameError.style.display = 'block';
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
signUp.addEventListener('submit', userSignUp);
name.addEventListener('focus', () => { nameError.style.display = 'none'; });
email.addEventListener('focus', () => { emailError.style.display = 'none'; });
password.addEventListener('focus', () => { passwordError.style.display = 'none'; });
