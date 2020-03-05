// Create in selected elements n-number of divs
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
let playerPoints = 0;
let AIpoints = 0;
const arrBlock = [0, 2, 6, 8];

// creat arr with positions (possible to pick)
let arrPosition = [];
for (let i=0; i<9;i++){ arrPosition.push(i)};

const clear = ()=> {
  for (let i=0; i<9;i++){ arrPosition.push(i)}; // fill arrPosition (0-8)
  for (const pos of arrDiv) {
    pos.classList.remove('x');
    pos.classList.remove('o');
    pos.innerHTML = '';
    pos.classList.remove('shake');
  }
};
// Reset game
const startOver = ()=>{
  playerPicks = [];
  AIpicks = [];
  arrPosition = [];
  
  setTimeout(clear, 2000);
};
// add class/animation to position which won
const showCombo = (el) => {
  for (const e of el) {
    arrDiv[e].classList.add('shake');
  }
};

// app brain -> compare player picks with win combos
const checkWin = (picks)=>{
  for (const combo of winCombos) {   
    let points = 0;   
    for (let i=0; i<picks.length; i++) {
      if (combo.includes(picks[i])){
        points++;          
        if (points === 3) { // if win
          startOver();
          showCombo(combo);
          return true;
        }                  
      }
    } 
  }
};

// I hope You can't win now
const unbeatable = (arrPos) => {
  let AIpick = Math.floor(Math.random()*(arrPos.length)); // generate random [pos] from avaliable
  if (arrPos.includes(4)) {
    AIpick = arrPos.indexOf(4);
  } 
  // else if (playerPicks.includes(4)){    
  //   // Mamma Mia
  //   AIpick = arrPos.indexOf(arrBlock[Math.floor(Math.random()*(arrBlock.length))]); // Pasta la vista
  // }
  for (const combo of winCombos) {
    let posLeft = 3;    
    for (let i=0; i<playerPicks.length; i++) {
      if (combo.includes(playerPicks[i])){
        posLeft--;          
        if (posLeft === 1) { // generate pos to block You if X in row == 2
          for (const eC of combo) {
            if (arrPos.includes(eC)) {
              AIpick = arrPos.indexOf(eC);              
            }
          }
        }                 
      }
    }
  }  
  return AIpick;
};

// Do some magic when you click
const playerClick = (e) => {
  e.addEventListener('click', ()=>{
    if (e.classList.length <= 1 && arrPosition.length>=1) { // do not let pick alraedy picked item
      e.classList.add('x');
      e.innerHTML = 'X';
      playerPicks.push(parseInt(e.classList[0]));      
      
      // remove picked int from arrPosition
      const pRemove = arrPosition.indexOf(parseInt(e.classList[0]));
      if (pRemove != -1) {
        arrPosition.splice(pRemove, 1);
      } else {
        console.log('Wait!');
      };

      if (checkWin(playerPicks)) {
        console.log('Player Win!');
        playerPoints++
      } else {
        // AI pick pos (random) and remove int from arrPosition
        if (arrPosition.length >= 1) {
          const randomAIpick = unbeatable(arrPosition); // generate [pos] from arrPosition 
          console.log(randomAIpick);          

          arrDiv[arrPosition[randomAIpick]].classList.add('o');
          arrDiv[arrPosition[randomAIpick]].innerHTML = 'O';
          AIpicks.push(parseInt(arrPosition[randomAIpick]));
          arrPosition.splice(randomAIpick, 1);
        } else {
          startOver();
        };
        if (checkWin(AIpicks)) {
          console.log('AI Win!');
          AIpoints++        
        };
      }
      document.querySelector('.AIpoints').innerHTML = 'AI: '+AIpoints;
      document.querySelector('.playerPoints').innerHTML = 'You: '+playerPoints;
    } else {
      console.log('Do NOT pick same position or WAIT!'); 
    };
  });
};

arrDiv.forEach(playerClick);