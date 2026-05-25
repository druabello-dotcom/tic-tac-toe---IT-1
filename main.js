let turnDecider = 'X';
let turnDeciderClass = "playerX";
let turnCounter = 0;
let gameActive = true;
const boardState = [];
const markIdentifier = {
	X: 1,
	O: 2
}

//—————————————————————————————————————————————————————

// create board
const board = document.getElementById("game-board");
const playerTurnIndicator = document.getElementById("player-turn-indicator");
const grid = [];
for (let i = 0; i < 9; i++) {
	let tile = document.createElement("div");
	tile.classList.add("tile");
	tile.setAttribute("id", i);

	board.appendChild(tile);
	boardState.push(0);

	tile.addEventListener("click", registerMark);
}

//—————————————————————————————————————————————————————

// game will react when tile is clicked
function registerMark(event) {
	const selectedTileNumber = Number(event.target.id);
	if (boardState[selectedTileNumber]) return;
	
	boardState[selectedTileNumber] = markIdentifier[turnDecider];
	turnCounter++;
	displayMark(selectedTileNumber);
	checkGameState();
	setTimeout(() => registerTurn(), 50);
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
	let markTile = document.querySelectorAll(".tile")[stn];
	markTile.textContent = turnDecider;
	markTile.classList.add(turnDeciderClass);
}

function checkGameState() {
	let tiles = document.querySelectorAll(".tile");
	if (turnCounter === 9) declareTerminalState();
	
	//check vertcally
	for (let i = 0; i < 3; i++) {
		let initMark = tiles[i].textContent;
		let identicalCounter = 0;
		for (let t = i; t <= (i + 6); t+=3) {
			if (tiles[t].textContent === initMark && tiles[t].textContent !== "") identicalCounter++;
		}

		if (identicalCounter === 3) {
			declareTerminalState();
			return;
		}
	}

	//check horizontally
	for (let i = 0; i <= 6; i+=3) {
		let initMark = tiles[i].textContent;
		let identicalCounter = 0;
		for (let t = i; t < (i + 3); t++) {
			if (tiles[t].textContent === initMark && tiles[t].textContent !== "") identicalCounter++;
		}

		if (identicalCounter === 3) {
			declareTerminalState();
			return;
		}
	}

	//check diagonally
	let initMark = tiles[0].textContent;
	let identicalCounter = 0;
	for (let i = 0; i < 9; i+=4) {
		if (tiles[i].textContent === initMark && tiles[i].textContent !== "") identicalCounter++;
	}
	if (identicalCounter === 3) {
		declareTerminalState();
		return;
	}

	initMark = tiles[2].textContent;
	identicalCounter = 0;
	for (let i = 2; i <= 6; i+=2) {
		if (tiles[i].textContent === initMark && tiles[i].textContent !== "") identicalCounter++;
	}
	if (identicalCounter === 3) {
		declareTerminalState();
		return;
	}
}

function declareTerminalState() {
	document.getElementById("declare-winner-tab").style.display = "flex";
	const winnerText = document.querySelector("#victory-announcer h1 span");
	winnerText.textContent = `${turnDecider}`;
	winnerText.className = turnDeciderClass;
	for (let i = 0; i < 9; i++) {
		boardState[i] = 1;
	}
}

//—————————————————————————————————————————————————————
//functionalize reset button
const resetGameButton = document.getElementsByClassName("reset-game");
for (let i = 0; i < resetGameButton.length; i++) {
	resetGameButton[i].addEventListener("click", resetMarks)
}

function resetMarks() {
	for (let i = 0; i < 9; i++) {
		boardState[i] = 0;
		const currTile = document.querySelectorAll(".tile")[i];
		currTile.textContent = "";
		currTile.className = "tile";
	}
	turnCounter = 0;
	turnDecider = 'X';
	turnDeciderClass = "playerX";
	playerTurnIndicator.textContent = 'X';
	playerTurnIndicator.className = turnDeciderClass;
	setTimeout(() => {
		document.getElementById("declare-winner-tab").style.display = "none";
	}, 125);
}