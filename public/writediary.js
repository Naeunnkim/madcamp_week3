const id = localStorage.getItem("id");

const dateInput = document.getElementById('dateInput');
const today = new Date().toISOString().split('T')[0];
dateInput.max = today;

document.getElementById('diaryForm').addEventListener('click', (event) => {
    console.log("hello");
    event.preventDefault();

    var diaryform = document.getElementById('diaryform');
    var emotionInt;

    // console.log(diaryform);
    switch (diaryform.emotionInput.value) {
        case '기분 최고':
            emotionInt = 1;
            break;
        case '평범해':
            emotionInt = 2;
            break;
        case '그저 그래':
            emotionInt = 3;
            break;
        case '우울해':
            emotionInt = 4;
            break;
        case '짜증나':
            emotionInt = 5;
            break;
    }



    const formData = new FormData();
    const imageInput = document.getElementById('imageInput');
    //사진 있을 때
    if (imageInput.files[0] !== undefined) {
        formData.append('image', imageInput.files[0]);

        console.log(formData);

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                var data = {
                    id: id,
                    date: diaryform.dateInput.value,
                    emotion: emotionInt,
                    text: diaryform.textInput.value,
                    photo: data.image,
                    board: document.getElementById('postonboard').checked ? 1 : 0
                }

                fetch('/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then((response) => response.text())
                    .then((data) => {
                        console.log(data);
                        window.location.href = 'diary';
                    })
                    .catch((error) => {
                        console.error('Error sending data:', error);
                    });
            })
            .catch(error => {
                console.error('Error uploading image:', error);
            });
    }
    //사진 없을 때
    else {
        var data = {
            id: id,
            date: diaryform.dateInput.value,
            emotion: emotionInt,
            text: diaryform.textInput.value,
            photo: null,
            board: document.getElementById('postonboard').checked ? 1 : 0

        }
        fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.text())
            .then((data) => {
                console.log(data);
                window.location.href = 'diary';
            })
            .catch((error) => {
                console.error('Error sending data:', error);
            });
    }

});

function goToList() {
    //목록페이지로 이동하는 로직
    window.location.href = 'diary';
}