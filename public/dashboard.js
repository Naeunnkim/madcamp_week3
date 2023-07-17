const cardbox = document.getElementById('cards-box');

//윗줄 끝선에 맞춰 정렬
function alignToBaseline() {
    const cardElements = document.getElementsByClassName('card');
    const cardWidth = 350; // 카드의 가로 너비
    const spacing = 10; // 카드 사이의 간격

    const containerWidth = cardbox.offsetWidth;
    const cardsPerRow = Math.floor((containerWidth) / (cardWidth + spacing));
    // console.log(cardsPerRow);

    for (let i = cardsPerRow; i < cardElements.length; i++) {
        const prevBaseline = cardElements[i - cardsPerRow].getBoundingClientRect().bottom;
        const currentTop = cardElements[i].getBoundingClientRect().top;
        const verticalOffset = prevBaseline - currentTop + 30;
        // console.log(currentTop);
        cardElements[i].style.marginTop = verticalOffset + 'px';
    }
}

fetch('/graph')
    .then(response => response.json())
    .then(data => {
        const cnt1 = data.cnt1;
        const cnt2 = data.cnt2;
        const cnt3 = data.cnt3;
        const cnt4 = data.cnt4;
        const cnt5 = data.cnt5;

        const sum = cnt1 + cnt2 + cnt3 + cnt4 + cnt5;

        const rat1 = cnt1 / sum * 100;
        const rat2 = cnt2 / sum * 100;
        const rat3 = cnt3 / sum * 100;
        const rat4 = cnt4 / sum * 100;
        const rat5 = cnt5 / sum * 100;

        // bar 요소들 가져오기
        const barElements = document.getElementsByClassName('bar');

        // 각 bar에 값을 할당하고 스타일 변경
        barElements[0].style.height = `${rat1}%`;
        barElements[1].style.height = `${rat2}%`;
        barElements[2].style.height = `${rat3}%`;
        barElements[3].style.height = `${rat4}%`;
        barElements[4].style.height = `${rat5}%`;
    })

fetch('/posts')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            const postElement = document.createElement('div');
            postElement.className = 'card';

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';
            postElement.appendChild(cardBody);

            const dateParagraph = document.createElement('p');
            dateParagraph.className = 'card-text';
            dateParagraph.textContent = item.date.substring(0, 10);
            cardBody.appendChild(dateParagraph);


            const idParagraph = document.createElement('p');
            idParagraph.className = 'card-text';
            idParagraph.textContent = item.id;
            cardBody.appendChild(idParagraph);

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

            if (item.photo !== null) {
                const imageBox = document.createElement('div');
                imageBox.className = 'image-box';
                postElement.appendChild(imageBox);
                const imageElement = document.createElement('img');
                imageElement.className = 'card-img-top';
                imageElement.src = item.photo;
                imageElement.alt = 'Card image cap';
                imageBox.appendChild(imageElement);
                cardBody.appendChild(imageBox);
            }

            const textParagraph = document.createElement('p');
            textParagraph.className = 'card-text';
            textParagraph.textContent = item.text;
            cardBody.appendChild(textParagraph);

            cardbox.appendChild(postElement);

            postElement.addEventListener('click', () => {
                
                localStorage.setItem('gcount', item.good);
                localStorage.setItem('postnum', item.postnum);
                localStorage.setItem('writerid', item.id);
                localStorage.setItem('date', item.date);
                localStorage.setItem('image', item.photo);
                localStorage.setItem('text', item.text);
                localStorage.setItem('emotion', item.emotion);
                window.location.href = '/boarddetail';
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
    

document.addEventListener('DOMContentLoaded', alignCardsToBaseline);
// window.addEventListener('resize', alignCardsToBaseline);


