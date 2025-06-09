const totalStickers = 123;
const stickersPerPage = 9;
const totalPages = Math.ceil(totalStickers / stickersPerPage); // 14 pages = 7 spreads
const container = document.getElementById('pages');
let selected = JSON.parse(localStorage.getItem('stickers') || '[]');

document.getElementById('cover').addEventListener('click', () => {
  document.getElementById('cover').style.transform = 'rotateY(-180deg)';
  setTimeout(() => {
    document.getElementById('cover').style.display = 'none';
  }, 1000);
});

for (let i = 0; i < totalPages; i += 2) {
  const spread = document.createElement('div');
  spread.className = 'page spread';
  spread.style.zIndex = totalPages - i;

  const left = document.createElement('div');
  left.className = 'left-page';
  const right = document.createElement('div');
  right.className = 'right-page';

  for (let j = 0; j < stickersPerPage; j++) {
    const indexLeft = i * stickersPerPage + j + 1;
    if (indexLeft <= totalStickers) {
      left.appendChild(createSticker(indexLeft));
    }

    const indexRight = (i + 1) * stickersPerPage + j + 1;
    if (indexRight <= totalStickers) {
      right.appendChild(createSticker(indexRight));
    }
  }

  spread.appendChild(left);
  spread.appendChild(right);
  container.appendChild(spread);
}

function createSticker(index) {
  const img = document.createElement('img');
  img.src = `stickers/${String(index).padStart(3, '0')}.png`;
  img.className = 'sticker';
  if (selected.includes(index)) img.classList.add('active');

  img.addEventListener('click', () => {
    if (img.classList.toggle('active')) {
      selected.push(index);
    } else {
      selected = selected.filter(n => n !== index);
    }
    localStorage.setItem('stickers', JSON.stringify(selected));
  });

  return img;
}
