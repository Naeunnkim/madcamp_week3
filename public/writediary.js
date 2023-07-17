const id = localStorage.getItem("id");

const dateInput = document.getElementById('dateInput');
const today = new Date().toISOString().split('T')[0];
dateInput.max = today;

//처음 쓰는 글이면 false, 수정이면 true
var isEdit=false;

document.addEventListener('DOMContentLoaded', ()  => {
    const date = localStorage.getItem('date');
    const formdate = date.split('T')[0];
    const emotion = localStorage.getItem('emotion');
    const text = localStorage.getItem('text');
    const image = localStorage.getItem('image');
    localStorage.removeItem('date');
    localStorage.removeItem('emotion');
    localStorage.removeItem('text');
    localStorage.removeItem('image');

    document.getElementById('dateInput').value=formdate;
    document.getElementById('textInput').value=text;

    const emotionInput = document.getElementById('emotionInput');
    emotionInput.value = parseInt(emotion);

    if(date!==null) {
        isEdit=true;
        alert('글 수정 시 이전 사진이 유지 되지 않습니다.\n사진 유지를 원할 시 같은 사진을 다시 업로드 해주세요.');
    }
})

document.getElementById('diaryForm').addEventListener('click', (event) => {
    console.log("hello");
    event.preventDefault();

    var diaryform = document.getElementById('diaryform');
    var emotionInt;

    // console.log(diaryform);
    // switch (diaryform.emotionInput.value) {
    //     case '기분 최고':
    //         emotionInt = 1;
    //         break;
    //     case '평범해':
    //         emotionInt = 2;
    //         break;
    //     case '그저 그래':
    //         emotionInt = 3;
    //         break;
    //     case '우울해':
    //         emotionInt = 4;
    //         break;
    //     case '짜증나':
    //         emotionInt = 5;
    //         break;
    // }



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
                    emotion: diaryform.emotionInput.value,
                    text: diaryform.textInput.value,
                    photo: data.image,
                    board: document.getElementById('postonboard').checked ? 1 : 0,
                    check: isEdit
                }

                fetch('/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data.success);
                        if (data.success) {
                            window.location.href = 'diary';
                            if(data.edit) {
                                alert("수정이 완료되었습니다")
                            }
                        }
                        else {
                            alert("이미 해당 날짜에 작성한 일기가 있습니다");
                        }
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
            emotion: diaryform.emotionInput.value,
            text: diaryform.textInput.value,
            photo: null,
            board: document.getElementById('postonboard').checked ? 1 : 0,
            check: isEdit

        }
        
        fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.success) {
                    window.location.href = 'diary';
                }
                else {
                    alert("이미 해당 날짜에 작성한 일기가 있습니다");
                }
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