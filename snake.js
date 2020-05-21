
function init()
{
	canvas=document.getElementById('mycanvas');
	W=H=canvas.width=canvas.height=1000;
	pen=canvas.getContext('2d');
	cs=67;
	score=5;
	
	//create image object for food
	food_img=new Image();
	food_img.src="Assets/apple.png";

	trophy=new Image();
	trophy.src="Assets/trophy.png";

	game_over=false;

	


	snake ={
		init_len:5,
		color:"blue",
		cells:[],
		direction:"right",
		createSnake:function()
		{
			for(var i=this.init_len;i>0;i--)
			{
				this.cells.push({x:i,y:0});
			}
		},
		check: function(food) 
		{
			for(var i=0;i<this.cells.length;i++)
			{
				if(food.x==this.cells[i].x && food.y==this.cells[i].y)
					return true;
			}
			return false;
		},
		drawSnake:function()
		{
			for(var i=0;i<this.cells.length;i++)
			{
				pen.fillStyle= this.color;
				pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
			}
		},
		updateSnake: function()
		{
			//update snake if it eats food
			var headX=this.cells[0].x;
			var headY=this.cells[0].y;
			if(headX==food.x && headY==food.y)
			{
				console.log("Food eaten");
				food=getRandomFood();
				score++;
			}
			else
			{
				this.cells.pop(); 
			}

			//updating for turns
			console.log("updating snake");
			
			var nextX,nextY;
			if(this.direction=="right")
			{
				nextX=headX+1;
				nextY=headY;
			}
			else if(this.direction=="left")
			{
				nextX=headX-1;
				nextY=headY;
			}
			else if(this.direction=="down")
			{
				nextX=headX;
				nextY=headY+1;
			}
			else if(this.direction=="up")
			{
				nextX=headX;
				nextY=headY-1;
			}
			this.cells.unshift({x:nextX,y:nextY});


			//end loop

			var last_x=Math.round(W/cs);
			var last_y=Math.round(H/cs);
			if(this.cells[0].y<0 || this.cells[0].x<0 || this.cells[0].x>last_x || this.cells[0].y>last_y)
			{
				game_over=true;
			}
		},
	}; 
	food= getRandomFood();

	snake.createSnake();

	//Add Event Listener on Document object
	function keyPressed(e)
	{
		if((e.key=="ArrowRight" || e.key=='d') && snake.direction!="left")
		{
			snake.direction="right";
		}
		else if((e.key=="ArrowLeft"|| e.key=='a') && snake.direction!="right")
		{
			snake.direction="left";
		}
		else if((e.key=="ArrowDown"|| e.key=='s') && snake.direction!="up")
		{
			snake.direction="down";
		}
		else if((e.key=="ArrowUp"|| e.key=='w') && snake.direction!="down")
		{
			snake.direction="up";
		}
	}

	document.addEventListener('keydown',keyPressed );
}

function draw()
{
	//erase.old frame
	pen.clearRect(0,0,W,H);


	snake.drawSnake();
	
	//food printing
	pen.fillStyle=food.color;
	pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
	

	pen.drawImage(trophy,18,20,cs,cs);
	//scoe printing
	pen.fillStyle="blue";
	pen.font=="20x Roboto";
	pen.fillText(score-5,50,50);
}

function update()
{
	snake.updateSnake();
	
}

function getRandomFood()
{
	var foodX=Math.round( Math.random()*(W-cs)/cs);
	var foodY=Math.round( Math.random()*(H-cs)/cs);
	var food={
		x:foodX,
		y:foodY,
		color:"red",
	}
	if(snake.check(food))
	{
		return getRandomFood();
	}
	return food; 
}

function gameloop()
{
	if(game_over==true)
	{
		clearInterval(f);
		alert("Game over"); 
		//if(alert('Alert For your User!')){}
		//else   
		 window.location.reload();
		r//eturn;
	}
	draw();
	update();
}


init();

var f=setInterval(gameloop,100);