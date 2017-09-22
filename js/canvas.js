var drawCanvas = (function() {

	var snakeBody = function(x,y){
		ctx.fillStyle = 'green';
		ctx.fillRect(x*snakeSize,y*snakeSize,snakeSize,snakeSize);
		ctx.strokeStyle = 'darkgreen';
		ctx.strokeRect(x*snakeSize,y*snakeSize,snakeSize,snakeSize);
	}

	var snack = function(x,y){
		ctx.fillStyle = 'black';
		ctx.fillRect(x*snakeSize,y*snakeSize,snakeSize,snakeSize);
		ctx.fillStyle = 'lightyellow';
		ctx.fillRect(x*snakeSize+1,y*snakeSize+1,snakeSize-2,snakeSize-2);
	}

	var showScore = function(){
		var score_text = "Score : " + score;
		ctx.fillStyle = 'white';
		document.getElementById('score').innerHTML = score_text;
	}

	var drawSnake = function(){
		var length = 4;
		snake = [];
		for(var i = length-1;i>=0;i--){
			snake.push({x:i,y:0});
		} 
	}


	var paint = function(){
		ctx.fillStyle='black';
		ctx.fillRect(0,0,w,h);
		ctx.strokeStyle = 'red';
		ctx.strokeRect(0,0,w,h);

		btn.setAttribute('disabled',true);

		var snakeX = snake[0].x;
		var snakeY = snake[0].y;

		if(direction == 'right'){
			snakeX++;
		}
		else if(direction == 'left'){
			snakeX--;
		}
		else if(direction == 'up'){
			snakeY--;
		}
		else if(direction == 'down'){
			snakeY++;
		}

		/* Restart the game*/
		if(snakeX == -1 || snakeX ==w/snakeSize || snakeY == -1 || snakeY == h/snakeSize || checkCollision(snakeX,snakeY,snake)){
			btn.removeAttribute('disabled',true);
			ctx.clearRect(0,0,w,h);
			alert("Game Over!!\n\nYour Score : "+score);
			gameloop = clearInterval(gameloop);
			return;
		}

		if(snakeX == food.x && snakeY == food.y){
			var tail = {x:snakeX,y:snakeY};  //Create a new head instead of moving the tail
			score++;

			createFood(); //Create new food

		}else{
			var tail = snake.pop();
			tail.x =  snakeX;
			tail.y = snakeY;
		}

		snake.unshift(tail); //puts back the tail as the first cell

		for(var i=0;i<snake.length;i++){
			snakeBody(snake[i].x,snake[i].y);
		}
		snack(food.x,food.y);
		showScore();
	}

	var createFood = function(){
		food = {
			x: Math.floor((Math.random()*30)+1),
			y: Math.floor((Math.random()*30)+1)
		}

		for(var i=0;i>snake.length;i++){
			var snakeX = snake[i].x;
			var snakeY = snake[i].y;

			if(food.x===snakeX && food.y===snakeY || food.y===snakeY && food.x===snakeX){
				food.x = Math.floor((Math.random()*30)+1);
				food.y = Math.floor((Math.random()*30)+1);
			}
		}
	}

	var checkCollision = function(x,y,array){
		for(var i=0;i<array.length;i++){
			if(array[i].x === x && array[i].y===y)
				return true;
		}
		return false;
	}

	var init = function(){
		direction = 'down';
		score=0;
		drawSnake();
		createFood();
		gameloop =  setInterval(paint,80);
	}

	return{
		init : init
	};


}());