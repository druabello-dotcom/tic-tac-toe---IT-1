let turnDecider = 'X';
let turnCounter = 0;
let gameActive = true;
let markIdentifer = {
	x: 1,
	o: 2
}
let boardState = [];

// create board
let board = document.getElementById("game-board");
for (let i = 0; i < 9; i++) {
	let tile = document.createElement("div");
	tile.classList.add("tile");

	board.appendChild(tile);
	boardState.push(i);
}