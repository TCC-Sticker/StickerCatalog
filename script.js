document.addEventListener('DOMContentLoaded', () => {
    const areas = document.querySelectorAll('area');
    const counter = document.getElementById('counter');
    const saveButton = document.getElementById('save-button');
    const shareButton = document.getElementById('share-button');
    let collectedStickers = JSON.parse(localStorage.getItem('collectedStickers')) || new Array(areas.length).fill(false);

    // Function to update the counter
    function updateCounter() {
        const collectedCount = collectedStickers.filter(collected => collected).length;
        counter.textContent = collectedCount;
    }

    // Function to render the collected stickers
    function renderCollectedStickers() {
        collectedStickers.forEach((collected, index) => {
            if (collected) {
                addCollectedOverlay(index);
            }
        });
    }

    // Function to add green overlay for collected stickers
    function addCollectedOverlay(index) {
        const overlay = document.createElement('div');
        overlay.classList.add('area-collected', `area-${index}`);
        document.querySelector('.sticker-sheet').appendChild(overlay);
    }

    // Event listeners for clicking areas to mark them collected/uncollected
    areas.forEach((area, index) => {
        area.addEventListener('click', (e) => {
            e.preventDefault();
            collectedStickers[index] = !collectedStickers[index];
            if (collectedStickers[index]) {
                addCollectedOverlay(index);
            } else {
                document.querySelector(`.area-${index}`).remove();
            }
            updateCounter();
        });
    });

    // Save progress to local storage
    saveButton.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.setItem('collectedStickers', JSON.stringify(collectedStickers));
        alert('Progress saved!');
    });

    // Share button functionality - Capture the sticker sheet and share it
    shareButton.addEventListener('click', (e) => {
        e.preventDefault();  // Prevent default button behavior
        html2canvas(document.querySelector('.sticker-sheet')).then(canvas => {
            const link = document.createElement('a');
            link.download = 'sticker_collection.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    });

    renderCollectedStickers();
    updateCounter();
});
