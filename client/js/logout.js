const logout = document.getElementById('logout');

logout.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.removeItem('token');
  window.location.href = 'index.html';
});
