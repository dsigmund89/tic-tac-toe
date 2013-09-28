var game = {
	playerWins: 0,
	ComputerWins: 0,
	BOARD_SIZE: 9,
	board: [],
	UNOCCUPIED: ' ',
	HUMAN: 'X',
	COMPUTER: 'O',
	playerTurn: true,
	playerImage: new Image(),
	playerImage: { src:"x.png" },
	computerImage: new Image(),
	computerImage: { src:"o.png" },
};
	
// True if it's the player's turn, false if computer's turn 
//var game.playerTurn = true;

//var game.playerImage = new Image();
//game.playerImage.src = "x.png";

//var game.computerImage = new Image();
//game.computerImage.src = "o.png";

// Represents the game board using characters
//var board = [];

// Characters for the board
//var game.UNOCCUPIED = ' ';
//var game.HUMAN = 'X';
//var game.COMPUTER = 'O';

//var BOARD_SIZE = 9;

// Used to delay computer's move
//var timerId;

//function NewGame()
game.NewGame = function()
{
	for (i = 0; i < game.BOARD_SIZE; i++)
	{
		game.board[i] = game.UNOCCUPIED;
		document.images[i].src = "blank.png";
	}
	
	game.playerTurn = true;
	document.getElementById("turnInfo").innerHTML = "Your turn.";
}

//function MakeMove(e)
game.MakeMove = function(e)
{
	// Determine the position in the array from the square's ID
	var pos = parseInt(e.target.id);	
	
	// Make sure it's the human's move and the position isn't already occupied
	if (game.playerTurn && game.board[pos] == game.UNOCCUPIED)
	{		
		game.board[pos] = game.HUMAN;
		document.images[pos].src = game.playerImage.src;
		game.playerTurn = !game.playerTurn;
		
		// If the game's not over, make computer move in one second 
		if (!game.GameOver())			
		{			
			document.getElementById("turnInfo").innerHTML = "Computer's turn.";	

			// Make the computer move after waiting a second
			setTimeout(game.MakeComputerMove, 1000);		
		}
	}	
}

//function MakeComputerMove()
game.MakeComputerMove = function()
{	
	// Generate random move, but keep count of how many times we try so we avoid
	// accidentally getting stuck in the loop.
	count = 0;
	do
	{
		move = Math.floor(Math.random() * game.BOARD_SIZE);
		count++;
	} while ((game.board[move] == game.HUMAN || game.board[move] == game.COMPUTER) && count < 100);

	if (count == 100)
		alert("There's something wrong... computer can't find an open move.");
	else
	{
		game.board[move] = game.COMPUTER;
		document.images[move].src = game.computerImage.src;
	}
	
	if (!game.GameOver())
	{
		game.playerTurn = !game.playerTurn;
		document.getElementById("turnInfo").innerHTML = "Your turn.";
	}
}

// Returns true if game is over and outputs appropriate ending message, otherwise returns false.
//function GameOver()
game.GameOver = function()
{
	ret = game.CheckForWinner();
	if (ret == 1)
		document.getElementById("turnInfo").innerHTML = "It's a tie!";	
	else if (ret == 2)
	{
		game.playerWins++;
		document.getElementById("turnInfo").innerHTML = "You won!";	
		document.getElementById("win").play();
		document.getElementById("HumanWins").innerHTML = "Human Wins: " + game.playerWins;
	}
	else if (ret == 3)
	{
		game.ComputerWins++;
		document.getElementById("turnInfo").innerHTML = "The computer won!";
		document.getElementById("lose").play();
		document.getElementById("ComputerWins").innerHTML = "Computer Wins: " + game.ComputerWins;
	}
	else
		return false;

	return true;
}

// Check for a winner.  Return
//   0 if no winner or tie yet
//   1 if it's a tie
//   2 if X won
//   3 if O won

//function CheckForWinner()
game.CheckForWinner = function()
{
	// Check for horizontal wins
	for (i = 0; i <= 6; i += 3) 
	{
		if (game.board[i] == game.HUMAN && game.board[i+1] == game.HUMAN && game.board[i+2] == game.HUMAN)
			return 2;
		if (game.board[i] == game.COMPUTER && game.board[i+1] == game.COMPUTER && game.board[i+2] == game.COMPUTER)
			return 3;
	}

	// Check for vertical wins
	for (i = 0; i <= 2; i++) 
	{
		if (game.board[i] == game.HUMAN && game.board[i+3] == game.HUMAN && game.board[i+6] == game.HUMAN)
			return 2;
		if (game.board[i] == game.COMPUTER && game.board[i+3] == game.COMPUTER && game.board[i+6] == game.COMPUTER)
			return 3;
	}

	// Check for diagonal wins
	if ((game.board[0] == game.HUMAN && game.board[4] == game.HUMAN && game.board[8] == game.HUMAN) ||
		(game.board[2] == game.HUMAN && game.board[4] == game.HUMAN && game.board[6] == game.HUMAN))
		return 2;
	if ((game.board[0] == game.COMPUTER && game.board[4] == game.COMPUTER && game.board[8] == game.COMPUTER) ||
		(game.board[2] == game.COMPUTER && game.board[4] == game.COMPUTER && game.board[6] == game.COMPUTER))
		return 3;

	// Check for tie
	for (i = 0; i < game.BOARD_SIZE; i++)
	{
		// If we find a number, then no one has won yet
		if (game.board[i] != game.HUMAN && game.board[i] != game.COMPUTER)
			return 0;
	}

	// If we make it through the previous loop, all places are taken, so it's a tie
	return 1;
}

// This function is called when the web page finishes loading
//function start()
game.start = function()
{
    // Register all event listeners
	for (var i = 0; i < 9; i++)
		document.getElementById(i + "square").addEventListener("click", game.MakeMove, false);
	
	document.getElementById("newgame").addEventListener("click", game.NewGame, false);
	
	game.NewGame();
}

addEventListener("load", game.start, false);


