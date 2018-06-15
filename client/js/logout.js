const logout = document.getElementById('logout');

logout.addEventListener('click', (e) => {
  e.preventDefault();
  sessionStorage.clear();
  window.location.href = 'index.html';
});
