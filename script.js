
let fields = Array(9).fill(null); // Das ist eine neue art von Array. Wir können auch so schreiben und dann das Array wir kleiner.
let currentShape = 'circle';
let score = { circle: 0, cross: 0 };
let gameOver = false;

function setPlayer(shape) {
  currentShape = shape;
}
function init() {
    render();
}

function render() {
    let html = '<table>';
    for (let i = 0; i < 3; i++) {
      html += '<tr>';
      for (let j = 0; j < 3; j++) {
        let index = i * 3 + j;
        let symbol = fields[index] === 'circle' ? 'o' :
                     fields[index] === 'cross' ? 'x' : '';
        html += `<td onclick="handleClick(${index})">${symbol ? `<span class="fade-in">${symbol}</span>` : ''}</td>`;
      }
      html += '</tr>';
    }
    html += '</table>';
    document.getElementById('content').innerHTML = html;
  }

  function handleClick(index) {
    if (fields[index] !== null || gameOver) return;
    fields[index] = currentShape;
    checkWinner();
    currentShape = currentShape === 'circle' ? 'cross' : 'circle';
    render();
  }

  function checkWinner() {
    const winPatterns = [
      [0,1,2], [3,4,5], [6,7,8], // Reihen
      [0,3,6], [1,4,7], [2,5,8], // Spalten
      [0,4,8], [2,4,6]           // Diagonalen
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
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