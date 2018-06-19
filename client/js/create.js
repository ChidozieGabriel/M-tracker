const apiUrl = '/api/v1/users/requests/';
const createRequest = document.getElementById('createRequest');
const dept = document.getElementById('dept');
const deptError = document.getElementById('error-dept');
const request = document.getElementById('request');
const requestError = document.getElementById('error-request');

const userCreateRequest = (e) => {
  e.preventDefault();
  const payload = {
    dept: document.getElementById('dept').value,
    request: document.getElementById('request').value,
  };
  const option = {
    method: 'POST',
    body: `dept=${payload.dept}&request=${payload.request}`,
    headers,
  };
  fetch(apiUrl, option)
    .then(res => res.json())
    .then((data) => {
      if (data.errors) {
        requestFormErrorHandling(data);
      } else if (data.message !== '') {
        window.location.href = 'user.html?success=true&type=2';
      }
    });
};

fetch(apiUrl, { headers })
  .then((res) => {
    if (res.status === 401) {
      userAuthError();
    }
  })
  .then(() => {
    createRequest.addEventListener('submit', userCreateRequest);
  });

request.addEventListener('focus', () => { requestError.style.display = 'none'; });

dept.addEventListener('focus', () => { deptError.style.display = 'none'; });
