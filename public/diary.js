const cardbox = document.getElementById('cards-box');
const id1 = localStorage.getItem("id");

var data = {
    id: id1
}

console.log("heyyyyyyyyyy"+id1);

function alignToBaseline() {
    const cardElements = document.getElementsByClassName('card');

    for (let i = 3; i < cardElements.length; i++) {
        const prevBaseline = cardElements[i - 3].getBoundingClientRect().bottom;
        const currentTop = cardElements[i].getBoundingClientRect().top;
        const verticalOffset = prevBaseline - currentTop+30;

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
            console.log(item);
            const postElement = document.createElement('div');
            postElement.className = 'card';

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

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';
            postElement.appendChild(cardBody);

            const cardTitle = document.createElement('a');
            cardTitle.className = 'card-title';
            cardTitle.href = '#';
            cardTitle.target = '_blank';
            cardTitle.textContent = 'DATE';
            cardBody.appendChild(cardTitle);

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
            postElement.appendChild(emotionImage);


            const dateParagraph = document.createElement('p');
            dateParagraph.className = 'card-text';
            dateParagraph.textContent = item.date.substring(0, 10);
            cardBody.appendChild(dateParagraph);

            const textParagraph = document.createElement('p');
            textParagraph.className = 'card-text';
            textParagraph.textContent = item.text;
            cardBody.appendChild(textParagraph);

            cardbox.appendChild(postElement);
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