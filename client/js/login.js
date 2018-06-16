const login = document.getElementById('login');
const alertBox = document.getElementById('alert-box');
const token = JSON.parse(localStorage.getItem('token'));

const loginFunc = (e) => {
  if (token) {
    e.preventDefault();
    window.location.href = 'user.html';
  } else {
    login.addEventListener('submit', (e) => {
      e.preventDefault();
      const url = '/api/v1/auth/login';
      const payload = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
      };
      const myHeaders = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      });
      fetch(url, {
        method: 'POST',
        body: `email=${payload.email}&password=${payload.password}`,
        headers: myHeaders,
      })
        .then(res => res.json())
        .then((data) => {
          if (data.error) {
            alertBox.style.display = 'block';
            alertBox.innerHTML = `${data.error}`;
          }
          if (data.auth) {
            localStorage.setItem('token', JSON.stringify(data));
            window.location.href = 'user.html';
          }
        })
        .catch(error => console.error(`Error: ${error}`));
    });
  }
};

window.addEventListener('load', loginFunc);
