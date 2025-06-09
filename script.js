const totalStickers = 123;
const stickersPerPage = 12;
const pages = Math.ceil(totalStickers / stickersPerPage);

const container = document.getElementById('pages-container');

// Load state from localStorage
let selectedStickers = JSON.parse(localStorage.getItem('stickers') || '[]');

function flipBook() {
  document.querySelector('.cover').style.transform = 'rotateY(-180deg)';
}

for (let i = 0; i < pages; i++) {
  const page = document.createElement('div');
  page.className = 'page';
  page.style.zIndex = pages - i;

  for (let j = 0; j < stickersPerPage; j++) {
    const index = i * stickersPerPage + j + 1;
    if (index > totalStickers) break;

    const img = document.createElement('img');
    img.src = `stickers/${String(index).padStart(3, '0')}.png`;
    img.className = 'sticker';

    if (selectedStickers.includes(index)) {
      img.classList.add('active');
    }

    img.addEventListener('click', () => {
      if (img.classList.toggle('active')) {
        selectedStickers.push(index);
      } else {
        selectedStickers = selectedStickers.filter(n => n !== index);
      }
      localStorage.setItem('stickers', JSON.stringify(selectedStickers));
    });

    page.appendChild(img);
  }

  container.appendChild(page);
}
