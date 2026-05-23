let turnDecider = 'X';
let turnDeciderClass = "playerX";
let turnCounter = 0;
let gameActive = true;
let boardState = [];
let markIdentifier = {
	X: 1,
	O: 2
}

//—————————————————————————————————————————————————————

// create board
let board = document.getElementById("game-board");
let playerTurnIndicator = document.getElementById("player-turn-indicator");
let grid = [];
for (let i = 0; i < 9; i++) {
	let tile = document.createElement("div");
	tile.classList.add("tile");
	tile.setAttribute("id", i);

	board.appendChild(tile);
	boardState.push(0);

	grid.push(tile);
	grid[i].addEventListener("click", registerMark);
}

//—————————————————————————————————————————————————————

// game will react when tile is clicked
function registerMark(event) {
	let selectedTileNumber = Number(event.target.id);
	if (boardState[selectedTileNumber]) return;
	
	boardState[selectedTileNumber] = markIdentifier[turnDecider];
	turnCounter++;
	displayMark(selectedTileNumber);
	registerTurn();
	checkGameState();
}

function registerTurn() {
	if (turnCounter % 2 === 0) {
		turnDecider = 'X';
		turnDeciderClass = "playerX";
		playerTurnIndicator.textContent = 'X';
		playerTurnIndicator.className = turnDeciderClass;
	}
	else {
		turnDecider = 'O';
		turnDeciderClass = "playerO";
		playerTurnIndicator.textContent = 'O';
		playerTurnIndicator.className = turnDeciderClass;
	}
}

function displayMark(stn) {
	let markTile = grid[stn];
	markTile.textContent = turnDecider;
	markTile.classList.add(turnDeciderClass);
}

function checkGameState() {
	//check vertcally
	for (let i = 0; i < 3; i++) {
		let initMark = boardState[i];
		let identicalCounter = 0;
		for (let t = i; t <= (i + 6); t+=3) {
			if (boardState[t] === initMark && boardState[t]) identicalCounter++;
		}

		if (identicalCounter === 3) {
			declareTerminalState();
			return;
		}
	}

	//check horizontally
	for (let i = 0; i <= 6; i+=3) {
		let initMark = boardState[i];
		let identicalCounter = 0;
		for (let t = i; t < (i + 3); t++) {
			if (boardState[t] === initMark && boardState[t]) identicalCounter++;
		}

		if (identicalCounter === 3) {
			declareTerminalState();
			return;
		}
	}

	//check diagonally
	let initMark = boardState[0];
	let identicalCounter = 0;
	for (let i = 0; i < 9; i+=4) {
		if (boardState[i] === initMark && boardState[i]) identicalCounter++;
	}
	if (identicalCounter === 3) {
		declareTerminalState();
		return;
	}

	initMark = boardState[2];
	identicalCounter = 0;
	for (let i = 2; i <= 6; i+=2) {
		if (boardState[i] === initMark && boardState[i]) identicalCounter++;
	}
	if (identicalCounter === 3) {
		declareTerminalState();
		return;
	}
}

function declareTerminalState() {
	document.body.style.backgroundColor = "red";
}

//—————————————————————————————————————————————————————