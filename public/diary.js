const cardbox = document.getElementById('cards-box');
const id1 = localStorage.getItem("id");

var data = {
    id: id1
}

//윗줄 끝선에 맞춰 정렬
function alignToBaseline() {
    const cardElements = document.getElementsByClassName('card');
    const cardWidth = 400; // 카드의 가로 너비
    const spacing = 20; // 카드 사이의 간격

    const containerWidth = cardbox.offsetWidth;
    const cardsPerRow = Math.floor((containerWidth)/ (cardWidth + spacing));


    for (let i = cardsPerRow; i < cardElements.length; i++) {
        const prevBaseline = cardElements[i - cardsPerRow].getBoundingClientRect().bottom;
        const currentTop = cardElements[i].getBoundingClientRect().top;
        const verticalOffset = prevBaseline - currentTop+50;
        // console.log(currentTop);
        cardElements[i].style.marginTop = verticalOffset + 'px';
    }
}


fetch('/diary', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        data.forEach(item => {
            // console.log(item);
            const postElement = document.createElement('div');
            postElement.className = 'card';

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';
            postElement.appendChild(cardBody);

            // 날짜 표시
            const dateParagraph = document.createElement('p');
            dateParagraph.className = 'card-text';
            dateParagraph.textContent = item.date.substring(0, 10);
            cardBody.appendChild(dateParagraph);

            // 감정 표시
            const emotionImage = document.createElement('img');
            emotionImage.className = 'emotion-image';
            switch (item.emotion) {
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
            cardBody.appendChild(emotionImage);

            // 이미지 표시
            if (item.photo !== null) {
                const imageBox = document.createElement('div');
                imageBox.className = 'image-box';
                postElement.appendChild(imageBox);
                const imageElement = document.createElement('img');
                imageElement.className = 'card-img-top';
                imageElement.src = item.photo;
                imageElement.alt = 'Card image cap';
                imageBox.appendChild(imageElement);
            }

            // 텍스트 표시
            const textParagraph = document.createElement('p');
            textParagraph.className = 'card-text';
            textParagraph.textContent = item.text;
            cardBody.appendChild(textParagraph);

            cardbox.appendChild(postElement);

            postElement.appendChild(textParagraph);

            postElement.addEventListener('click', () => {
                localStorage.removeItem("date");
                localStorage.removeItem("emotion");
                localStorage.removeItem("image");
                localStorage.removeItem("text");
                localStorage.removeItem('writerid');
                localStorage.removeItem('postnum');
                localStorage.removeItem('gcount');
                localStorage.setItem('gcount', item.good);
                localStorage.setItem('postnum', item.postnum);
                localStorage.setItem('writerid', item.id);
                localStorage.setItem('date', item.date);
                localStorage.setItem('image', item.photo);
                localStorage.setItem('text', item.text);
                localStorage.setItem('emotion', item.emotion);
                window.location.href = '/diarydetail';
            });
            
        });
    })
    .catch(error => {
        console.error(error);
    });

    

function alignCardsToBaseline() {
    // 약간의 딜레이를 주고, 렌더링이 완료된 후에 카드 정렬 실행
    setTimeout(alignToBaseline, 100);
}

// DOMContentLoaded 이벤트 발생 시, 카드 정렬 함수 실행
document.addEventListener('DOMContentLoaded', alignCardsToBaseline);
window.addEventListener('resize', alignCardsToBaseline);