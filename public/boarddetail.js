const id = localStorage.getItem("writerid");
const myid = localStorage.getItem("id");
const date = localStorage.getItem("date");
const emotion = localStorage.getItem("emotion");
const photo = localStorage.getItem("image");
const text = localStorage.getItem("text");
const postnum = localStorage.getItem('postnum');
var gcount = localStorage.getItem('gcount');
const init_gcount = gcount;

var gcheck = false;

const idItem = document.getElementById("id");
const dateItem = document.getElementById("date");
const imageboxItem = document.getElementById("box");
const emotionItem = document.getElementById("emotion");
const photoItem = document.getElementById("photo");
const textItem = document.getElementById("text");
const giconItem = document.getElementById("good-icon");
const gcountItem = document.getElementById("good-count");

const postItem = document.getElementById("post");
const cmtContainer = document.getElementById("comment");
const container = document.getElementById("comment-container");

fetch('/good', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ postnum: postnum })
}).then(response => response.json())
    .then(data => {
        data.forEach(item => {
            if (myid == item.good_id) {
                gcheck = true;
                if (gcheck) {
                    giconItem.classList.remove('fa-regular');
                    giconItem.classList.add('fa-solid');
                    giconItem.style.color = '#ff9b65';
                }
            }
        })
    })


fetch('/boarddetail', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ postnum: postnum })
}
).then(response => response.json())
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
            text.textContent = item.text;
            ccard.appendChild(text);

            const good = document.createElement('div');
            good.className = "good";
            good.innerHTML = `<i id ="good-icon" class="fa-regular fa-thumbs-up fa-lg" style="color: #ff9b65;"></i>
            <p id="good-count">${item.good}</p>`;
            ccard.appendChild(good);

            container.appendChild(ccard);

        })
            .catch(error => {
                console.error(error);
            });

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
textItem.textContent = text;
gcountItem.textContent = gcount;
cmtContainer.style.height = (postItem.offsetHeight - 40) + "px";
container.style.height = (postItem.offsetHeight - 80) + "px"

const textarea = document.getElementById('put-cmt');

textarea.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
});

const cmtwrite = document.getElementById("write");
cmtwrite.addEventListener('click', function () {
    const cmtText = textarea.value;
    var now = new Date();
    fetch('/wcomment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ postnum: postnum, id: myid, datetime: now.toISOString().replace(/[^0-9:-]/g, ' ').substring(0, 19), text: cmtText })
    }).then(response => response.json())
        .then(data => {
            location.reload();
        })
        .catch(error => {
            console.error(error);
        })
})

giconItem.addEventListener('click', function () {
    //체크 되어 있다면 해제
    if (gcheck == true) {
        giconItem.classList.remove('fa-solid');
        giconItem.classList.add('fa-regular');
        giconItem.style.color = '#ff9b65';
        gcheck = false;
        gcount = (parseInt(gcount) - 1).toString();

    }
    else {
        giconItem.classList.remove('fa-regular');
        giconItem.classList.add('fa-solid');
        giconItem.style.color = '#ff9b65';
        gcheck = true;
        gcount = (parseInt(gcount) + 1).toString();
    }
    gcountItem.textContent = gcount;
})

window.addEventListener('beforeunload', function (event) {
    var data;
    if(gcheck == init_gcount){
        return;
    }
    if(gcheck == true){
        //추가
        data = {
            postnum: postnum,
            id: myid,
            insert: true //true면 추가
        }
    }
    else{
        //삭제
        data = {
            postnum: postnum,
            id: myid,
            insert: false //false면 삭제
        }
    }
    fetch('/update_good', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    ).then(response =>response.json())
    .then(data => {
        
    })
    .catch(error =>{
        console.error(error);
    })
})
