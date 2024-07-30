let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let msgConatiner = document.querySelector(".msg-container");
let newBtn = document.querySelector("#newgameBtn");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0; //To Track Draw

let winPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgConatiner.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // console.log("Button Was Clicked");
    if (turnO) {
      box.innerText = "O";
      box.classList.add("green");
      turnO = false;
    } else {
      box.innerText = "X";
      box.classList.remove("green")
      turnO = true;
    }
    box.disabled = true;
    count++;
    let isWinner = checkWinner();
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgConatiner.classList.remove("hide");
  disabledBoxes();
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};
const disabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgConatiner.classList.remove("hide");
  disabledBoxes();
};

const checkWinner = () => {
  for (let pattern of winPattern) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;
    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        // console.log(`Winner ${pos1val}`)
        showWinner(pos1val);
      }
    }
  }
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
