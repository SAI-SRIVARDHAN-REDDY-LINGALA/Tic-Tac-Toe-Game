let boxes = document.querySelectorAll(".box"); // Selecting all elements with class 'box'
let resetBtn = document.querySelector("#reset-btn"); // Selecting reset button element
let newGameBtn = document.querySelector("#new-btn"); // Selecting new game button element
let msgContainer = document.querySelector(".msg-container"); // Selecting message container element
let msg = document.querySelector("#msg"); // Selecting message element

let turnO = true; // Track whose turn it is (true for O, false for X)
let count = 0; // Track number


// Continue from where we left off

const winPatterns = [
  [0, 1, 2], // Top row
  [0, 3, 6], // Left column
  [0, 4, 8], // Top-left to bottom-right diagonal
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [2, 4, 6], // Top-right to bottom-left diagonal
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
];

const resetGame = () => {
  turnO = true; // Resetting turn to O
  count = 0; // Resetting move count
  enableBoxes(); // Enabling all boxes for a new game
  msgContainer.classList.add("hide"); // Hiding message container
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) { // If it's O's turn
      box.classList.add("o"); // Add 'o' class for blue color
      box.innerText = "O"; // Setting text content to O
      turnO = false; // Changing turn to X's
    } else { // If it's X's turn
      box.classList.add("x"); // Add 'x' class for red color
      box.innerText = "X"; // Setting text content to X
      turnO = true; // Changing turn to O's
    }
    box.disabled = true; // Disabling the box after click
    count++; // Incrementing move count

    let isWinner = checkWinner(); // Checking if there's a winner after each move

    if (count === 9 && !isWinner) { // If all moves are made and there's no winner
      gameDraw(); // Declaring the game as draw
    }
  });
});


const gameDraw = () => { // Function to handle game draw
  msg.innerText = `Game was a Draw.`; // Setting draw message
  msgContainer.classList.remove("hide"); // Showing message container
  disableBoxes(); // Disabling all boxes
};

const disableBoxes = () => { // Function to disable all boxes
  for (let box of boxes) {
    box.disabled = true; // Disabling each box
  }
};

const enableBoxes = () => { // Function to enable all boxes
  for (let box of boxes) {
    box.disabled = false; // Enabling each box
    box.innerText = ""; // Clearing text content of each box
  }
};

const showWinner = (winner) => { // Function to display winner
  msg.innerText = `Congratulations, Winner is ${winner}`; // Setting winner message
  msgContainer.classList.remove("hide"); // Showing message container
  disableBoxes(); // Disabling all boxes
};

const checkWinner = () => { // Function to check for a winner
  for (let pattern of winPatterns) { // Looping through all winning patterns
    let pos1Val = boxes[pattern[0]].innerText; // Getting value of first position in pattern
    let pos2Val = boxes[pattern[1]].innerText; // Getting value of second position in pattern
    let pos3Val = boxes[pattern[2]].innerText; // Getting value of third position in pattern

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") { // If all positions are not empty
      if (pos1Val === pos2Val && pos2Val === pos3Val) { // If all positions have the same value
        showWinner(pos1Val); // Showing winner based on value
        return true; // Returning true for winner found
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame); // Adding click event listener for new game button
resetBtn.addEventListener("click", resetGame); // Adding click event listener for reset button
