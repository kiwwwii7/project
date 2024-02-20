let btnRef = document.querySelectorAll(".button-option");
let restartBtn = document.getElementById("restart");
let playerXScoreDisplay = document.getElementById("playerXScore");
let playerOScoreDisplay = document.getElementById("playerOScore");

// Winning pattern array
let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];

// Player 'X' plays first
let xTurn = true;
let count = 0;
let playerXScore = 0;
let playerOScore = 0;

// Function to disable all buttons
const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
};

// Function to enable all buttons
const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });
};

// Function to display the winner message
const displayWinnerMessage = (letter) => {
    if (letter == "X") {
        console.log("'X' Wins");
        playerXScore++;
        playerXScoreDisplay.innerText = playerXScore;
    } else {
        console.log("'O' Wins");
        playerOScore++;
        playerOScoreDisplay.innerText = playerOScore;
    }
};

// Function to check for a win
const winChecker = () => {
    for (let pattern of winningPattern) {
        let [a, b, c] = pattern;
        if (
            btnRef[a].innerText &&
            btnRef[a].innerText === btnRef[b].innerText &&
            btnRef[a].innerText === btnRef[c].innerText
        ) {
            displayWinnerMessage(btnRef[a].innerText);
            disableButtons();
            return true;
        }
    }
    if (count === 9) {
        console.log("It's a Draw");
    }
    return false;
};

// Function to check for a winning move or block player's winning move
const checkWinningMove = (letter) => {
    for (let pattern of winningPattern) {
        let [a, b, c] = pattern;
        if (
            btnRef[a].innerText === letter &&
            btnRef[b].innerText === letter &&
            !btnRef[c].innerText
        ) {
            btnRef[c].innerText = 'O';
            count++;
            return true;
        }
        if (
            btnRef[a].innerText === letter &&
            btnRef[c].innerText === letter &&
            !btnRef[b].innerText
        ) {
            btnRef[b].innerText = 'O';
            count++;
            return true;
        }
        if (
            btnRef[b].innerText === letter &&
            btnRef[c].innerText === letter &&
            !btnRef[a].innerText
        ) {
            btnRef[a].innerText = 'O';
            count++;
            return true;
        }
    }
    return false;
};

// Function for the computer's move
const computerMove = () => {
    // Check for winning move
    if (!checkWinningMove('O')) {
        // Check for player's winning move and block it
        if (!checkWinningMove('X')) {
            // If no winning move or blocking move, make a move that tries to create a winning combination
            let moveMade = false;
            for (let pattern of winningPattern) {
                let [a, b, c] = pattern;
                if (
                    btnRef[a].innerText === 'O' &&
                    btnRef[b].innerText === 'O' &&
                    !btnRef[c].innerText
                ) {
                    btnRef[c].innerText = 'O';
                    moveMade = true;
                    break;
                }
                if (
                    btnRef[a].innerText === 'O' &&
                    btnRef[c].innerText === 'O' &&
                    !btnRef[b].innerText
                ) {
                    btnRef[b].innerText = 'O';
                    moveMade = true;
                    break;
                }
                if (
                    btnRef[b].innerText === 'O' &&
                    btnRef[c].innerText === 'O' &&
                    !btnRef[a].innerText
                ) {
                    btnRef[a].innerText = 'O';
                    moveMade = true;
                    break;
                }
            }
            // If no move made to win, block, or create a winning combination, make a random move
            if (!moveMade) {
                let emptyCells = Array.from(btnRef).filter(cell => !cell.innerText);
                let randomIndex = Math.floor(Math.random() * emptyCells.length);
                emptyCells[randomIndex].innerText = 'O';
            }
            count++;
        }
    }
    winChecker();
};

// Event listeners for button clicks
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn && !element.innerText) {
            element.innerText = "X";
            count++;
            if (!winChecker()) {
                setTimeout(computerMove, 500); // Delay the computer's move for 500 milliseconds
            }
        }
    });
});

// Event listener for Restart button
restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});
