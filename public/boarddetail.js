const id = localStorage.getItem("writerid");
const myid = localStorage.getItem("id");
const date = localStorage.getItem("date");
const emotion = localStorage.getItem("emotion");
const photo = localStorage.getItem("image");
const text = localStorage.getItem("text");
const postnum = localStorage.getItem('postnum');
var gcount = localStorage.getItem('gcount' + postnum);
var init_gcount = gcount;

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

var cgood_change = []; //comment 좋아요 상태에 변화가 있는 애들
var init_cgood = []; //이전에 좋아요를 눌렀던 애들 commentnum

if(id!==myid) {
    document.querySelector(".board-edit-icon").style.display = "none";
}

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

fetch('/good/comment', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ postnum: postnum, id: myid })
}).then(response => response.json())
    .then(cmtnum => {
        cmtnum.forEach(ele => {
            init_cgood.push(ele.commentnum);
        });
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

                    const deleteButton = document.createElement('i');
                    deleteButton.className = "fas fa-trash-alt";
                    deleteButton.setAttribute('id', 'trash');
                    ccard.appendChild(deleteButton); 

                    if(myid!==item.id){
                        deleteButton.style.display = 'none';
                    }

                    const text = document.createElement('p');
                    text.innerHTML = item.text.replace(/\n/g, '<br>');
                    ccard.appendChild(text);

                    const good = document.createElement('div');
                    good.className = "good";
                    if (cmtnum.some(row => row.commentnum === item.commentnum)) {
                        good.innerHTML = `<i id ="good-icon${item.commenum}" class="fa-solid fa-thumbs-up fa-lg" style="color: #ff9b65;"></i>
                        <p id="good-count">${item.good}</p>`;
                    }
                    else {
                        good.innerHTML = `<i id ="good-icon${item.commenum}" class="fa-regular fa-thumbs-up fa-lg" style="color: #ff9b65;"></i>
                        <p id="good-count">${item.good}</p>`;
                    }
                    ccard.appendChild(good);
                    container.appendChild(ccard);

                    const good_icon = good.querySelector("i");
                    const good_count = good.querySelector("p");

                    good.addEventListener('click', () => {
                        //db 업데이트용
                        if (cgood_change.includes(item.commentnum)) {
                            cgood_change = cgood_change.filter(row => row !== item.commentnum);
                        }
                        else {
                            cgood_change.push(item.commentnum);
                        }

                        if (good_icon.classList.contains('fa-solid')) {
                            //좋아요 눌러져있는 경우
                            good_icon.classList.remove('fa-solid');
                            good_icon.classList.add('fa-regular');
                            var ccount = good_count.textContent;
                            ccount = (parseInt(ccount) - 1).toString();
                            good_count.textContent = ccount;
                        }
                        else {
                            //안눌러져있는 경우
                            good_icon.classList.remove('fa-regular');
                            good_icon.classList.add('fa-solid');
                            var ccount = good_count.textContent;
                            ccount = (parseInt(ccount) + 1).toString();
                            good_count.textContent = ccount;
                        }

                    });

                    deleteButton.addEventListener('click', function(){
                        localStorage.setItem('com_num', item.commentnum);
                        openModal();
                    });

                });

            })
            .catch(error => {
                console.error(error);
            });
    })
    .catch(error => {
        console.error(error);
    })



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
textItem.innerHTML = text.replace(/\n/g, '<br>');;
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
    if (myid == null) {
        alert("회원가입 후 이용 가능합니다.");
        return false;
    }
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
    if (myid == null) {
        alert("회원가입 후 이용 가능합니다.");
        return false;
    }
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
    if (gcount != init_gcount) {
        if (gcheck == true) {
            //추가
            data = {
                postnum: postnum,
                id: myid,
                insert: true //true면 추가
            }
        }
        else {
            //삭제
            data = {
                postnum: postnum,
                id: myid,
                insert: false //false면 삭제
            }
        }
        localStorage.removeItem('gcount' + postnum);
        localStorage.setItem('gcount' + postnum, gcount);
        fetch('/update_good', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        ).then(response => response.json())
            .then(data1 => {
            })
            .catch(error => {
                console.error(error);
            })
    }
    cgood_change.forEach(item => {
        var data;
        if (init_cgood.includes(item)) {
            //삭제
            data = {
                id: myid,
                commentnum: item,
                insert: false
            }
        }
        else {
            //추가
            data = {
                id: myid,
                commentnum: item,
                insert: true
            }
        }
        fetch('/update_good/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    });

});

function openModal() {
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    localStorage.removeItem('com_num');
    document.getElementById("myModal").style.display = "none";
}

function remove() {
    const com_num = localStorage.getItem('com_num');
    fetch('/wcomment/delete', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({commentnum: com_num})
    }).then(response => response.json())
    .then(data =>{
        if(data.success){
            localStorage.removeItem('com_num');
            console.log("ssssssssss");
            window.location.reload();
        }
    })
}