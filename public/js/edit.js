const url = new URL(window.location.href);
const id = url.searchParams.get('id');
const editRequest = document.getElementById('edit');
const apiUrl = `/api/v1/users/requests/${id}`;
const token = JSON.parse(localStorage.getItem('token'));


const myHeaders = new Headers({
  Authorization: `Bearer ${token}`,
});

fetch(apiUrl, {
  headers: myHeaders,
})
  .then(res => res.json())
  .then((result) => {
    document.getElementById('name').value = result.result[0].requester_name;
    document.getElementById('email').value = result.result[0].requester_email;
    document.getElementById('dept').value = result.result[0].dept;
    document.getElementById('request').value = result.result[0].request;
  });

editRequest.addEventListener('submit', (e) => {
  e.preventDefault();
  const payload = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    dept: document.getElementById('dept').value,
    request: document.getElementById('request').value,
  };

  fetch(apiUrl, {
    method: 'PUT',
    body: `name=${payload.name}&email=${payload.email}&dept=${payload.dept}&request=${payload.request}`,
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`,
    }),
  })
    .then(res => res.json())
    .then((data) => {
      if (data.message !== '') {
        window.location.href = 'user.html';
      }
    })
    .catch(error => console.error(`Error: ${error}`));
});
