const toggleBtn = document.querySelector(".navbar__toggleBtn");
const menu = document.querySelector(".navbar__menu");
const icons = document.querySelector(".navbar__icons");

// JavaScript 파일 (예: navbar.js)

// navbar 요소 선택
const navbar = document.querySelector('.navbar');

// navbar logo 내용 설정
const navbarLogo = navbar.querySelector('.navbar__logo');
navbarLogo.innerHTML = `
    <i class="fab fa-reddit"></i>
    <a href="">사이트제목</a>
`;

// navbar 메뉴 목록 설정
const navbarMenu = navbar.querySelector('.navbar__menu');
navbarMenu.innerHTML = `
    <li><a href="">Home</a></li>
    <li><a href="">Dashboard</a></li>
    <li><a href="">Diary</a></li>
    <li><a href="meditation">Meditation</a></li>
`;

// navbar 아이콘 목록 설정
const navbarIcons = navbar.querySelector('.navbar__icons');
navbarIcons.innerHTML = `
    <li><i class="fab fa-twitter"></i></li>
    <li><i class="fab fa-facebook"></i></li>
`;

// navbar 토글 버튼 설정
const navbarToggleBtn = navbar.querySelector('.navbar__toggleBtn');
navbarToggleBtn.innerHTML = `<i class="fas fa-bars"></i>`;

// ... 추가적인 JavaScript 로직


toggleBtn.addEventListener("click", () => {
    menu.classList.toggle('active');
    icons.classList.toggle('active');
})