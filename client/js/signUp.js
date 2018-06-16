const signUp = document.getElementById('signUp');
const alertBox = document.getElementById('alert-box');
const token = JSON.parse(localStorage.getItem('token'));
const loginFunc = (e) => {
  if (token) {
    e.preventDefault();
    window.location.href = 'user.html';
  } else {
    signUp.addEventListener('submit', (e) => {
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

