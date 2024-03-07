document.addEventListener('DOMContentLoaded', fetchCatImages);

async function fetchCatImages() {
    try {
        const response = await fetch('/cat-images');
        const imageUrls = await response.json();
        
        const gallery = document.getElementById('cat-image-container');
        gallery.innerHTML = ''; // Clear gallery

        imageUrls.forEach(url => {
            const imgElement = document.createElement('img');
            imgElement.src = url;
            imgElement.alt = "random cat";
            
            const card = document.createElement('div');
            card.className = 'cat-card';
            card.appendChild(imgElement);

            gallery.appendChild(card);
        });
    } catch (error) {
        console.error('Failed to fetch cat images:', error);
    }
}