const signUp = document.getElementById('signUp');

signUp.addEventListener('submit', (e) => {

  e.preventDefault();
  const apiUrl = '/api/v1/auth/signup';
  const payload = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  };

  let myHeaders = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded',
  });

  fetch(apiUrl, {
    method: 'POST',
    body: `name=${payload.name}&email=${payload.email}&password=${payload.password}`,
    headers: myHeaders,
  })
    .then(res => res.json())
    .then((data) => {
      localStorage.setItem('token', JSON.stringify(data.token));

      const token = JSON.parse(localStorage.getItem('token'));

      if (token) {
        window.location.href = 'user.html';
      } else {
        document.getElementById('alert').innerHTML = 'Authentication failed';
      }
    })
    .catch(error => console.error(`Error: ${error}`));
});
