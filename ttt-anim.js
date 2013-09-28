var game = {
	playerWins: 0,
	ComputerWins: 0,
	BOARD_SIZE: 9,
	board: [],
	UNOCCUPIED: ' ',
	HUMAN: 'X',
	COMPUTER: 'O',
	playerTurn: true,
	//playerImage: new Image(),
	playerImage: { src:"x.png" },
	//computerImage: new Image(),
	computerImage: { src:"o.png" }
};

game.NewGame = function()
{
	
	for (i = 0; i < game.BOARD_SIZE; i++)
	{
		game.board[i] = game.UNOCCUPIED;
		document.images[i].src = "blank.png";
	}

	$('#gameBoard').fadeOut('slow').fadeIn('slow');
	
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
	//c = document.getElementById("myCanvas");
	//ctx = c.getContext("2d");
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
		$('#' + pos + 'square').hide();
		document.images[pos].src = game.playerImage.src;
		
		game.playerTurn = !game.playerTurn;
		
		// If the game's not over, make computer move in one second 
		if (!game.GameOver())			
		{	
			$('#' + pos + 'square').show('normal').queue(function() {
			$('#turnInfo').html("Computer's Turn").removeClass('human').addClass('computer'),$(this).dequeue();});
			setTimeout(game.MakeComputerMove, 1000);		
		}
		else
		$('#' + pos + 'square').show('normal');
	}	
}

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
		$('#' + move + 'square').hide();
		document.images[move].src = game.computerImage.src;
	}
	
	if (!game.GameOver())
	{
		game.playerTurn = !game.playerTurn;
		$('#' + move + 'square').show('normal').queue(function() {
		$('#turnInfo').html("Your Turn").removeClass('computer').addClass('human'),$(this).dequeue();});
	}
	else
	$('#' + move + 'square').show('normal');
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
		if ($turnInfo.hasClass('computer') || $turnInfo.hasClass('human'))
			$('#turnInfo').html("It's a Tie").removeClass('computer').removeClass('human');	
	}	
	else if (ret == 2)
	{
		game.playerWins++;
		$('#turnInfo').html("You Won!").addClass('human');
		
		$('#turnInfo').animate( { fontSize: '24pt', top: '135px'}, 1000 );
		$('#turnInfo').queue(function() { $(this).css('font-weight', 'bold')
										  $(this).dequeue();});
		$('#turnInfo').queue(function() { $(this).css('border-color', 'red')
										  $(this).css('border-style', 'solid')
										  $(this).dequeue();}, 1000);
		$('#turnInfo').animate( { borderWidth: '15px', fontSize: '12pt' }, 1000);
		$('#turnInfo').animate( { borderWidth: '0px', borderStyle: 'none', fontSize: '24pt' }, 1000);
		$('#turnInfo').animate( { fontWeight: 'normal'});								  
		$('#turnInfo').animate( { fontSize: '12pt', top: '350px' }, 1000 );
		
		
		document.getElementById("win").play();
		$('#HumanWins').html("Human Wins: " + game.playerWins);
		
		$('#myCanvas').removeClass('resetZ').addClass('changeZ');
		
		// set points for human horizontal wins
		if(game.board[0] == game.HUMAN && game.board[1] == game.HUMAN && game.board[2] == game.HUMAN)
		{
			y1 = (i+36);
			x2 = 270;
			y2 = y1;
		}
		else if(game.board[3] == game.HUMAN && game.board[4] == game.HUMAN && game.board[5] == game.HUMAN)
		{
			//x1 = 0;
			y1 = (i+136);
			x2 = 270;
			y2 = y1;
		}
		else if(game.board[6] == game.HUMAN && game.board[7] == game.HUMAN && game.board[8] == game.HUMAN)
		{
			y1 = (i+236);
			x2 = 270;
			y2 = y1;
		}
		//set points for human vertical wins
		else if(game.board[0] == game.HUMAN && game.board[3] == game.HUMAN && game.board[6] == game.HUMAN)
		{
			x1 = (i+36);
			x2 = x1;
			y2 = 270;
		}
		else if(game.board[1] == game.HUMAN && game.board[4] == game.HUMAN && game.board[7] == game.HUMAN)
		{
			x1 = (i+136);
			x2 = x1;
			y2 = 270;
		}
		else if(game.board[2] == game.HUMAN && game.board[5] == game.HUMAN && game.board[8] == game.HUMAN)
		{
			x1 = (i+236);
			x2 = x1;
			y2 = 270;
		}
		//line for human diagonal wins
		else if(game.board[0] == game.HUMAN && game.board[4] == game.HUMAN && game.board[8] == game.HUMAN)
		{
			x2 = 270;
			y2 = 270;
		}
		else if(game.board[2] == game.HUMAN && game.board[4] == game.HUMAN && game.board[6] == game.HUMAN)
		{
			x1 = 270;
			y2 = 270;
		}
		ctx.beginPath();
		ctx.moveTo(x1,y1);
		ctx.lineTo(x2,y2);
		ctx.strokeStyle = "FireBrick";
		ctx.lineWidth = 3;
		ctx.stroke();
	}
	else if (ret == 3)
	{
		game.ComputerWins++;
		$('#turnInfo').html("The Computer Won!").addClass('computer');
		
		$('#turnInfo').animate( { fontSize: '24pt', top: '135px'}, 1000 );
		$('#turnInfo').queue(function() { $(this).css('font-weight', 'bold')
										  $(this).dequeue();});
		$('#turnInfo').queue(function() { $(this).css('border-color', 'blue')
										  $(this).css('border-style', 'solid')
										  $(this).dequeue();}, 1000);
		$('#turnInfo').animate( { borderWidth: '15px', fontSize: '12pt' }, 1000);
		$('#turnInfo').animate( { borderWidth: '0px', fontSize: '24pt' }, 1000);
		$('#turnInfo').animate( { fontWeight: 'normal'});								  
		$('#turnInfo').animate( { fontSize: '12pt', top: '350px' }, 1000 );
			
		document.getElementById("lose").play();
		$('#ComputerWins').html("Computer Wins: " + game.ComputerWins);
		
		$('#myCanvas').removeClass('resetZ').addClass('changeZ');
		
		// set points for computer horizontal wins
		if(game.board[0] == game.COMPUTER && game.board[1] == game.COMPUTER && game.board[2] == game.COMPUTER)
		{
			y1 = (i+36);
			x2 = 270;
			y2 = y1;
		}
		else if(game.board[3] == game.COMPUTER && game.board[4] == game.COMPUTER && game.board[5] == game.COMPUTER)
		{
			y1 = (i+136);
			x2 = 270;
			y2 = y1;
		}
		else if(game.board[6] == game.COMPUTER && game.board[7] == game.COMPUTER && game.board[8] == game.COMPUTER)
		{
			y1 = (i+236);
			x2 = 270;
			y2 = y1;
		}
		//set points for computer vertical wins
		else if(game.board[0] == game.COMPUTER && game.board[3] == game.COMPUTER && game.board[6] == game.COMPUTER)
		{
			x1 = (i+36);
			x2 = x1;
			y2 = 270;
		}
		else if(game.board[1] == game.COMPUTER && game.board[4] == game.COMPUTER && game.board[7] == game.COMPUTER)
		{
			x1 = (i+136);
			x2 = x1;
			y2 = 270;
		}
		else if(game.board[2] == game.COMPUTER && game.board[5] == game.COMPUTER && game.board[8] == game.COMPUTER)
		{
			x1 = (i+236);
			x2 = x1;
			y2 = 270;
		}
		//line for computer diagonal wins
		else if(game.board[0] == game.COMPUTER && game.board[4] == game.COMPUTER && game.board[8] == game.COMPUTER)
		{
			x2 = 270;
			y2 = 270;
		}
		else if(game.board[2] == game.COMPUTER && game.board[4] == game.COMPUTER && game.board[6] == game.COMPUTER)
		{
			x1 = 270;
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
game.start = function()
{
    // Register all event listeners
	for (var i = 0; i < 9; i++)
		$('#' + i + 'square').click(game.MakeMove);
	$('#newgame').click(game.NewGame);
	c = document.getElementById("myCanvas");
	ctx = c.getContext("2d");
	
	game.NewGame();
}

$(game.start);