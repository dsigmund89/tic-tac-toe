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
	computerImage: { src:"o.png" }
};
//function NewGame()
game.NewGame = function()
{
	for (i = 0; i < game.BOARD_SIZE; i++)
	{
		game.board[i] = game.UNOCCUPIED;
		document.images[i].src = "blank.png";
	}
	
	game.playerTurn = true;
	
	//checks to see if turnInfo already has a class
	$turnInfo = $('#turnInfo');
	if ($turnInfo.hasClass('computer'))
		$('#turnInfo').html("Your Turn").removeClass('computer').addClass('human');
	else
		$('#turnInfo').html("Your Turn").addClass('human');
	
	//resets the z index to -1 to be behind the gameboard
	$('#myCanvas').removeClass('changeZ').addClass('resetZ');
	
	//clears the canvas
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.clearRect(0,0,270,270);	

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
			//document.getElementById("turnInfo").innerHTML = "Computer's turn.";
			$('#turnInfo').html("Computer's Turn").removeClass('human').addClass('computer');
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
		//document.getElementById("turnInfo").innerHTML = "Your turn.";
		$('#turnInfo').html("Your Turn").removeClass('computer').addClass('human');
	}
}

// Returns true if game is over and outputs appropriate ending message, otherwise returns false.
//function GameOver()
game.GameOver = function()
{
	x1 = 0;
	y1 = 0;
	x2 = 0;
	y2 = 0;
	ret = game.CheckForWinner();
	if (ret == 1)
	{
		//document.getElementById("turnInfo").innerHTML = "It's a tie!";
		//$('#turnInfo').html("It's a Tie");
		//$turnInfo.hasClass('computer')$turnInfo = $('#turnInfo');
		if ($turnInfo.hasClass('computer') || $turnInfo.hasClass('human'))
			$('#turnInfo').html("It's a Tie").removeClass('computer').removeClass('human');
			
		$('#myCanvas').removeClass('resetZ').addClass('changeZ');		
		ctx.beginPath();
		ctx.moveTo(50,50);
		ctx.lineTo(300,150);
		ctx.strokeStyle = "black";
		ctx.lineWidth = 3;
		ctx.stroke();	
	}	
	else if (ret == 2)
	{
		game.playerWins++;
		$('#turnInfo').html("You Won!").addClass('human');
		document.getElementById("win").play();
		$('#HumanWins').html("Human Wins: " + game.playerWins);
		
		$('#myCanvas').removeClass('resetZ').addClass('changeZ');
		// set points for human horizontal wins
		if(i == 0 && (i+1) == 1 && (i+2) == 2)
		{
			x1 = 0;
			y1 = (i+36);
			x2 = 270;
			y2 = y1;
		}
		else if(i == 3 && (i+1) == 4 && (i+2) == 5)
		{
			x1 = 0;
			y1 = (i+136);
			x2 = 270;
			y2 = y1;
		}
		else if(i == 6 && (i+1) == 7 && (i+2) == 8)
		{
			//x1 = 0;
			y1 = (i+236);
			x2 = 270;
			y2 = y1;
		}
		//set points for human vertical wins
		else if(i == 0 && (i+3) == 3 && (i+6) == 6)
		{
			x1 = (i+36);
			y1 = 0;
			x2 = x1;
			y2 = 270;
		}
		else if(i == 1 && (i+3) == 4 && (i+6) == 7)
		{
			x1 = (i+136);
			y1 = 0;
			x2 = x1;
			y2 = 270;
		}
		else if(i == 2 && (i+3) == 5 && (i+6) == 8)
		{
			x1 = (i+236);
			y1 = 0;
			x2 = x1;
			y2 = 270;
		}
		//line for human diagonal wins
		else if(game.board[0] == game.HUMAN && game.board[4] == game.HUMAN && game.board[8] == game.HUMAN)
		{
			x1 = 0;
			y1 = 0;
			x2 = 270;
			y2 = 270;
		}
		else if(game.board[2] == game.HUMAN && game.board[4] == game.HUMAN && game.board[6] == game.HUMAN)
		{
			x1 = 270;
			y1 = 0;
			x2 = 0;
			y2 = 270;
		}
		ctx.beginPath();
		ctx.moveTo(x1,y1);
		ctx.lineTo(x2,y2);
		ctx.strokeStyle = "red";
		ctx.lineWidth = 3;
		ctx.stroke();
	}
	else if (ret == 3)
	{
		game.ComputerWins++;
		$('#turnInfo').html("The Computer Won!").addClass('computer');
		document.getElementById("lose").play();
		$('#ComputerWins').html("Computer Wins: " + game.ComputerWins);
		
		$('#myCanvas').removeClass('resetZ').addClass('changeZ');
		// set points for computer horizontal wins
		if(i == 0 && (i+1) == 1 && (i+2) == 2)
		{
			x1 = 0;
			y1 = (i+36);
			x2 = 270;
			y2 = y1;
		}
		else if(i == 3 && (i+1) == 4 && (i+2) == 5)
		{
			x1 = 0;
			y1 = (i+136);
			x2 = 270;
			y2 = y1;
		}
		else if(i == 6 && (i+1) == 7 && (i+2) == 8)
		{
			//x1 = 0;
			y1 = (i+236);
			x2 = 270;
			y2 = y1;
		}
		//set points for computer vertical wins
		else if(i == 0 && (i+3) == 3 && (i+6) == 6)
		{
			x1 = (i+36);
			y1 = 0;
			x2 = x1;
			y2 = 270;
		}
		else if(i == 1 && (i+3) == 4 && (i+6) == 7)
		{
			x1 = (i+136);
			y1 = 0;
			x2 = x1;
			y2 = 270;
		}
		else if(i == 2 && (i+3) == 5 && (i+6) == 8)
		{
			x1 = (i+236);
			y1 = 0;
			x2 = x1;
			y2 = 270;
		}
		//line for computer diagonal wins
		else if(game.board[0] == game.COMPUTER && game.board[4] == game.COMPUTER && game.board[8] == game.COMPUTER)
		{
			x1 = 0;
			y1 = 0;
			x2 = 270;
			y2 = 270;
		}
		else if(game.board[2] == game.COMPUTER && game.board[4] == game.COMPUTER && game.board[6] == game.COMPUTER)
		{
			x1 = 270;
			y1 = 0;
			x2 = 0;
			y2 = 270;
		}
		
		
		ctx.beginPath();
		ctx.moveTo(x1,y1);
		ctx.lineTo(x2,y2);
		ctx.strokeStyle = "blue";
		ctx.lineWidth = 3;
		ctx.stroke();
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
		//document.getElementById(i + "square").addEventListener("click", game.MakeMove, false);
		$('#' + i + 'square').click(game.MakeMove);
	//document.getElementById("newgame").addEventListener("click", game.NewGame, false);
	$('#newgame').click(game.NewGame);
	c = document.getElementById("myCanvas");
	ctx = c.getContext("2d");
	
	game.NewGame();
}

//addEventListener("load", game.start, false);
$(game.start);

