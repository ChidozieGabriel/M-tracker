const login = document.getElementById('login');

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
      localStorage.setItem('token', JSON.stringify(data.token));

      const token = JSON.parse(localStorage.getItem('token'));

      if (token) {
        window.location.href = 'admin.html';
      } else {
        document.getElementById('alert').innerHTML = 'Authentication failed';
      }
    })
    .catch(error => console.error(`Error: ${error}`));
});
