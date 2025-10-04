export function homeView() {
	return `
		<div class="howtoplay">How to Play</div>
		<div class="howtoplay-description">Tic-Tac-Toe is a game for two players, X and O, who take turns marking the spaces in a 3x3 grid. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game.</div>
		<div class="inputnames">
			<form class="inputnamesform">
				<input type="text" name="player1" id="player1" placeholder="Player 1 Name">
				<br>
				<input type="text" name="player2" id="player2" placeholder="Player 2 Name">
				<br>
				<button type="submit" class="inputnamesformbtn">Start Game</button>
			</form>
		</div>
	`;
}

export function gameView(players, currentPlayer) {
	return `
	<div class="players-info">
		<div class="player">${players.X} (X)</div>
		<div class="player">${players.O} (O)</div>
	</div>
	<div class="turn-indicator">Turn: ${players[currentPlayer]} (${currentPlayer})</div>
	<div class="board">
		<div class="cell" data-index="0"></div>
		<div class="cell" data-index="1"></div>
		<div class="cell" data-index="2"></div>
		<div class="cell" data-index="3"></div>
		<div class="cell" data-index="4"></div>
		<div class="cell" data-index="5"></div>
		<div class="cell" data-index="6"></div>
		<div class="cell" data-index="7"></div>
		<div class="cell" data-index="8"></div>
	</div>
	<button class="resetbtn">Reset Game</button>
	`;
}

export function gameoverView(winner) {
	const message = winner === null ? "It's a Draw!" : `${winner} Wins!`;
	return `
		<div class="winner">${message}</div>
		<button class="playagain">Play Again</button>
	`;
}
