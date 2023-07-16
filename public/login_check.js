// 사용자 로그인 상태에 따라 네비게이션 바 아이콘을 변경하는 함수

function updateNavbarIcons() {
  const id = localStorage.getItem("id");
  const value = localStorage.getItem("login");
  const login = JSON.parse(value);

  var navbarIcons = document.querySelector('.navbar__icons');
  // 로그인된 경우
  if (login) {
    navbarIcons.innerHTML = `
      <li><a href="profile"><i class="fa-solid fa-user" style="color: #000000;"></i> ${id}님</a></li>
      <li><a class="logout">Log out</a></li>
    `;
  }
  // 로그인되지 않은 경우
  else {
    navbarIcons.innerHTML = `
      <li><a href="login">Log in</a></li>
      <li><a href="signup">Sign up</a></li>
    `;
  }
}

document.addEventListener('click', function (event) {
  if (event.target.matches('.logout')) {
    localStorage.clear();
    localStorage.setItem("login", false);
    window.location.href = 'main';
    updateNavbarIcons();
  }
});

