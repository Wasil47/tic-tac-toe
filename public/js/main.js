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

const playerPicks = [];

const arrPosition = [];
for (let i=0; i<9;i++){ arrPosition.push(i)};



const playerClick = (e) => {
  e.addEventListener('click', ()=>{
    e.classList.add('x');
    e.innerHTML = 'X';
    playerPicks.push(parseInt(e.classList[0]));

    const pRemove = arrPosition.indexOf(parseInt(e.classList[0]));
    // playerPicks.sort(function(a, b){return a-b}); // sort player picks, propably unnecessary

    // remove picked int from arrPosition
    if (pRemove != -1) {
      arrPosition.splice(pRemove, 1);
    } else {
      console.log('Do NOT pick same position');      
    };

    // AI pick pos and remove int from arrPosition
    const randomAIpick = Math.floor(Math.random()*(arrPosition.length));
    arrDiv[arrPosition[randomAIpick]].classList.add('o');
    arrDiv[arrPosition[randomAIpick]].innerHTML = 'O';
    arrPosition.splice(randomAIpick, 1);

    console.log(arrPosition);
    

    // app brain -> check if win combo includes player picks
    for (const combo of winCombos) {   
      let points = 0;   
      for (let i=0; i<playerPicks.length; i++) {
        if (combo.includes(playerPicks[i])){
          points++;          
          if (points === 3) {
            console.log('U won!');
          }                  
        }
      } 
    }       
  });
};

arrDiv.forEach(playerClick);