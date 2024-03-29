const requests = document.getElementById('userRequests');
const apiUrl = '/api/v1/users/requests/';
const url = new URL(window.location.href);
const successMessage = url.searchParams.get('success');
const successType = url.searchParams.get('type');
const successBox = document.getElementById('alert-success');

const userFeedback = (type) => {
  let output = '';
  switch (type) {
  case '1':
    output = 'Successfully updated';
    break;
  case '2':
    output = 'Successfully created a new request';
    break;
  case '3':
    output = 'Request delete was successful';
    break;
  default:
    output = 'Operation was successful';
    break;
  }
  return output;
};

if (successMessage === 'true') {
  successBox.innerHTML = userFeedback(successType);
  successBox.style.display = 'block';
  setTimeout(() => {
    successBox.style.display = 'none';
  }, 3000);
}

const myHeader = new Headers({
  Authorization: `Bearer ${token}`,
});

const displayTable = (apiUrl) => {
  fetch(apiUrl, {
    headers: myHeader,
  })
    .then(res => res.json())
    .then((data) => {
      if (data.errors) {
        errorMessage.innerHTML = `
    <header>
        <a class="brand" href="#">M-Tracker</a>
        <nav class="nav-bar">
            <ul>
                <li><a class="btn btn-default" href="../sign-in.html">Log in</a></li>
            </ul>
        </nav>
    </header>
    <div class="wrapper" style="margin-top: 200px">
        <div class="alert alert-warning" id="403-error">
            <p>
                Oops! Sorry, You cannot access this page at the moment!!
            </p>
        </div>
    </div>
    <footer>
        <p>&copy;2018 VeeqTor</p>
    </footer>
      `;
        document.getElementById('403-error').style.display = 'block';
      } else {
        let output = '';
        if (data.result.length > 0) {
          let count = 0;
          data.result.forEach((request) => {
            output += `
          <tr>
              <td>${(count += 1)}</td>
              <td>${request.requester_name}</td>
              <td class="${requestStatus(request.status)}">
                  <small>${requestStatus(request.status)}</small>
              </td>
              <td>${dateFormat(request.date)}</td>
              <td>
                  <a href="user-view-details.html?id=${request.id}" 
                  class="btn-sm btn-primary" 
                  title="Click to view request"><i class="fa fa-eye"></i>
                  </a>
                  <a href="javascript:void(0)" class="btn-sm btn-delete 
                 ${
  request.status === '1' || request.status === '3' ? 'disabled' : ''
}"
                  onClick='deleteData(${request.id})'
                  title="Click to delete request"><i class="fa fa-trash"></i>
                  </a>
              </td>
          </tr>`;
          });
          requests.innerHTML = output;
        } else {
          output = `
        <div class="alert" style="display: block">
            <p>No requests yet</p>
        </div>`;
          requests.innerHTML = output;
        }
      }
    });
};

function deleteData(requestId) {
  if (confirm('Are you sure?')) {
    fetch(`api/v1/users/requests/${requestId}/delete`, {
      method: 'DELETE',
      headers: myHeader,
    })
      .then(resp => resp.json())
      .then((data) => {
        if (data.message !== '' && data.error === undefined) {
          window.location.href = 'user.html?success=true&type=3';
        }
      });
  }
}

displayTable(apiUrl);

filter.addEventListener('change', () => {
  requestFilter('users/requests/orderBy');
});
