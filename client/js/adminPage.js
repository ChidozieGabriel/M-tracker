const requests = document.getElementById('adminRequests');
const token = JSON.parse(localStorage.getItem('token'));
const alertBox = document.getElementById('alert-box');
const filter = document.getElementById('filter');

const displayTable = (apiUrl) => {
  if (token && token.auth) {
    const myHeader = new Headers({
      Authorization: `Bearer ${token.token}`,
    });
    fetch(apiUrl, {
      headers: myHeader,
    })
      .then(res => res.json())
      .then((data) => {
        let output = '';
        data.result.forEach((request) => {
          output += `
                <tr>
                    <td>${request.requester_name}</td>
                    <td>${request.requester_email}</td>
                    <td class="${request.status}"><small>${request.status}</small></td>
                    <td>${request.date}</td>
                    <td>
                        <a href="admin-view-details.html?id=${request.id}" class="btn-sm btn-primary">View</a>
                    </td>
                </tr>
        `;
        });
        requests.innerHTML = output;
      })
      .catch((error) => {
        alertBox.innerHTML = `
    <header>
        <a class="brand" href="#">M-Tracker</a>
        <nav class="nav-bar">
            <ul>
                <li><a class="btn btn-default" href="../sign-in.html">Log in</a></li>
            </ul>
        </nav>
    </header>
    <div class="wrapper" style="margin-top: 200px">
        <div class="alert" id="alert-message">
            <p>
                Oops! Sorry, Your session has ended, therefore You are not Authorized to view this page, <strong>kindly log in</strong>!!
                <br>OR<br>
                You are not an <strong>Admin.</strong>
            </p>
        </div>
    </div>
    <footer>
        <p>&copy;2018 VeeqTor</p>
    </footer>
      `;
        document.getElementById('alert-message').style.display = 'block';
      });

    function approve(requestId) {
      const res = confirm('ARE YOU SURE?');
      if (res) {
        fetch(`api/v1/requests/${requestId}/approve`, {
          method: 'PUT',
          headers: myHeader,
        })
          .then(resp => resp.json())
          .then((data) => {
            if (data.message !== '') {
              window.location.href = 'admin.html';
            }
          });
      }
    }

    function disapprove(requestId) {
      const res = confirm('ARE YOU SURE?');
      if (res) {
        fetch(`api/v1/requests/${requestId}/disapprove`, {
          method: 'PUT',
          headers: myHeader,
        })
          .then(resp => resp.json())
          .then((data) => {
            if (data.message !== '') {
              window.location.href = 'admin.html';
            }
          });
      }
    }

    function resolve(requestId) {
      const res = confirm('ARE YOU SURE?');
      if (res) {
        fetch(`api/v1/requests/${requestId}/resolve`, {
          method: 'PUT',
          headers: myHeader,
        })
          .then(resp => resp.json())
          .then((data) => {
            if (data.message !== '') {
              window.location.href = 'admin.html';
            }
          });
      }
    }
  } else {
    alertBox.innerHTML = `
    <header>
        <a class="brand" href="#">M-Tracker</a>
        <nav class="nav-bar">
            <ul>
                <li><a class="btn btn-default" href="../sign-in.html">Log in</a></li>
            </ul>
        </nav>
    </header>
    <div class="wrapper" style="margin-top: 200px">
        <div class="alert" id="alert-message">
            <p>
                Oops! Sorry, You do not have access to this page!!
            </p>
        </div>
    </div>
    <footer>
        <p>&copy;2018 VeeqTor</p>
    </footer>
      `;
    document.getElementById('alert-message').style.display = 'block';
  }
};

displayTable('/api/v1/requests/');

filter.addEventListener('change', () => {
  const selectedValue = filter.options[filter.selectedIndex].value;
  switch (selectedValue) {
    case '1':
      displayTable('/api/v1/requests/approved');
      break;
    case '2':
      displayTable('/api/v1/requests/disapproved');
      break;
    case '3':
      displayTable('/api/v1/requests/resolved');
      break;
    case '4':
      displayTable('/api/v1/requests/pending');
      break;
    default:
      displayTable('/api/v1/requests/');
      break;
  }
});
