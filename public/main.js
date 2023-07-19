// 현재 날짜 정보 가져오기
let today = new Date();
let currentDay = today.getDate();
let currentMonth = today.getMonth(); // 현재 날짜의 월로 설정
let currentYear = today.getFullYear();
let filteredData = [];

const myid = localStorage.getItem('id');

function fetchDiaryDataFromServer() {
    return fetch('/main/monthly', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: myid, month: currentMonth+1, year: currentYear })
    })
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                filteredData.push({ date: item.date.substring(0, 10), emotion: item.emotion });
            })
            // if(data.success && data.data) {
            //     filteredData = [{date: data.data.date, emotion: data.data.emotion}];
            // }
            // else {
            //     filteredData=[];
            // }
        })
        .catch(error => {
            console.error(error);
        });

}

//감정 데이터를 표시하는 함수
function renderEmotionImage(cell, emotion) {
    // console.log("renderemotionimage called");
    const existingImage = cell.querySelector('.emotion-image');
    if (existingImage && existingImage.parentElement === cell) {
        cell.removeChild(existingImage);
    }

    // 이미 숫자가 있는 경우 숫자를 제거
    if (cell.textContent.trim() !== '') {
        cell.textContent = '';
    }



    //이미지를 담을 div 엘리먼트 생성
    const imageBox = document.createElement('div');
    imageBox.className = 'image-box';

    const emotionImage = new Image();
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

    imageBox.appendChild(emotionImage);

    const prevEmotionImage = cell.querySelector('.emotion-image');
    if (prevEmotionImage) {
        cell.removeChild(prevEmotionImage);
    }

    cell.appendChild(imageBox);
}

const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// 윤년 계산
if (currentYear % 400 == 0 || (currentYear % 100 != 0 && currentYear % 4 == 0)) {
    monthDays[1] = 29;
}

// 달력 월의 첫 날과 마지막 날 구하기
const monthStartDay = new Date(currentYear, currentMonth, 1).getDay();
const monthLastDate = monthDays[currentMonth];

function handleCellClick(cell, date) {
    //이전 선택된 셀에 있던 .selected 클래스를 제거
    const prevSelectedCell = document.querySelector('.selected');
    if (prevSelectedCell) {
        prevSelectedCell.classList.remove('selected');
    }

    //선택된 셀에 .selected 클래스를 추가하여 스타일링
    cell.classList.add('selected');

    //선택한 날짜에 해당하는 감정 데이터를 filteredData에서 찾기
    const selectedDiaryItem = filteredData.find(item => item.date === date);

    //감정 데이터가 존재하는 경우 해당 날짜 셀에 감정 아이콘 표시
    if (selectedDiaryItem && selectedDiaryItem.emotion) {
        renderEmotionImage(cell, selectedDiaryItem.emotion);
    }
}

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
    const fDiaryData = fetchDiaryDataFromServer();
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
                    handleCellClick(cell, cell.dataset.date);
                });

                date++;
            }
        }
        tbody.appendChild(row);
        table.appendChild(tbody);

        const calendarElement = document.getElementById('calendar');
        calendarElement.innerHTML = '';
        calendarElement.appendChild(table);

        // 날짜 셀들을 다시 선택하고, 각 셀에 이미지를 표시합니다.

        
            fDiaryData.then(() => {
                const cells = document.querySelectorAll('.calendar td');
                cells.forEach(cell => {
                    const currentMonthFormatted = (currentMonth + 1).toString().padStart(2, '0');
                    const cellTextFormatted = cell.textContent.padStart(2, '0');
                    const cellDate = currentYear + '-' + currentMonthFormatted + '-' + cellTextFormatted;
                    // console.log(cellDate);
                    const diaryItem = filteredData.find(item => item.date === cellDate);
                    if (diaryItem) {
                        const emotion = diaryItem.emotion;
                        renderEmotionImage(cell, parseInt(emotion));
                    } else {
                        // 감정 데이터가 없는 경우에도 기본 이미지를 표시할 수 있습니다.
                        // console.log("error");
                    }
                });
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
