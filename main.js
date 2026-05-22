// create board
let board = document.getElementById("game-board");
for (let i = 0; i < 9; i++) {
	let tile = document.createElement("div");
	tile.classList.add("tile");
	board.appendChild(tile);
}