const logout = document.getElementById('logout');

logout.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.removeItem('token');
  localStorage.removeItem('auth');
  window.location.href = 'index.html';
});
