document.addEventListener('DOMContentLoaded', fetchCatImages);

async function fetchCatImages() {
    try {
        const response = await fetch('/cat-images');
        const catData = await response.json()
        // console.log(catData)

        const imageContainer = document.getElementById('cat-image-container');
        imageContainer.innerHTML = '';

        // imageUrls.forEach((url, index) => {
        //     const card = createCard(url, index);
        //     imageContainer.appendChild(card);
        // });

        catData.forEach(({ url, id}) => {
            const card = createCard(url, id);
            imageContainer.appendChild(card);
        })

    } catch (error) {
        console.error('failed to fetch images:', error);
    }
}

function createCard(url, id) {
    const card = document.createElement('div');
    card.className = 'cat-card';

    const imgElement = document.createElement('img');
    imgElement.src = url;
    imgElement.alt = "random cat";

    const formContainer = document.createElement('div');
    formContainer.style.display = 'none';

    const form = document.createElement('form');
    form.innerHTML = `
        <input type='text' name='url' value='${url}' />
        <button type="submit">save</button>
        <button type="button">Cancel</button>
    `
    formContainer.appendChild(form);

    const cancelButton = formContainer.querySelector('button[type="button"]')
    cancelButton.addEventListener('click', function () {
        toggleForm(formContainer, false);
    })


    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container'

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'delete';
    deleteButton.addEventListener('click', function() {
        deleteCat(id, card);
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'edit'
    editButton.addEventListener('click', function() {
        // editCat(editButton)
        toggleForm(formContainer, true)
    })


    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(editButton);

    card.appendChild(imgElement);
    card.appendChild(formContainer);
    card.appendChild(buttonContainer);

    return card;
}

async function deleteCat(id, cardElement) {
    try {
        const response = await fetch(`/cat-image/${id}`, { method: 'DELETE' });
        if (response.ok) {
            console.log('image deleted');
            cardElement.remove();
        } else {
            console.error('image delete failed');
        }
    } catch (error) {
        console.error('Error deleting cat image:', error);
    }
}

function editCat(editButton) {

}

function toggleForm(formContainer, showForm) {
    formContainer.style.display = showForm ? 'block' : 'none';
}