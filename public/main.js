// 현재 날짜 정보 가져오기
let today = new Date();
let currentDay = today.getDate();
let currentMonth = today.getMonth(); // 현재 날짜의 월로 설정
let currentYear = today.getFullYear();

const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// 윤년 계산
if (currentYear % 400 == 0 || (currentYear % 100 != 0 && currentYear % 4 == 0)) {
    monthDays[1] = 29;
}

// 달력 월의 첫 날과 마지막 날 구하기
const monthStartDay = new Date(currentYear, currentMonth, 1).getDay();
const monthLastDate = monthDays[currentMonth];

// 달력 만들기
function renderCalendar() {
    // 달력 테이블 생성
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // 테이블 헤더 (요일 표시)
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const headerRow = document.createElement('tr');
    for (let day of daysOfWeek) {
        const th = document.createElement('th');
        th.textContent = day;
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // 테이블 내용 (날짜 표시)
    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < monthStartDay) {
                const cell = document.createElement('td');
                row.appendChild(cell);
            } else if (date > monthLastDate) {
                break;
            } else {
                const cell = document.createElement('td');
                cell.textContent = date;
                row.appendChild(cell);

                if (
                    date === today.getDate() &&
                    currentMonth === today.getMonth() &&
                    currentYear === today.getFullYear()
                ) {
                    cell.classList.add('today');
                }

                cell.addEventListener('click', () => {
                    const selectedCell = document.querySelector('.selected');
                    if (selectedCell) {
                        selectedCell.classList.remove('selected');
                    }
                    cell.classList.add('selected');
                });

                date++;
            }
        }

        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    const calendarElement = document.getElementById('calendar');
    calendarElement.innerHTML = '';
    calendarElement.appendChild(table);
}

// 이전 달로 이동
function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendar();
}

// 다음 달로 이동
function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar();
}

// 달력 업데이트
function updateCalendar() {
    today = new Date(currentYear, currentMonth, currentDay);
    document.getElementById('currentMonth').textContent = `${currentYear}년 ${currentMonth + 1}월`;
    renderCalendar();
}

// 이전 달, 다음 달 버튼에 이벤트 리스너 추가
document.getElementById('prevBtn').addEventListener('click', prevMonth);
document.getElementById('nextBtn').addEventListener('click', nextMonth);

// 초기 달력 렌더링
updateCalendar();
