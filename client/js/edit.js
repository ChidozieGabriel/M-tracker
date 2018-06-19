const url = new URL(window.location.href);
const id = url.searchParams.get('id');
const editRequest = document.getElementById('edit');
const apiUrl = `/api/v1/users/requests/${id}`;
const token = JSON.parse(localStorage.getItem('token'));
const editBtn = document.getElementById('edit-btn');
const dept = document.getElementById('dept');
const deptError = document.getElementById('error-dept');
const request = document.getElementById('request');
const requestError = document.getElementById('error-request');

const userRequestDetails = (result) => {
  let output = '';
  document.getElementById('dept').value = result.result[0].dept;
  document.getElementById('request').value = result.result[0].request;
  output += `<a class="left btn btn-default" 
                  href="user-view-details.html?id=${result.result[0].id}">
                  <i class="fa fa-arrow-left"></i> Back
               </a>
               <button type="submit" class="right btn btn-default" name="submit">
                  <i class="fa fa-edit"></i> Edit
                </button>`;
  editBtn.innerHTML = output;
};

const editUserRequest = (e) => {
  e.preventDefault();
  const editPayload = {
    dept: document.getElementById('dept').value,
    request: document.getElementById('request').value,
  };
  const options = {
    method: 'PUT',
    body: `dept=${editPayload.dept}&request=${editPayload.request}`,
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`,
    }),
  };
  fetch(apiUrl, options)
    .then(res => res.json())
    .then((data) => {
      if (data.errors) {
        requestFormErrorHandling(data);
      } else if (data.message !== '') {
        window.location.href = `user-view-details.html?id=${id}&success=true&type=1`;
      }
    });
};

const myHeader = new Headers({
  Authorization: `Bearer ${token}`,
});

fetch(apiUrl, { headers: myHeader })
  .then(res => res.json())
  .then((result) => {
    if (result.errors) {
      return userAuthError();
    }
    userRequestDetails(result);
    editRequest.addEventListener('submit', editUserRequest);
  });

request.addEventListener('focus', () => { requestError.style.display = 'none'; });

dept.addEventListener('focus', () => { deptError.style.display = 'none'; });
