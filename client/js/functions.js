const redirectUser = (role) => {
  switch (role) {
    case true:
      window.location.href = 'admin.html';
      break;
    case false:
      window.location.href = 'user.html';
      break;
    default:
      window.location.href = 'user.html';
      break;
  }
};
const saveToken = (auth, token) => {
  localStorage.setItem('token', JSON.stringify(token));
  localStorage.setItem('auth', JSON.stringify(auth));
};
const auth = JSON.parse(localStorage.getItem('auth'));
let tokenExp = '';
if (auth) {
  tokenExp = (auth.exp) * 1000;
}
