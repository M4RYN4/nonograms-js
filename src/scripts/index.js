document.getElementsByTagName("body")[0].setAttribute("id", "body");
document.getElementById('body').innerHTML = `<div class="wrap theme">
<button class="theme__button">Theme</button>
<div class="theme__button icon" id="btn-audio-sound"> <i id="icon-sound" class="fa-solid fa-volume-mute"></i></div>
<div id="timeContainer">
    <div id="display-time">00:00</div>
    <button hidden id="btn-time-start">Start</button>
    <button hidden id="btn-stop-time">Pause</button>
    <button hidden id="resetBtn">Reset</button>
</div>
<div class="main-game" id="main-game"></div>

<div class="wrapper-buttons">
    <h2>Settings:</h2>
    <h3>Select level:</h3>
    <input type="radio" id="game-easy" name="level" value="easy" checked="checked">
    <label for="game-easy">Easy 5x5</label><br>
    <input type="radio" id="game-medium" name="level" value="medium">
    <label for="game-medium">Medium 10x10</label><br>
    <input type="radio" id="game-hard" name="level" value="hard">
    <label for="game-hard">Hard 15x15</label>

    <h3>Select puzzle:</h3>
    <div class="center-dropdowns">
      <label for="game-easy-level"></label>
      <select name="game-dropdown" id="game-easy-level">
          <option value="0" id="dino">Dino </option>
          <option value="1" id="camel">Camel</option>
          <option value="2" id="cat">Cat</option>
          <option value="3" id="chicken">Chicken</option>
          <option value="4" id="sandglass">Sandglass</option>
        </select>

        <label for="game-medium-level"></label>
        <select name="game-dropdown" id="game-medium-level">
          <option value="0">Monkey</option>
          <option value="1">Duck</option>
          <option value="2">Dog</option>
          <option value="3">Frog</option>
          <option value="4">Deer</option>
        </select>

        <label for="game-hard-level"></label>
        <select name="game-dropdown" id="game-hard-level">
          <option value="0">Elk</option>
          <option value="1">Cat</option>
          <option value="2">Pig</option>
          <option value="3">Giraffes</option>
          <option value="4">Chameleon</option>
        </select>
    </div>

  <button id="btn-new-game">New Game</button>
  <button id="btn-reset-game">Reset Game</button>
  <button id="btn-solution">Solution</button>
  <button id="btn-random-game">Random Game</button>
</div>

 <!-- Win Modal -->
 <div id="win-modal" class="modal-overlay hidden">
   <div class="modal-box">
     <h2 class="modal-title">Puzzle Solved!</h2>
     <p class="modal-message">You solved the nonogram in <span id="modal-time">0</span> seconds!</p>
     <div class="modal-buttons">
       <button id="btn-modal-new-game" class="modal-btn primary">New Game</button>
      <button id="btn-modal-close" class="modal-btn">Close</button>
     </div>
   </div>
 </div>

</div>`;
//Matrices: 0-empty, 2-filled cell
//Later: statusOfCell = [0 (empty cell)-"none", 1 (marked-X)-"off-cell", 2 (filled cell)-"on-cell"];
const easy = [
  matrix = [//dino 5X5
    [0, 0, 0, 2, 2],
    [0, 0, 0, 2, 0],
    [0, 2, 2, 2, 0],
    [0, 2, 2, 2, 0],
    [2, 2, 0, 2, 0],
  ],
  matrix2 = [//camel 5X5
    [0, 0, 0, 2, 2],
    [2, 2, 0, 2, 0],
    [2, 2, 2, 2, 0],
    [2, 0, 2, 0, 0],
    [2, 0, 2, 0, 0],
  ],
  matrix3 = [//cat 5X5
    [0, 0, 2, 0, 2],
    [0, 0, 2, 2, 2],
    [2, 2, 2, 2, 2],
    [2, 2, 2, 2, 0],
    [2, 2, 2, 2, 2],
  ],
  matrix4 = [//Chicken 5X5
    [0, 2, 0, 0, 0],
    [2, 2, 0, 2, 2],
    [0, 2, 2, 2, 0],
    [0, 2, 2, 2, 0],
    [0, 0, 2, 0, 0],
  ],
  matrix5 = [//sandglass 5X5
    [2, 2, 2, 2, 2],
    [0, 2, 2, 2, 0],
    [0, 0, 2, 0, 0],
    [0, 2, 0, 2, 0],
    [2, 2, 2, 2, 2],
  ]
]

const medium = [
  matrix = [//monkey 10X10
    [0, 0, 0, 2, 2, 2, 2, 0, 0, 0],
    [2, 0, 2, 2, 2, 2, 2, 2, 0, 0],
    [2, 0, 0, 2, 2, 2, 2, 0, 0, 0],
    [2, 2, 0, 0, 2, 2, 0, 0, 0, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 0],

    [0, 0, 0, 0, 2, 2, 0, 0, 2, 2],
    [0, 0, 0, 2, 2, 2, 2, 0, 0, 2],
    [0, 0, 2, 2, 0, 0, 2, 2, 0, 2],
    [0, 0, 2, 0, 0, 0, 0, 2, 0, 0],
    [2, 2, 2, 0, 0, 0, 0, 2, 2, 2],
  ],
  matrix2 = [//duck 10X10
    [0, 0, 0, 2, 2, 2, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 2, 0, 0, 0],
    [0, 0, 2, 0, 2, 0, 2, 0, 0, 0],
    [0, 2, 2, 2, 0, 0, 2, 0, 0, 0],
    [2, 2, 2, 2, 2, 0, 2, 0, 0, 0],

    [0, 0, 0, 2, 0, 2, 0, 0, 0, 2],
    [0, 0, 2, 0, 0, 0, 2, 2, 2, 2],
    [0, 2, 0, 0, 2, 0, 0, 0, 0, 2],
    [0, 2, 0, 0, 2, 2, 0, 0, 2, 2],
    [0, 2, 2, 0, 0, 2, 2, 2, 0, 2],
  ],
  matrix3 = [//dog 10X10
    [2, 2, 0, 0, 2, 2, 0, 0, 0, 0],
    [0, 0, 2, 2, 2, 0, 0, 0, 0, 0],
    [0, 2, 2, 0, 2, 2, 2, 2, 0, 0],
    [0, 2, 2, 2, 2, 2, 2, 0, 0, 0],
    [0, 0, 2, 2, 0, 0, 0, 0, 0, 0],

    [0, 2, 2, 2, 2, 2, 0, 0, 0, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 0, 2],
    [2, 0, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 0, 2, 0, 0, 2, 2, 2, 0, 0],
    [0, 2, 2, 0, 2, 2, 2, 0, 0, 0],
  ],
  matrix4 = [//frog 10X10
    [0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 2, 2, 0, 0],
    [0, 0, 0, 0, 2, 2, 2, 2, 0, 0],
    [0, 2, 2, 2, 2, 2, 2, 0, 0, 2],

    [0, 2, 0, 2, 2, 2, 2, 2, 2, 0],
    [2, 2, 0, 2, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 2, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
  ],
  matrix5 = [//deer 10X10
    [0, 0, 0, 2, 0, 2, 0, 0, 2, 0],
    [0, 0, 0, 0, 2, 2, 0, 2, 0, 0],
    [0, 0, 0, 0, 0, 2, 2, 2, 2, 0],
    [0, 2, 0, 0, 0, 0, 2, 0, 2, 2],
    [2, 2, 0, 0, 0, 0, 2, 2, 0, 0],

    [0, 0, 2, 2, 2, 2, 0, 0, 2, 0],
    [0, 2, 0, 0, 0, 0, 0, 2, 2, 0],
    [0, 2, 2, 0, 2, 2, 2, 0, 0, 2],
    [2, 2, 0, 2, 0, 0, 2, 0, 2, 2],
    [2, 0, 0, 2, 0, 0, 2, 0, 0, 0],
  ],
]

const hard = [
  matrix = [//elk 15X15
    [2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2],
    [2, 2, 0, 2, 2, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2],
    [2, 2, 0, 2, 2, 0, 2, 0, 2, 0, 2, 2, 0, 2, 2],
    [0, 2, 2, 2, 2, 0, 2, 0, 2, 0, 2, 2, 2, 2, 0],
    [0, 0, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 0, 0],

    [0, 0, 0, 2, 2, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 2, 0, 2, 2, 2, 2, 0, 0, 0],
    [0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0],
    [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],

    [0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2],
    [0, 2, 0, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2],
    [0, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2],
    [0, 0, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2],
  ],    
  matrix2 = [//cat 15X15
    [0, 2, 0, 0, 0,   0, 0, 0, 0, 2,   0, 0, 2, 2, 2],
    [0, 2, 2, 0, 0,   0, 0, 0, 2, 2,   0, 0, 0, 0, 2],
    [0, 2, 2, 2, 2,   2, 2, 2, 2, 2,   0, 0, 0, 2, 2],
    [2, 2, 2, 2, 2,   2, 2, 2, 2, 2,   2, 0, 0, 2, 0],
    [0, 2, 0, 2, 2,   0, 2, 2, 0, 2,   0, 0, 0, 2, 0],

    [2, 2, 2, 2, 0,   2, 0, 2, 2, 2,   2, 0, 2, 2, 0],
    [0, 2, 2, 2, 2,   2, 2, 2, 2, 2,   0, 0, 2, 0, 0],
    [0, 0, 2, 2, 2,   2, 2, 2, 2, 0,   0, 0, 2, 2, 0],
    [0, 0, 0, 0, 2,   2, 2, 2, 0, 0,   0, 0, 0, 2, 0],
    [0, 0, 0, 2, 2,   2, 2, 2, 2, 0,   0, 0, 0, 2, 0],

    [0, 0, 0, 2, 2,   2, 2, 2, 2, 0,   0, 0, 2, 2, 0],
    [0, 0, 2, 2, 2,   2, 2, 2, 2, 2,   0, 2, 2, 0, 0],
    [0, 0, 2, 2, 2,   2, 2, 2, 2, 2,   2, 2, 2, 0, 0],
    [0, 0, 2, 2, 2,   2, 2, 2, 2, 2,   2, 0, 0, 0, 0],
    [0, 2, 2, 2, 2,   2, 2, 2, 2, 2,   2, 2, 0, 0, 0],
  ],     
  matrix3 = [//pig 15X15
    [2, 2, 2, 2, 2,   0, 0, 0, 0, 0,   2, 2, 2, 2, 2],
    [2, 0, 0, 0, 2,   2, 2, 2, 2, 2,   2, 0, 0, 0, 2],
    [2, 0, 0, 2, 2,   0, 0, 0, 0, 0,   2, 2, 0, 0, 2],
    [2, 2, 2, 0, 0,   0, 0, 0, 0, 0,   0, 0, 2, 2, 2],
    [0, 2, 0, 2, 2,   0, 0, 0, 0, 0,   2, 2, 0, 2, 0],

    [2, 2, 0, 2, 2,   0, 0, 0, 0, 0,   2, 2, 0, 2, 2],
    [2, 0, 0, 0, 0,   2, 2, 2, 2, 2,   0, 0, 0, 0, 2],
    [2, 0, 0, 0, 2,   0, 0, 0, 0, 0,   2, 0, 0, 0, 2],
    [2, 0, 0, 2, 0,   0, 2, 0, 2, 0,   0, 2, 0, 0, 2],
    [2, 0, 0, 2, 2,   0, 0, 0, 0, 0,   2, 2, 0, 0, 2],

    [2, 2, 0, 0, 2,   2, 2, 2, 2, 2,   2, 0, 0, 2, 2],
    [0, 2, 2, 0, 0,   0, 0, 0, 0, 0,   0, 0, 2, 2, 0],
    [0, 0, 2, 0, 2,   2, 0, 0, 0, 2,   2, 0, 2, 0, 0],
    [0, 0, 2, 0, 0,   2, 2, 2, 2, 2,   0, 0, 2, 0, 0],
    [0, 0, 2, 2, 2,   2, 0, 0, 0, 2,   2, 2, 2, 0, 0],
  ],   
  matrix4 = [//giraffes 15X15
    [2, 2, 0, 0, 2,   2, 0, 0, 2, 0,   0, 2, 2, 2, 0],
    [2, 2, 2, 2, 0,   0, 0, 2, 2, 0,   2, 2, 2, 2, 2],
    [2, 2, 0, 0, 0,   0, 2, 2, 2, 0,   2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2,   2, 0, 0, 2, 0,   2, 2, 2, 2, 2],
    [2, 2, 0, 0, 0,   0, 0, 0, 2, 0,   0, 2, 2, 2, 0],

    [2, 2, 0, 0, 2,   0, 0, 0, 2, 0,   0, 0, 0, 0, 0],
    [2, 2, 0, 2, 2,   0, 0, 0, 2, 2,   0, 0, 0, 0, 0],
    [2, 2, 0, 0, 2,   0, 0, 0, 2, 2,   2, 2, 0, 0, 0],
    [2, 2, 0, 0, 2,   2, 0, 0, 2, 2,   2, 2, 2, 0, 0],
    [2, 2, 0, 0, 2,   2, 2, 0, 2, 2,   2, 2, 0, 2, 0],

    [2, 2, 0, 0, 2,   2, 2, 0, 2, 0,   0, 2, 0, 2, 0],
    [2, 2, 0, 0, 2,   0, 2, 0, 2, 0,   0, 2, 0, 2, 0],
    [2, 2, 0, 0, 2,   0, 2, 0, 2, 0,   0, 2, 0, 0, 0],
    [2, 2, 0, 0, 2,   0, 2, 2, 2, 0,   0, 2, 2, 0, 2],
    [2, 2, 2, 2, 2,   2, 2, 2, 2, 0,   0, 2, 2, 2, 2],
  ],   
  matrix5 = [//chameleon 15X15
    [0, 0, 0, 0, 0,   0, 0, 0, 2, 2,   2, 2, 0, 0, 0],
    [0, 0, 0, 0, 0,   0, 2, 2, 2, 2,   2, 2, 2, 2, 0],
    [0, 0, 2, 2, 0,   2, 2, 2, 2, 2,   2, 2, 2, 2, 2],
    [0, 2, 2, 2, 2,   2, 2, 2, 2, 2,   2, 2, 2, 2, 2],
    [2, 2, 0, 2, 2,   2, 2, 2, 2, 2,   2, 2, 2, 2, 2],

    [2, 2, 2, 2, 2,   0, 0, 2, 0, 2,   2, 2, 2, 2, 2],
    [0, 0, 0, 0, 0,   2, 2, 0, 2, 2,   0, 2, 2, 2, 2],
    [0, 0, 0, 0, 0,   0, 2, 0, 0, 2,   0, 0, 2, 2, 2],
    [0, 0, 0, 0, 0,   0, 0, 0, 0, 0,   0, 0, 2, 2, 2],
    [0, 0, 0, 0, 0,   0, 0, 0, 0, 0,   0, 0, 2, 2, 0],

    [0, 0, 0, 0, 0,   0, 0, 2, 2, 0,   0, 0, 2, 2, 0],
    [0, 0, 0, 0, 0,   0, 2, 0, 0, 2,   0, 0, 2, 2, 0],
    [0, 0, 0, 0, 0,   0, 2, 0, 0, 0,   0, 2, 2, 2, 0],
    [0, 0, 0, 0, 0,   0, 2, 2, 0, 0,   2, 2, 2, 0, 0],
    [0, 0, 0, 0, 0,   0, 0, 2, 2, 2,   2, 0, 0, 0, 0],
  ],
]
const easyKeys = {
  0 : {columnClue: [[1], [3], [2], [5],[1]],//dino -(clues TOP-for each column)
      rowClue: [[2], [1], [3], [3],[2, 1]]},//clues on the LEFT-for each row
  1 : {columnClue: [[4], [2], [3], [3],[1]],//camel
      rowClue: [[2], [2, 1], [4], [1, 1], [1, 1]]},
  2 : {columnClue: [[3], [3], [5], [4], [3, 1]],//cat
      rowClue: [[1, 1], [3], [5], [4], [5]]},
  3 : {columnClue: [[1], [4], [3], [3], [1]],//chicken
      rowClue: [[1], [2, 2], [3], [3], [1]]},
  4 : {columnClue : [[1, 1], [2, 2], [3, 1], [2, 2], [1, 1]],//
      rowClue : [[5], [3], [1], [1, 1], [5]]}
}
const mediumKeys = {
  0 : {columnClue: [[3, 1], [2, 1], [1, 1,3], [3, 1, 2], [7], [7], [3, 1, 2], [1, 1, 3], [2, 1],[3, 1]],//monkey
      rowClue: [[4], [1, 6], [1, 4], [2, 2], [8], [2, 2], [4, 1], [2, 2, 1], [1,1],[3, 3]]},
  1 : {columnClue: [[1], [2, 3], [4, 1, 3], [1, 3], [1, 1, 1, 2], [1, 1, 2], [4, 1, 1], [1, 1], [1, 1],[5]],//duck
      rowClue: [[3], [1, 1], [1, 1, 1], [3, 1], [5, 1], [1, 1, 1], [1, 4], [1, 1, 1], [1,2, 2],[2, 3,1]]},
  2 : {columnClue: [[1, 2], [1,2,2,1], [9], [1, 5], [4,3,1], [1, 2,5], [2,4], [1, 3], [1],[2]],//dog
      rowClue: [[2,2], [3], [2,4], [6], [2], [5,1], [8,1], [1,7], [1,3],[2, 3]]},
  3 : {columnClue: [[1], [3], [1], [3,2], [6,1], [1,6], [4], [2,1], [1],[1]],//frog
      rowClue: [[1], [1], [1,2], [4], [6,1], [1,6], [2,3], [1], [3],[1]]},
  4 : {columnClue: [[1,2], [2,3], [1,1], [1,1,2], [1,1,1], [3,1,1], [3,3], [2,1,1], [1,2,2,1],[1,2]],//frog
      rowClue: [[1,1,1], [2,1], [4], [1,1,2], [2,2], [4,1], [1,2], [2,3,1], [2,1,1,2],[1,1,1]]},
}

const hardKeys = {
  0 : {columnClue: [[3], [3, 3], [2, 2, 2], [6, 6], [5, 7], [1, 1, 3], [2, 6], [2, 3], [2, 5],[11], [14], [5, 8], [2, 7], [3, 6], [3, 5]],//elk
      rowClue: [[1,1,1,1], [2,2,2,2], [2,2,1,1,2,2], [4,1,1,4], [4,4], [2, 5], [6], [1,1,4], [10],[12], [7,6], [1,2,6], [4,6], [3,6], [6]]},
  1 : {columnClue: [[1,1], [7,1], [3,3,4], [6, 6], [3,9], [2,10], [3,9], [13], [3,3,6],[7,4], [1,1,3], [2,1], [1,3,2], [1,4,4], [3]],//cat
      rowClue: [[1,1,3], [2,2,1], [9,2], [11,1], [1,2,2,1,1], [4,1,4,2], [9,1], [7,2], [4,1],[6,1], [6,2], [8,2], [10], [9], [11]]},
  2 : {columnClue: [[4,6], [1, 3,2], [1,1,4], [1,1,2,2,1], [3,2,1,2,1,1], [1,1,1,3], [1,1,1,1,1], [1,1,1,1], [1,1,1,1,1],[1,1,1,3], [3,2,1,2,1,1], [1,1,2,2,1], [1,1,4], [1,3,2], [4,6]],//pig
      rowClue: [[5,5], [1,7,1], [1,2,2,1], [3,3], [1,2,2,1], [2,2,2,2], [1,5,1], [1,1,1,1], [1,1,1,1,1,1],[1,2,2,1], [2,7,2], [2,2], [1,2,2,1], [1,5,1], [4,4]]},
  3 : {columnClue: [[15], [15], [1,1,1], [1,1,1,1], [1,1,10], [1,1,3,1], [1,6], [2,2], [15],[4], [3,3], [5,8], [5,1,2], [5,3,1], [3,2]],//giraffe
      rowClue: [[2,2,1,3], [4,2,5], [2,3,5], [6,1,5], [2,1,3], [2,1,1], [2,2,2], [2,1,4], [2,2,5],[2,3,4,1], [2,3,1,1,1], [2,1,1,1,1,1], [2,1,1,1,1], [2,1,3,2,1], [9,4]]},
  4 : {columnClue: [[2], [3], [2,1], [4], [3], [3,1], [4,2,3], [5,1,2], [5,1,1,1],[8,1,1], [6,2], [7,2], [13], [12], [7]],//chameleon
      rowClue: [[4], [8], [2,10], [14], [2,12], [5,1,6], [2,2,4], [1,1,3], [3],[2], [2,2], [1,1,2], [1,3], [2,3], [4]]},
}

let width;
let height;

let statusOfCell = ["none", "off-cell", "on-cell"];//idx 2- black ==2
let mouseState = ["none", "off-cell", "on-cell"];// , unselect (right cl), select (left cl) -for mouse events

let gameStateObj = {
  field: [],
  solution: [],
  keys: {
    rowClue: [],
    columnClue: [] 
  }
};

let gameStateObj2 = {//for solution - img in black
  field: [],
  solution: [],
  keys: {
    rowClue: [],
    columnClue: []
  }
};

let solutionOn = false;
let solutionShown = false;
//for audio
let isPlay;

let btnNewGame = document.getElementById("btn-new-game");
let btnSolution = document.getElementById("btn-solution");
let btnResetGame = document.getElementById('btn-reset-game');
let btnRandomGame = document.getElementById('btn-random-game');

let btnAudioSound = document.getElementById('btn-audio-sound');
let soundOn = false;
let iconSound = document.querySelector("#icon-sound");
//for theme
const btnTheme = document.querySelector('.theme__button');
const theme = document.querySelector('.theme');
const currentTheme = localStorage.getItem('theme');

//2.2
let level;
let rowClue = [];
let columnClue = [];
let game;

//->timer
const timeDisplay = document.querySelector("#display-time");
const btnTimeStart = document.querySelector("#btn-time-start");
const btnTimeStop = document.querySelector("#btn-stop-time");//stop
const resetBtn = document.querySelector("#resetBtn");

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
// let hrs = 0;
let mins = 0;
let secs = 0;

//for Victory func.
let arrRows = [];
let arrRows2 = [];

//Result>arr of cells(field) & keys-> for mouse events & generated by markCell()
let cells = [];
let headers = {
  rowClue: [],
  columnClue: []
};

let isDragging = false;
let startX, startY;

//2.1
btnNewGame.addEventListener('click', startNewGame);
//timer ->start & added to mouseup
btnTimeStart.addEventListener('click', startTimer);
//timer ->stop & added to message
btnTimeStop.addEventListener("click", stopTimer);
//timer ->reset & added to resetGame
resetBtn.addEventListener("click", resetTime);
//5.
btnSolution.addEventListener('click', showSolution);
btnResetGame.addEventListener("click", resetGame);

document.getElementById("icon-sound").style.display = "block";
//icon showing 'sound'
btnAudioSound.addEventListener("click", () => {
  soundOn = !soundOn;

  if (!soundOn) {
    iconSound.classList.remove('fa-volume-high');
    iconSound.classList.add('fa-volume-mute');
  } else {
    iconSound.classList.remove('fa-volume-mute');
    iconSound.classList.add('fa-volume-high');
  }
});

//for theme
function setTheme(name){
  theme.setAttribute('data-theme', name);
  localStorage.setItem('theme', name);
}

if (currentTheme) {
  theme.setAttribute('data-theme', currentTheme);
} else {
  setTheme('light');
}

btnTheme.addEventListener('click', () => {
  if (theme.getAttribute('data-theme') === 'light') {
    setTheme('dark');
    if(soundOn) {
      let themeAudio = new Audio('src/audio/theme.wav');
      themeAudio.play();
    }
  } else {
    setTheme('light');
  }
})

//for time
function startTimer(){
  if(paused){
    paused = false;
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTime, 1000);
  }
}

function stopTimer(){
  if(!paused){
    paused = true;
    elapsedTime = Date.now() - startTime;
    clearInterval(intervalId);
  }
}

function resetTime(){
  paused = true;
  clearInterval(intervalId);
  startTime = 0;
  elapsedTime = 0;
  currentTime = 0;
  // hrs = 0;
  mins = 0;
  secs = 0;
  timeDisplay.textContent = "00:00";
}

function updateTime(){
  elapsedTime = Date.now() - startTime;

  secs = Math.floor((elapsedTime / 1000) % 60);
  mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
  // hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);

  secs = pad(secs);
  mins = pad(mins);
  // hrs = pad(hrs);

  timeDisplay.textContent = `${mins}:${secs}`;

  function pad(unit){
      return (("0") + unit).length > 2 ? unit : "0" + unit;
  }
}

function startNewGame(levelOverride) {
  resetTime();
  solutionOn = false;
  solutionShown = false;
  btnSolution.classList.remove('active');

  //If levelOverride is a valid level, -> radio first
  if (levelOverride === 'easy' || levelOverride === 'medium' || levelOverride === 'hard') {
    document.getElementById('game-' + levelOverride).checked = true;
  }
  //3 levels-radio
  if (document.getElementById('game-easy').checked) {//by default-radio
    document.getElementById("game-easy-level").style.display = "block"; 
    document.getElementById("game-medium-level").style.display = "none";
    document.getElementById("game-hard-level").style.display = "none";

    level = document.getElementById('game-easy').value;//radio
    game = document.getElementById("game-easy-level").value;//dropdown
    width = 5;
    height = 5;
    rowClue = easyKeys[game].rowClue;
    columnClue = easyKeys[game].columnClue;
  } else if (document.getElementById('game-medium').checked) {
    document.getElementById("game-easy-level").style.display = "none";
    document.getElementById("game-medium-level").style.display = "block";
    document.getElementById("game-hard-level").style.display = "none";
    
    level = document.getElementById('game-medium').value;
    game = document.getElementById("game-medium-level").value;
    width = 10;
    height = 10;
    rowClue = mediumKeys[game].rowClue;
    columnClue = mediumKeys[game].columnClue;
  } else if(document.getElementById('game-hard').checked) {
    document.getElementById("game-easy-level").style.display = "none";
    document.getElementById("game-medium-level").style.display = "none";
    document.getElementById("game-hard-level").style.display = "block";

    level = document.getElementById('game-hard').value;
    game = document.getElementById("game-hard-level").value;
    width = 15;
    height = 15;
    rowClue = hardKeys[game].rowClue;
    columnClue = hardKeys[game].columnClue;
  }

  gameStateObj = generateField();//2.4
  gameStateObj2 = generateField();
  generateGame();//3.1
  showKeysFieldSolution();//3.2
  if(soundOn){
    let game2 = new Audio('src/audio/game.wav');
    game2.play();
  }
}

//2.3 for solution
function fillSolutionMatrix(array) {
//  array[0][0] = 0;
//  array[0][4] = 2;
//   array[0] = matrix[0];//dino
//   array[1] = matrix[1];
 //3 levels-radio
  if (level === "easy"){//radio
    for (let i = 0; i < height; i++) {
      array[i] = easy[game][i];//arrOfmatrices[id -selection of games][i]
    }
  } else if(level === "medium"){
    for (let i = 0; i < height; i++) {
      array[i] = medium[game][i];
    }
  } else if(level === "hard"){
    for (let i = 0; i < height; i++) {
      array[i] = hard[game][i];
    }
  }
}

document.getElementById("game-easy-level").style.display = "block";//dropdown
document.getElementById("game-medium-level").style.display = "none";
document.getElementById("game-hard-level").style.display = "none";

document.body.addEventListener('mousedown', function (e) {
  let target = e.target;
  let gameRadio;

  if(target.id === "game-easy") {//radio
    document.getElementById("game-easy-level").style.display = "block";//dropdown
    gameRadio = document.getElementById("game-easy-level");//dropdown           
    // if(soundOn){
    //   let easy = new Audio('src/audio/easy.wav');
    //   easy.play();
    // }
    document.getElementById("game-medium-level").style.display = "none";
    document.getElementById("game-hard-level").style.display = "none";
  } else if(target.id === "game-medium"){//radio
    document.getElementById("game-medium-level").style.display = "block";
    gameRadio = document.getElementById("game-medium-level");
    // if (soundOn){
    //   let medium = new Audio('src/audio/medium.wav');
    //   medium.play();
    // }
    document.getElementById("game-easy-level").style.display = "none";
    document.getElementById("game-hard-level").style.display = "none";
  } else if(target.id === "game-hard"){//radio
    document.getElementById("game-hard-level").style.display = "block";
    gameRadio = document.getElementById("game-hard-level");
    // if(soundOn){
    //   let hard = new Audio('src/audio/hard.wav');
    //   hard.play();
    // }
    document.getElementById("game-easy-level").style.display = "none";
    document.getElementById("game-medium-level").style.display = "none";
  }
  //for sound on dropdown
  if (target.id === "game-easy-level" || target.id === "game-medium-level" || target.id === "game-hard-level") {
    if(soundOn){
      let character = new Audio('src/audio/characterSelect.wav');
      character.play();
    }
  }

  //result.textContent = gameRadio;
});
//Auto-start game on change of radio button AND dropdown:
document.querySelectorAll('input[name="level"]').forEach(radio => {
  radio.addEventListener('click', (e) => {
    startNewGame(e.target.value);  // Pass the level explicitly-to fix issue with radio change
  });
});

document.querySelectorAll('.center-dropdowns select').forEach(select => {
  select.addEventListener('change', startNewGame);
});
//2.4
function generateField() {
  let stateObj = {
    field: [],
    solution: [],
    keys: {
      rowClue: rowClue,
      columnClue: columnClue
    }
  };
  //Clear field->set all to 0 (empty):
  let mainField = stateObj.field;
  for (let i = 0; i < height; i++) {
    mainField[i] = [];
    for (let j = 0; j < width; j++) {
      mainField[i][j] = 0;
    }
  }
  //alert(mainField)//empty00000...
  //2.4 Solution field:
  let field = stateObj.solution;
  for (let i = 0; i < height; i++) {
    field[i] = [];
  }

  fillSolutionMatrix(field);//alert(field)//02202...
  return stateObj;
}

//5.
function markCell(x, y, state) {
  let cell = cells[y][x];
  cell.classList.remove(...statusOfCell);//
  cell.classList.add(state);
}

function generateGame() {//3.1
  let div = document.getElementById("main-game");
  //1. Clear-> so 'New Game' btn works
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
  //2. Clear-> so 'New Game' btn works
  cells = [];
  headers = { rowClue: [], columnClue: [] };
  //Create header:(clues on TOP-for each column)
  for (let i = 0; i < width; i++) {//3.2
    let div = document.createElement("div");//"th"
    div.className = "th";
    headers.columnClue.push(div);
  }
  //Create headers: row clues (on the LEFT)
  for (let i = 0; i < height; i++) {//3.2
    let div = document.createElement("div");//"th"
    div.className = "th";
    headers.rowClue.push(div);
  }
  //3.3. Create cells
  for (let i = 0; i < height; i++) {
    cells[i] = [];
    for (let j = 0; j < width; j++) {
      let div = document.createElement("div");//"td"
      div.className = "td";

      //x & y position of cell generated by indeces
      div.dataset.x = j;
      div.dataset.y = i;

      div.onmousedown = onMouseDown.bind(null, j, i);//left btn//4.2--->
      div.onmouseup = onMouseUp.bind(null, j, i);//5.2
      div.onmouseover = onMouseOver.bind(null, j, i);
      div.oncontextmenu = () => {//6.
        return false;
      };

      cells[i].push(div);
    }
  }
  //1 key- row
  let keyRowHeader = document.createElement("div");//"tr"
  keyRowHeader.className = "tr";
  //2
  let emptyHeader = document.createElement("div");//"th"
  emptyHeader.className = "th";
  keyRowHeader.appendChild(emptyHeader);

  for (let i = 0; i < width; i++) {
    keyRowHeader.appendChild(headers.rowClue[i]);
  }
  div.appendChild(keyRowHeader);

  //3. rows
  for (let i = 0; i < height; i++) {
    let tr = document.createElement("div");//"tr"
    tr.className = "tr";
    tr.appendChild(headers.columnClue[i]);

    for (let j = 0; j < width; j++) {
      tr.appendChild(cells[i][j]);
    }

    div.appendChild(tr);
  }
}

//3.2 for solution- to show the img/solution & keys & field
function showKeysFieldSolution() {
  showKeys(gameStateObj.keys);//8.1
  if (solutionOn) {
    showSolutionOrField(gameStateObj.solution);//8.2
  } else {
    showSolutionOrField(gameStateObj.field);//8.2
  }
}
//8.2
function showSolutionOrField(field) {
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      let state = statusOfCell[field[i][j]];

      markCell(j, i, state);
    }
  }
}
//8.1
function showKeys(keys) {
  for (let i = 0; i < height; i++) {
    let str = keys.rowClue[i].join(" ");
    headers.columnClue[i].innerText = str;
  }

  for (let i = 0; i < width; i++) {
    let str = keys.columnClue[i].join("\n");
    headers.rowClue[i].innerText = str;
  }
}

//4.2
function getSelectedCellsXY(startX, startY, endX, endY) {
  let minX = Math.min(startX, endX);
  let minY = Math.min(startY, endY);
  let maxX = Math.max(startX, endX);
  let maxY = Math.max(startY, endY);

  let rangeXY = [];
  //Mouse States:
  if (mouseState == "none") {//set all all cells to "none"
    for (let i = minX; i <= maxX; i++) {
      for (let j = minY; j <= maxY; j++) {
        let cellXY = {
          x: i,
          y: j
        };
        //alert(cellXY + "none" + cellXY.x + cellXY.y);
        rangeXY.push(cellXY);
      }
    }
  } else {
    if ((maxX - minX < maxY - minY) < 0) {//horiz dragging
      for (let i = minX; i <= maxX; i++) {
        let cellXY = {
          x: i,
          y: startY
        };
        //alert(cellXY + "hor" + cellXY.x + cellXY.y);
        rangeXY.push(cellXY);
      }
    } else {//vert dragging
      for (let i = minY; i <= maxY; i++) {
        let cellXY = {
          x: startX,
          y: i
        };
        //alert(cellXY + "vert" + cellXY.x + cellXY.y);
        rangeXY.push(cellXY);
      }
    }
  }

  return rangeXY;
}
//4.2
function onMouseDown(x, y, e) {
  startTimer();
  //alert(e.target.value)
  if (solutionOn) return;            // Don't allow in solution mode

  if(e.button === 0 &&  e.target.value != "on-cell"){//left btn clicked
      mouseState = "on-cell";
      e.target.value = "on-cell";
      // if(soundOn){
      //   let hit = new Audio('src/audio/hit.wav');
      //   hit.play();
      // }
      if(soundOn){
        let none = new Audio('src/audio/none22.wav');
        none.play();
      }
  } else if(e.button === 0 &&  e.target.value == "on-cell") {
      mouseState = "none";
      e.target.value = "none";
      // if(soundOn){
      //   let none = new Audio('src/audio/none22.wav');
      //   none.play();
      // }
  }

  if(e.button === 1){
    mouseState = "none";
  }

  if(e.button === 2) {//right btn clicked
      mouseState = "off-cell";
      if(soundOn){
        let off= new Audio('src/audio/off.wav');
        off.play();
      }
    }

    isDragging = true;

    startX = x;
    startY = y;
    markCell(x, y, mouseState);//only mark ONE cell

   e.preventDefault();
    return false;
}

//5.1> save changes-> on realease of mouse btn
function onMouseUp(x, y) {
  if (solutionOn) return;

  if (isDragging) {
    let rangeXY = getSelectedCellsXY(startX, startY, x, y);
      for (let item of rangeXY) {
        gameStateObj.field[item.y][item.x] = statusOfCell.indexOf(mouseState);//change statusOfCell by indx & assign it to X & y
        gameStateObj2.field[item.y][item.x] = statusOfCell.indexOf(mouseState);//
      }
    }
  isDragging = false;

  isVictory();//4.1 call
}
//ADD-> for dragging mouse
function onMouseOver(x, y, e) {
  if (!isDragging) return;           // Only if mouse button is held
  if (solutionOn) return;            // Don't allow in solution mode
    
  //Continue only if left OR right button is pressed
  if (e.buttons === 1 || e.buttons === 2) {
    markCell(x, y, mouseState);        // Mark this cell
    gameStateObj.field[y][x] = statusOfCell.indexOf(mouseState);
    gameStateObj2.field[y][x] = statusOfCell.indexOf(mouseState);
  }
}
//5 for btn Solution:
function showSolution() {
 if(!solutionOn){
    if(soundOn){
        let solution = new Audio('src/audio/solution.wav');
        solution.play();
    }
  }
  solutionShown = true;
  solutionOn = !solutionOn;
  showKeysFieldSolution();

  //Toggle active class on the button
  btnSolution.classList.toggle('active', solutionOn);
}
//WIN MODAL
const winModal = document.getElementById("win-modal");
const modalTime = document.getElementById("modal-time");
const btnModalNewGame = document.getElementById("btn-modal-new-game");
const btnModalClose = document.getElementById("btn-modal-close");

function showWinModal(timeInSeconds) {
  modalTime.textContent = timeInSeconds;
  winModal.classList.remove("hidden");
}

function closeWinModal() {
  winModal.classList.add("hidden");
}

btnModalNewGame.addEventListener("click", () => {
  closeWinModal();
  startNewGame();
});

btnModalClose.addEventListener("click", () => {
  closeWinModal();
});

// Close modal when clicking on the dark overlay
winModal.addEventListener("click", (e) => {
  if (e.target === winModal) {
    closeWinModal();
  }
});

//Close modal when pressing Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !winModal.classList.contains("hidden")) {
    closeWinModal();
  }
});
//4 Modal - game result--------------TO DO -create MODAL
function isVictory() {
  if (solutionOn) {
    return false;
  }
  //I.way:
  // arrRows = [];
  // arrRows2 = [];
  // for (let i = 0; i < height; i++) {
  //   arrRows.push(gameStateObj2.solution[i]);
  //   arrRows2.push(gameStateObj2.field[i]);
  // }
  // //actual/user field (only black cells -2 kept))
  // for (let i = 0; i < arrRows.length; i++) {
  //   for (let j = 0; j < arrRows[i].length; j++) {
  //     if (arrRows[i][j] != 2) {
  //         arrRows[i][j] = null;
  //      }
  //   }
  // }
  // //correct solution
  // for (let i = 0; i < arrRows2.length; i++) {
  //   for (let j = 0; j < arrRows2[i].length; j++) {
  //     if (arrRows2[i][j] != 2) {
  //         arrRows2[i][j] = null;
  //     }
  //   }
  // }
  // //comparison
  // for (let i = 0; i < height; i++) {
  //   for (let j = 0; j < width; j++) {
  //     if ((arrRows[i][j] !== arrRows2[i][j])) {
  //       //alert(gameStateObj.solution[i][j] + " => " + gameStateObj.field[i][j])
  //       return false;//Not solved (if don't match)
  //     }
  //   }
  // }//if get here-> victory
  //II.way:
  // not victory:
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      // Case 1: Solution says cell should be filled (2)
      if (gameStateObj.solution[i][j] === 2) {//check filled (2) cells IN SOLUTION
        if (gameStateObj.field[i][j] !== 2) {//check actual/user's field (player doesn't have 2 where solution does)
          return false;//Not solved (if don't match)
        }
      }
      // Case 2: Solution says cell should be empty (0)
      else {
        if (gameStateObj.field[i][j] === 2) {
          return false;
        }
      }
    }
  }//if get here-> victory
  if(soundOn){
    let winner = new Audio('src/audio/winFinal.wav');
    winner.play();
  }

  setTimeout(() => {
    // alert(`Great! You have solved the nonogram in ${+mins*60 + +secs} seconds!`);
    stopTimer();
    showWinModal(+mins * 60 + +secs);
    startNewGame();
  }, "500");
}

startNewGame();//1.

function resetGame(){
  solutionOn = false;
  solutionShown = false;
  btnSolution.classList.remove('active');
  gameStateObj = generateField();//2.4
  gameStateObj2 = generateField();
  generateGame();//3.1
  showKeysFieldSolution();//3.2
  resetTime();
  if(soundOn){
    let reset = new Audio('src/audio/practice.wav');
    reset.play();
  }
}

btnRandomGame.addEventListener("click", randomGame);

function randomGame() {//both template and level are chosen randomly by algorithm
  resetTime();
  solutionOn = false;
  solutionShown = false;
  btnSolution.classList.remove('active');
  // Math.floor(Math.random() * (max - min + 1)) + min;
  //1 out of 3
  let levelRandom = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
  //1 out of 5
  game = Math.floor(Math.random() * (4 - 0 + 1)) + 0;//

  if(levelRandom === 0){
    document.getElementById('game-easy').checked = true;//radio
    document.getElementById("game-easy-level").style.display = "block";//dropdown
    document.getElementById("game-medium-level").style.display = "none";
    document.getElementById("game-hard-level").style.display = "none";
    document.getElementById('game-easy-level').value = game;
    level = "easy";//radio
    width = 5;
    height = 5;
    rowClue = easyKeys[game].rowClue;
    columnClue = easyKeys[game].columnClue;
  } else if(levelRandom === 1){
    document.getElementById('game-medium').checked = true;
    document.getElementById("game-easy-level").style.display = "none";//dropdown
    document.getElementById("game-medium-level").style.display = "block";
    document.getElementById("game-hard-level").style.display = "none";
    document.getElementById('game-medium-level').value = game;
    level = "medium";
    width = 10;
    height = 10;
    rowClue = mediumKeys[game].rowClue;
    columnClue = mediumKeys[game].columnClue;
  } else if(levelRandom === 2){
    document.getElementById('game-hard').checked = true;
    document.getElementById("game-easy-level").style.display = "none";//dropdown
    document.getElementById("game-medium-level").style.display = "none";
    document.getElementById("game-hard-level").style.display = "block";
    document.getElementById("game-hard-level").value = game;
    level = "hard";
    width = 15;
    height = 15;
    rowClue = hardKeys[game].rowClue;
    columnClue = hardKeys[game].columnClue;
  }

  gameStateObj = generateField();//2.4
  gameStateObj2 = generateField();
  generateGame();//3.1
  showKeysFieldSolution();//3.2

  if(soundOn) {
    let random = new Audio('src/audio/win17.wav');
    random.play();
  }
}