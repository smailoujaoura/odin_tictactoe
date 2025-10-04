import { homeView, gameView, gameoverView } from "./views.js";
import { game } from "./game.js"


const mainElement = document.querySelector(".main-view");
function homeRoute() {
	mainElement.innerHTML = homeView();

	document.querySelector(".inputnamesformbtn").addEventListener("click", (e) => {
		e.preventDefault();
		
		const player1 = document.getElementById("player1").value;
		const player2 = document.getElementById("player2").value;
		if (!player1.trim() || !player2.trim()) {
			alert("Please enter names for both players.");
			return;
		} else if (player1.trim() === player2.trim()) {
			alert("Players names must be differnt from each other.");
			return;
		}
		game.setPlayer(player1, 'X');
		game.setPlayer(player2, 'O');
		route("/game");
	});
}

function gameRoute() {
	mainElement.innerHTML = gameView(game.getPlayers(), game.getCurrentPlayer());

	document.querySelectorAll(".cell").forEach((cell) => {
		cell.addEventListener("click", (e) => {
			const index = parseInt(e.target.dataset.index);
			const mark = game.placeXorO(index);
			if (mark) {
				e.target.textContent = mark;
				e.target.dataset.mark = mark;

				const winner = game.checkWinner();
				if (winner !== undefined) {
					route("/gameover");
				} else {
					const currentPlayer = game.getCurrentPlayer();
					const players = game.getPlayers();
					document.querySelector(".turn-indicator").textContent = `Turn: ${players[currentPlayer]} (${currentPlayer})`;
				}
			}
		});
	});

	document.querySelector(".resetbtn").addEventListener("click", () => {
		game.resetGame();
		route('/game');
	});
}

function gameoverRoute() {
	const winner = game.checkWinner();

	if (winner === undefined) {
		route("/");
		return;
	}

	mainElement.innerHTML = gameoverView(game.checkWinner());

	document.querySelector(".playagain").addEventListener("click", () => {
		game.resetGame();
		route("/");
	});
}

function notFoundRoute() {
	mainElement.innerHTML = `<h1>404 Not Found</h1>`;
}

function route(path) {
	window.location.hash = path;
}

function handleLocation() {
	const path = window.location.hash.slice(1) || '/';
	switch(path) {
		case "/": homeRoute(); break;
		case "/game": gameRoute(); break;
		case "/gameover": gameoverRoute(); break;
		default: notFoundRoute();
	}
};
window.onhashchange = handleLocation;
window.onload = handleLocation;

document.addEventListener("click", (e) => {
	if (e.target.matches('a[href^="/"]')) {
		e.preventDefault();
		route(e.target.getAttribute('href'));
	}
});