const requests = document.getElementById('adminRequests');
const token = JSON.parse(localStorage.getItem('token'));
const errorMessage = document.getElementById('error-message');
const filter = document.getElementById('filter');

const displayTable = (apiUrl) => {
  const myHeader = new Headers({
    Authorization: `Bearer ${token}`,
  });
  fetch(apiUrl, {
    headers: myHeader,
  })
    .then(res => res.json())
    .then((data) => {
      if (data.message || data.errors) {
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
                Oops! Sorry, You cannot access this page at the moment!,<br>
                 <strong>Kindly login as an admin</strong>
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
      }
    });
};

const requestFilter = () => {
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
};

displayTable('/api/v1/requests/');

filter.addEventListener('change', requestFilter);
