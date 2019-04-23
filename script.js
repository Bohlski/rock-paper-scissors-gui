const rock = document.querySelector('img[alt="rock"]');
const paper = document.querySelector('img[alt="paper"]');
const scissors = document.querySelector('img[alt="scissors"]');
let playerScore;
let computerScore;

function computerPlay() {
	let possibilities = [rock, paper, scissors];
	let choice = Math.floor(Math.random() * possibilities.length);
	let choiceStyle = possibilities[choice].style;

	if (!choiceStyle.boxShadow) { // If no shadow is already present mark it simple
		choiceStyle.boxShadow = "0px 0px 20px 2px orangered";
	} else {
		choiceStyle.boxShadow = `${choiceStyle.boxShadow}, 0px 0px 20px 2px orangered`;
	}
	return possibilities[choice].alt;
}

function playRound(playerSelection, computerSelection) {
	const ROCK = rock.alt;
	const PAPER = paper.alt;
	const SCISSORS = scissors.alt;
	let result;

	if (playerSelection === ROCK && computerSelection === ROCK ||
		playerSelection === PAPER && computerSelection === PAPER ||
		playerSelection === SCISSORS && computerSelection === SCISSORS) {
			result = 'tie';
	} else if (playerSelection === ROCK && computerSelection === SCISSORS ||
		playerSelection === PAPER && computerSelection === ROCK ||
		playerSelection === SCISSORS && computerSelection === PAPER) {
			result = 'win';
	} else {
		result = 'loss';
	}
	return result;
}

function handleScoring(playerSelection, computerSelection, outcome) {
	let pgraph = document.querySelector('p');
	if (outcome === 'win') {
		playerScore++;
		pgraph.textContent = `You win! ${playerSelection.capitalize()} beats ${computerSelection.capitalize()}`;
	} else if (outcome === 'loss') {
		computerScore++;
		pgraph.textContent = `You lose! ${computerSelection.capitalize()} beats ${playerSelection.capitalize()}`;
	} else {
		pgraph.textContent = `It\'s a tie! You both picked ${playerSelection.capitalize()}!`;
	}
}

function clearMarkings() {
	rock.removeAttribute("style");
	paper.removeAttribute("style");
	scissors.removeAttribute("style");
}

function playerSelect() {
	let playerSelection = this.alt;
	let computerSelection;
	let gameOutcome;

	clearMarkings();

	this.style.boxShadow = "0px 0px 20px 2px greenyellow";
	computerSelection = computerPlay();
	gameOutcome = playRound(playerSelection, computerSelection);
	handleScoring(playerSelection, computerSelection, gameOutcome);
	updateScore();
	winnerFound();
}

function updateScore() {
	let pScore = document.querySelector('.pScore');
	let cScore = document.querySelector('.cScore');
	pScore.textContent = `Player score: ${playerScore}`;
	cScore.textContent = `Computer score: ${computerScore}`;
}

function winnerFound() {
	if (playerScore < 5 && computerScore < 5) {
		return;
	}

	let text = document.createElement('span');
	let retryButton = document.createElement('button');

	rock.removeEventListener('click', playerSelect);
	paper.removeEventListener('click', playerSelect);
	scissors.removeEventListener('click', playerSelect);
	text.style.display = "block";
	text.style.textAlign = "center";
	text.style.marginTop = "80px";
	text.style.fontSize = "2.5em";
	retryButton.textContent = "Retry?";
	retryButton.style.display = "block";
	retryButton.style.margin = "20px auto 0";
	retryButton.style.fontSize = "1.5em";
	retryButton.addEventListener('click', setupGame);

	if (computerScore === 5) {
		text.textContent = "Your opponent was the first to reach 5 points. Better luck next time!";
	} else if (playerScore === 5) {
		text.textContent = "Congratulations you've won this round! You were the first to reach 5 points!";
	}
	document.body.appendChild(text);
	document.body.appendChild(retryButton);
}

function resetScore() {
	playerScore = 0;
	computerScore = 0;
}

function setupGame() {
	if (document.body.lastChild.tagName === 'BUTTON') {
		document.body.removeChild(document.body.lastChild);
		document.body.removeChild(document.body.lastChild);
	} 
	resetScore();
	rock.addEventListener('click', playerSelect);
	paper.addEventListener('click', playerSelect);
	scissors.addEventListener('click', playerSelect);
	updateScore();
}

setupGame();

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
