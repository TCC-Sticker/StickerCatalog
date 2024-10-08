document.addEventListener('DOMContentLoaded', () => {
    const stickerGrid = document.getElementById('sticker-grid');
    const counter = document.getElementById('counter');
    const total = document.getElementById('total');
    const saveButton = document.getElementById('save-button');

    const stickers = [
        '/path/to/sticker1.png',
        '/path/to/sticker2.png',
        '/path/to/sticker3.png',
        // Add the path to all your sticker images here
    ];

    let collectedStickers = JSON.parse(localStorage.getItem('collectedStickers')) || new Array(stickers.length).fill(false);

    function updateCounter() {
        const collectedCount = collectedStickers.filter(collected => collected).length;
        counter.textContent = collectedCount;
        total.textContent = stickers.length;
    }

    function renderStickers() {
        stickers.forEach((sticker, index) => {
            const img = document.createElement('img');
            img.src = sticker;
            img.classList.add('sticker');
            if (collectedStickers[index]) {
                img.classList.add('collected');
            }

            img.addEventListener('click', () => {
                collectedStickers[index] = !collectedStickers[index];
                img.classList.toggle('collected');
                updateCounter();
            });

            stickerGrid.appendChild(img);
        });
    }

    saveButton.addEventListener('click', () => {
        localStorage.setItem('collectedStickers', JSON.stringify(collectedStickers));
        alert('Progress saved!');
    });

    renderStickers();
    updateCounter();
});
