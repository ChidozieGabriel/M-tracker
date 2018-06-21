const requests = document.getElementById('adminRequests');

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
                    <td class="${requestStatus(request.status)}">
                    <small>${requestStatus(request.status)}</small>
                    </td>
                    <td>${dateFormat(request.date)}</td>
                    <td>
                        <a href="admin-view-details.html?id=${request.id}" 
                        class="btn-sm btn-primary">View</a>
                    </td>
                </tr>
        `;
        });
        requests.innerHTML = output;
      }
    });
};

displayTable('/api/v1/requests/');

filter.addEventListener('change', () => { requestFilter('requests'); });
