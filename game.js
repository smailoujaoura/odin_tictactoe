export const game = (function (player1="Player 1", player2="Player 2") {
	let board = Array(9).fill(null);
	let currentPlayer = 'X';
	let players = { X: "Player 1", O: "Player 2"};

	function setPlayer(name, symbol) {
		if (symbol === 'X' || symbol === 'O') {
			players[symbol] = name;
		}
	}

	function getPlayers() {
		return players;
	}

	function getCurrentPlayer() {
		return currentPlayer;
	}

	function placeXorO(index) {
		if (!board[index]) {
			board[index] = currentPlayer;
			currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
			return board[index];
		}
		return null;
	}

	function checkWinner() {
		const winningCombos = [
			[0,1,2],[3,4,5],[6,7,8],
			[0,3,6],[1,4,7],[2,5,8],
			[0,4,8],[2,4,6]
		];

		for (let combo of winningCombos) {
			const [a,b,c] = combo;
			if (board[a] && board[a] === board[b] && board[a] === board[c]) {
				return players[board[a]];
			}
		}
		return board.includes(null) ? undefined: null;
	}

	function resetGame() {
		board = Array(9).fill(null);
		currentPlayer = 'X';
	}

	return {setPlayer, placeXorO, checkWinner, resetGame, getCurrentPlayer, getPlayers}
})();