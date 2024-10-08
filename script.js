document.addEventListener('DOMContentLoaded', () => {
    const areas = document.querySelectorAll('area');
    const counter = document.getElementById('counter');
    const saveButton = document.getElementById('save-button');
    let collectedStickers = JSON.parse(localStorage.getItem('collectedStickers')) || new Array(areas.length).fill(false);

    function updateCounter() {
        const collectedCount = collectedStickers.filter(collected => collected).length;
        counter.textContent = collectedCount;
    }

    function renderCollectedStickers() {
        collectedStickers.forEach((collected, index) => {
            if (collected) {
                addCollectedOverlay(index);
            }
        });
    }

    function addCollectedOverlay(index) {
        const overlay = document.createElement('div');
        overlay.classList.add('area-collected', `area-${index}`);
        document.querySelector('.sticker-sheet').appendChild(overlay);
    }

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

    saveButton.addEventListener('click', () => {
        localStorage.setItem('collectedStickers', JSON.stringify(collectedStickers));
        alert('Progress saved!');
    });

    renderCollectedStickers();
    updateCounter();
});
