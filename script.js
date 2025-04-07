
let fields = Array(9).fill(null); // 9 leere Felder
let currentShape = 'circle'; // Wer ist dran: 'circle' oder 'cross'
let score = { circle: 0, cross: 0 }; // Punkte für beide Spieler
let gameOver = false; // Hat jemand gewonnen?

function setPlayer(shape) {
  currentShape = shape; // Spieler auswählen
}

function init() {
  render(); // Starte das Spiel
}

function render() {
  let table = '<table>';
  for (let i = 0; i < 3; i++) {
    table += '<tr>';
    for (let j = 0; j < 3; j++) {
      let index = i * 3 + j;
      let symbol = '';
      if (fields[index] === 'circle') {
        symbol = 'o';
      } else if (fields[index] === 'cross') {
        symbol = 'x';
      }

      table += `<td onclick="handleClick(${index})">` +
               (symbol ? `<span class="fade-in">${symbol}</span>` : '') +
               `</td>`;
    }
    table += '</tr>';
  }
  table += '</table>';
  document.getElementById('content').innerHTML = table;
}

function handleClick(index) {
  if (fields[index] || gameOver) return; // Wenn schon belegt oder Spiel vorbei, nix machen
  fields[index] = currentShape; // Feld setzen
  checkWinner(); // Gewonnen?
  currentShape = (currentShape === 'circle') ? 'cross' : 'circle'; // Spieler wechseln
  render(); // Neu zeichnen
}

function checkWinner() {
  const wins = [
    [0,1,2], [3,4,5], [6,7,8], // Reihen
    [0,3,6], [1,4,7], [2,5,8], // Spalten
    [0,4,8], [2,4,6]           // Diagonalen
  ];

  for (let w of wins) {
    let [a, b, c] = w;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      gameOver = true;
      score[fields[a]]++;
      document.getElementById('winnerText').innerText =
        `Spieler ${fields[a] === 'circle' ? 'O' : 'X'} hat gewonnen!`;
      updateScore();
      return;
    }
  }

  if (!fields.includes(null)) {
    gameOver = true;
    document.getElementById('winnerText').innerText = 'Unentschieden!';
  }
}

function updateScore() {
  document.getElementById('scoreCircle').innerText = score.circle;
  document.getElementById('scoreCross').innerText = score.cross;
}

function resetGame() {
  fields = Array(9).fill(null);
  gameOver = false;
  document.getElementById('winnerText').innerText = '';
  render();
}
