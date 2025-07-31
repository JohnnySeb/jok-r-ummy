document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('game-board');
  const scoreEl = document.getElementById('score');

  // Exemple : générer 10 cartes au hasard
  for (let i = 1; i <= 10; i++) {
    const card = document.createElement('div');
    card.className = 'card';
    card.textContent = i;
    card.addEventListener('click', () => {
      alert(`Carte ${i} cliquée !`);
    });
    board.appendChild(card);
  }

  // Score fictif
  let score = 0;
  function updateScore() {
    score += 10;
    scoreEl.textContent = score;
  }

  // Appel test
  setTimeout(updateScore, 1000);
});
