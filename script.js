document.addEventListener('DOMContentLoaded', () => {
    const areas = document.querySelectorAll('area');
    const counter = document.getElementById('counter');
    const saveButton = document.getElementById('save-button');
    const shareButton = document.getElementById('share-button');
    
    // Load collected stickers from local storage, or initialize an empty array if none exists
    let collectedStickers = JSON.parse(localStorage.getItem('collectedStickers')) || new Array(areas.length).fill(false);

    // Function to update the sticker count
    function updateCounter() {
        const collectedCount = collectedStickers.filter(collected => collected).length;
        counter.textContent = collectedCount;
    }

    // Function to render the green overlay for collected stickers
    function renderCollectedStickers() {
        collectedStickers.forEach((collected, index) => {
            if (collected) {
                addCollectedOverlay(index);
            }
        });
    }

    // Function to add the green overlay for a collected sticker
    function addCollectedOverlay(index) {
        const overlay = document.createElement('div');
        overlay.classList.add('area-collected', `area-${index}`);
        document.querySelector('.sticker-sheet').appendChild(overlay);
    }

    // Handle click events on the sticker areas
    areas.forEach((area, index) => {
        area.addEventListener('click', (e) => {
            e.preventDefault();
            // Toggle collected state
            collectedStickers[index] = !collectedStickers[index];
            // Update the visual overlay
            if (collectedStickers[index]) {
                addCollectedOverlay(index);
            } else {
                const existingOverlay = document.querySelector(`.area-${index}`);
                if (existingOverlay) {
                    existingOverlay.remove();
                }
            }
            updateCounter();
        });
    });

    // Save progress to local storage when the save button is clicked
    saveButton.addEventListener('click', (e) => {
        e.preventDefault();  // Prevent default button behavior
        localStorage.setItem('collectedStickers', JSON.stringify(collectedStickers));
        alert('Progress saved!');
    });

    // Share the sticker sheet as an image
    shareButton.addEventListener('click', (e) => {
        e.preventDefault();  // Prevent default button behavior
        html2canvas(document.querySelector('.sticker-sheet')).then(canvas => {
            const link = document.createElement('a');
            link.download = 'sticker_collection.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    });

    // Render all collected stickers from local storage on page load
    renderCollectedStickers();
    updateCounter();
});
