// 현재 날짜 정보 가져오기
let today = new Date();
let currentDay = today.getDate();
let currentMonth = today.getMonth(); // 현재 날짜의 월로 설정
let currentYear = today.getFullYear();

let filteredData = [];

function fetchDiaryDataFromServer() {
    fetch('/diary', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            filteredData = data.map(item => ({
                date: item.date,
                emotion: item.emotion
            }));
            updateCalendar(currentYear, currentMonth);
        })
        .catch(error => {
            console.error(error);
        });
    
}

//감정 데이터를 표시하는 함수
function renderEmotionImage(cell, emotion) {
    const emotionImage = document.createElement('img');
    emotionImage.className = 'emotion-image';
    switch (emotion) {
        case 1:
            emotionImage.src = '/public/image/1.png';
            break;
        case 2:
            emotionImage.src = '/public/image/2.png';
            break;
        case 3:
            emotionImage.src = '/public/image/3.png';
            break;
        case 4:
            emotionImage.src = '/public/image/4.png';
            break;
        case 5:
            emotionImage.src = '/public/image/5.png';
            break;
    }
    // 이미지 크기 조정 (50px * 50px)
    emotionImage.style.width = '50px';
    emotionImage.style.height = '50px';

    // 이미지를 cell의 가운데로 정렬
    emotionImage.style.display = 'block';
    emotionImage.style.margin = 'auto';

    // 이미지를 담을 div 엘리먼트 생성
    const imageBox = document.createElement('div');
    imageBox.className = 'image-box';
    imageBox.appendChild(emotionImage);

    cell.appendChild(emotionImage);
}

const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// 윤년 계산
if (currentYear % 400 == 0 || (currentYear % 100 != 0 && currentYear % 4 == 0)) {
    monthDays[1] = 29;
}

// 달력 월의 첫 날과 마지막 날 구하기
const monthStartDay = new Date(currentYear, currentMonth, 1).getDay();
const monthLastDate = monthDays[currentMonth];

function renderCalendar(year, month) {

    const firstDay = new Date(year, month, 1);
    const monthStartDay = firstDay.getDay();
    const monthLastDate = monthDays[month];

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    //테이블 헤더 (요일 표시)
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const headerRow = document.createElement('tr');
    for (let day of daysOfWeek) {
        const th = document.createElement('th');
        th.textContent = day;
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    //테이블 내용
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

                const today = new Date();
                const currentYear = today.getFullYear();
                const currentMonth = today.getMonth();
                
                if (date === today.getDate() && month === currentMonth && year === currentYear) {
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

        table.appendChild(tbody);

        const calendarElement = document.getElementById('calendar');
        calendarElement.innerHTML = '';
        calendarElement.appendChild(table);

        const cells = document.querySelectorAll('.calendar td');
        cells.forEach(cell => {
            const cellDate = cell.dataset.date;
            const diaryItem = filteredData.find(item => item.date === cellDate);
            if (diaryItem && diaryItem.emotion) {
                renderEmotionImage(cell, diaryItem.emotion);
            }
        });
    }
}

// 이전 달로 이동
function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendar(currentYear, currentMonth);
}

// 다음 달로 이동
function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar(currentYear, currentMonth);
}

// 달력 업데이트
function updateCalendar(year, month) {
    today = new Date(currentYear, currentMonth, currentDay);
    document.getElementById('currentMonth').textContent = `${currentYear}년 ${currentMonth + 1}월`;
    renderCalendar(year, month);
}

// 이전 달, 다음 달 버튼에 이벤트 리스너 추가
document.getElementById('prevBtn').addEventListener('click', prevMonth);
document.getElementById('nextBtn').addEventListener('click', nextMonth);

// 초기 달력 렌더링
updateCalendar(currentYear, currentMonth);
