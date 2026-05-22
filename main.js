let turnDecider = 'X';
let turnCounter = 0;
let gameActive = true;
let boardState = [];
let markIdentifier = {
	X: 1,
	O: 2
}

// create board
let board = document.getElementById("game-board");
for (let i = 0; i < 9; i++) {
	let tile = document.createElement("div");
	tile.classList.add("tile");
	tile.setAttribute("id", i);

	board.appendChild(tile);
	boardState.push(0);
}

function registerTurn() {
	if (turnCounter % 2 === 0) turnDecider = 'X';
	else turnDecider = 'O';
}

// game will react when tile is clicked
function registerMark(event) {
	let selectedTile = Number(event.target.id);
	if (boardState[selectedTile]) return;
	
	boardState[selectedTile] = markIdentifier[turnDecider];
	turnCounter++;
	registerTurn(turnCounter);
}

let grid = Array.from(document.querySelectorAll(".tile"));
for (let i = 0; i < 9; i++) {
	grid[i].addEventListener("click", registerMark);
}