const ttt = document.getElementById('tic-tac-toe');

// Create in selected elements (# or .) n-number of divs
const boxes = [
  ['#tic-tac-toe', 9]
];

for (const [select, items] of boxes) {
  const container = document.querySelector(select);

  for (let i=0; i<items; i++) {
    const newDiv = document.createElement('div');
    newDiv.className = i; //div class 1-n
    container.appendChild(newDiv);
  }
};

const arrDiv = document.querySelectorAll('#tic-tac-toe>div');

// all possible combos to win
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6]
];

let playerPicks = [];
let AIpicks = [];

let arrPosition = [];
for (let i=0; i<9;i++){ arrPosition.push(i)};

const startOver = ()=>{
  playerPicks = [];
  AIpicks = [];
  arrPosition = [];
  for (let i=0; i<9;i++){ arrPosition.push(i)}; // fill arrPosition (0-8)
  for (const pos of arrDiv) {
    pos.classList.remove('x');
    pos.classList.remove('o');
    pos.innerHTML = '';
  }
};

// app brain -> compare player picks with win combos
const checkWin = (picks)=>{
  for (const combo of winCombos) {   
    let points = 0;   
    for (let i=0; i<picks.length; i++) {
      if (combo.includes(picks[i])){
        points++;          
        if (points === 3) {
          console.log(picks+' won!');
          setTimeout(startOver, 1000);           
        }                  
      }
    } 
  }
};

const playerClick = (e) => {
  e.addEventListener('click', ()=>{
    if (e.classList.length <= 1) { // do not let pick picked item
      e.classList.add('x');
      e.innerHTML = 'X';
      playerPicks.push(parseInt(e.classList[0]));
      
      const pRemove = arrPosition.indexOf(parseInt(e.classList[0]));
      // remove picked int from arrPosition
      if (pRemove != -1) {
        arrPosition.splice(pRemove, 1);
      } else {
        console.log('Do NOT pick same position!');
      };
      console.log(playerPicks);
      
      // check if win combo includes player picks
      checkWin(playerPicks);

      // AI pick pos and remove int from arrPosition
      if (arrPosition.length >= 1) {
        const randomAIpick = Math.floor(Math.random()*(arrPosition.length));
        arrDiv[arrPosition[randomAIpick]].classList.add('o');
        arrDiv[arrPosition[randomAIpick]].innerHTML = 'O';
        AIpicks.push(parseInt(arrPosition[randomAIpick]));
        console.log(AIpicks);        

        arrPosition.splice(randomAIpick, 1);
      } else {
        setTimeout(startOver, 1000);
      }
      checkWin(AIpicks);

    } else {
      console.log('Do NOT pick same position'); 
    }

  });
};

arrDiv.forEach(playerClick);