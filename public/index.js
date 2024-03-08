// document.addEventListener('DOMContentLoaded', fetchCatImages);

document.addEventListener('DOMContentLoaded', async() => {
    await fetchCatImages();

    const newCat = document.getElementById('create-cat');
    if (newCat) {
        newCat.addEventListener('submit', handleAddCat)
    } else {
        console.error('cannot add cat')
    }
})

async function fetchCatImages() {
    try {
        const response = await fetch('/cat-images');
        const catData = await response.json()

        const imageContainer = document.getElementById('cat-image-container');
        imageContainer.innerHTML = '';


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
    formContainer.className = 'form-container';
    formContainer.style.display = 'none';

    const form = document.createElement('form');
    form.innerHTML = `
        <input type='text' name='url' value='${url}' />
        <button type="submit">save</button>
        <button type="button">Cancel</button>
    `
    formContainer.appendChild(form);
    form.onsubmit = (e) => editCat(e, id, formContainer);

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
        // console.log(id);
        toggleForm(formContainer, true);
    })


    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(editButton);

    card.appendChild(imgElement);
    card.appendChild(formContainer);
    card.appendChild(buttonContainer);

    return card;
}

async function handleAddCat(e) {
    e.preventDefault();
    const urlInput = document.getElementById('cat-url');
    const catUrl = urlInput.value;

    try {
        const response = await fetch('/cat-images', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON. stringify({ url: catUrl }),
        })

        if (response.ok) {
            const newCat = await response.json();
            const newCatCard = createCard(newCat.url, newCat.id)
            document.getElementById('cat-image-container').appendChild(newCatCard);
            urlInput.value = ''; 
        } else {
            console.error('new cat failed');
        }

    } catch (error) {
        console.error('cannot add new cat:', error)
    }
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

async function editCat(e, id, formContainer) {
    e.preventDefault();
    const updatedUrl = formContainer.querySelector("input[name='url']").value
    try {
        const response = await fetch(`/cat-image/${id}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({ url: updatedUrl}),
        });
        if (response.ok) {
            console.log('image updated');
            const imgElement = formContainer.parentNode.querySelector('img');
            imgElement.src = updatedUrl;

        } else {
            console.error('Error updating cat image', error)
        }

    } catch (error) {
        console.error('cannot edit cat:', error)
    }
}

function toggleForm(formContainer, showForm) {
    formContainer.style.display = showForm ? 'block' : 'none';
}