const login = document.getElementById('login');
const alertBox = document.getElementById('alert-box');


login.addEventListener('submit', (e) => {
  e.preventDefault();
  const url = '/api/v1/auth/login';
  const payload = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  };

  let myHeaders = new Headers({
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
        alertBox.innerHTML = `<p> ${data.error} </p>`;
      }
      if (data.auth) {
        sessionStorage.setItem('token', JSON.stringify(data));
        window.location.href = 'admin.html';
      }
    })
    .catch(error => console.error(`Error: ${error}`));
});
