const cardbox = document.getElementById('cards-box');

const id = localStorage.getItem("writerid");
const myid = localStorage.getItem("id");
const date = localStorage.getItem("date");
const emotion = localStorage.getItem("emotion");
const photo = localStorage.getItem("image");
const text = localStorage.getItem("text");
const postnum = localStorage.getItem('postnum');
const gcount = localStorage.getItem('gcount');

const idItem = document.getElementById("id");
const dateItem = document.getElementById("date");
const imageboxItem = document.getElementById("box");
const emotionItem = document.getElementById("emotion");
const photoItem = document.getElementById("photo");
const textItem = document.getElementById("text");

fetch('/diary', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ postnum: postnum })
})
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            const ccard = document.createElement('div');
            ccard.className = 'commentcard';

            const title = document.createElement('div');
            title.className = 'cards-title';
            ccard.appendChild(title);

            const writerid = document.createElement('p');
            writerid.textContent = item.id;
            title.appendChild(writerid);

            const datetime = document.createElement('p');
            datetime.setAttribute('id', 'cdatetime');
            datetime.textContent = item.datetime.replace(/[^0-9:-]/g, ' ').substring(0, 19);
            title.appendChild(datetime);

            const text = document.createElement('p');
            text.innerHTML = item.text.replace(/\n/g, '<br>');
            ccard.appendChild(text);

            container.appendChild(ccard);
        });
    })
    .catch(error => {
        console.error(error);
    });


idItem.textContent = id;
dateItem.textContent = date.substring(0, 10);
if (photo == "null") {
    imageboxItem.style.display = 'none';
}

switch (parseInt(emotion)) {
    case 1:
        emotionItem.src = '/public/image/1.png';
        break;
    case 2:
        emotionItem.src = '/public/image/2.png';
        break;
    case 3:
        emotionItem.src = '/public/image/3.png';
        break;
    case 4:
        emotionItem.src = '/public/image/4.png';
        break;
    case 5:
        emotionItem.src = '/public/image/5.png';
        break;
    default:
        break;
}

photoItem.src = photo;
textItem.innerHTML = text.replace(/\n/g, '<br>');

// 삭제 버튼을 클릭하면 해당 일기 데이터를 삭제 요청
function deleteDiaryData() {
    console.log('function called');
    const id = localStorage.getItem("id");
    const postnum = localStorage.getItem("postnum");

    if (id && postnum) {
        fetch('/diary/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, postnum })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // 삭제 성공 시, 목록 페이지로 이동
                    // window.location.href = '/diary';
                } else {
                    console.error('Failed to delete diary data.');
                }
            })
            .catch(error => {
                console.error('Error while deleting diary data:', error);
            });
    } else {
        console.error('Diary ID or user ID not found.');
    }
}

const deleteButton = document.getElementById('deleteIcon');
// deleteButton.addEventListener('click', function () {
//     console.log("check");
//     deleteDiaryData();
// });

function openModal() {
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

function remove() {
    document.getElementById("myModal").style.display = "none";
    if (id && postnum) {
        fetch('/diary/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, postnum })
        }).then(response => response.json())
            .then(data => {
                if (data.success) {
                    localStorage.removeItem("writerid");
                    localStorage.removeItem("date");
                    localStorage.removeItem("emotion");
                    localStorage.removeItem("image");
                    localStorage.removeItem("text");
                    localStorage.removeItem("postnum");
                    localStorage.removeItem("gcount");

                    alert("일기가 삭제되었습니다");
                    location.href = '/diary';
                } else {
                    console.error('Failed to delete diary data');
                }
            })
            .catch(error => {
                console.error('Error while deleting diary data:', error);
            });
    } else {
        console.error('Diary ID or user ID not found.');
    }

}

window.addEventListener('popstate', function () {
    localStorage.removeItem("writerid");
    localStorage.removeItem("date");
    localStorage.removeItem("emotion");
    localStorage.removeItem("image");
    localStorage.removeItem("text");
    localStorage.removeItem("postnum");
    localStorage.removeItem("gcount");
})