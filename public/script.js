document.addEventListener('DOMContentLoaded', fetchCatImages);

async function fetchCatImages() {
    try {
        const response = await fetch('/cat-images');
        const imageUrls = await response.json()

        const imageContainer = document.getElementById('cat-image-container');
        imageContainer.innerHTML = '';

        imageUrls.forEach(url => {
            const card = createCard(url);
            imageContainer.appendChild(card);
        });
    } catch (error) {
        console.error('failed to fetch images:', error);
    }
}

function createCard(url) {
    const card = document.createElement('div');
    card.className = 'cat-card';

    const imgElement = document.createElement('img');
    imgElement.src = url;
    imgElement.alt = "random cat";

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container'

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'delete';
    deleteButton.addEventListener('click', function() {
        deleteCat(deleteButton);
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'edit'
    editButton.addEventListener('click', function() {
        editCat(editButton)
    })

    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(editButton);

    card.appendChild(imgElement);
    card.appendChild(buttonContainer);

    return card;
}

function deleteCat(deleteButton) {
    // delete logic
    // const card = deleteButton.parentNode;
    // card.remove();
}

function editCat(editButton) {

}