const cardbox = document.getElementById('cards-box');

fetch('/posts')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        data.forEach(item => {
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

            const idParagraph = document.createElement('p');
            idParagraph.className = 'card-text';
            idParagraph.textContent = item.id;
            cardBody.appendChild(idParagraph);

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

