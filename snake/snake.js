var bw = 500;
var bh = 500;
var p = 10;
var cw = bw + p * 2 + 1;
var ch = bh + p * 2 + 1;
var points = 0;
var seconds = 0;
var moves = 0;
var ctx = document.getElementById("myCanvas").getContext("2d");
var dx;
var dy;
var startx = 228;
var starty = 228;
var newGame = true;
var hasEatenFood = false;
var snake = [];

function drawBoard() {
     snake[0]= { x: 228, y: 228 };
     ctx.strokeStyle = "gray";
     ctx.lineWidth = 1;
     for (var x = 0; x < bw; x += 25) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, 500);
          ctx.stroke();
     }
     for (var j = 0; j < bh; j += 25) {
          ctx.moveTo(0, j);
          ctx.lineTo(500, j);
          ctx.stroke();
     }
     ctx.fillStyle = "rgb(24, 186, 19)";
     ctx.fillRect(startx, starty, 19, 19);
     redMouse();
}
function getRandomInt(max) {
     return Math.floor(Math.random() * Math.floor(max));
}
function redMouse() {
     randomx = getRandomInt(20) * 25 + 3;
     randomy = getRandomInt(20) * 25 + 3;

     ctx.fillStyle = "rgb(255,0,0)";
     if (moves == 0 && randomx == 228 && randomy == 228) {
          ctx.fillRect(randomx + 25, randomy, 19, 19);
     } else {

          ctx.fillRect(randomx, randomy, 19, 19);
     }
     for(let h =0;h<snake.length;h++){
          if (snake[h].x == randomx && snake[h].y == randomy){
               redMouse();
          }
     }
}
// var start = document.getElementById('start')
var timeTitle = document.getElementById("time");
var active = true;
var milliseconds = 0;
var min = 0;
var sec = 0;

function timer() {
     if (newGame == true) {
          if (active == true) {
               active = false;
               moves =0;
               timercycle();

          }
     }
}
function stoptime() {
     if (active == false) {
          active = true;
     }
}
function reset() {
     timeTitle.innerHTML = "<b>Time: 00:00.00</b>";
     document.getElementById("points").innerHTML = "<b>Points: 0</b>"
     min = 0;
     sec = 0;
     milliseconds = 0;
     points = 0;
     startx = 228;
     starty = 228;
     moves = 0;
     newGame = true;
     w=0;
     dx = 0
     dy =0;
     pointThing= null;
     snake.splice(0,snake.length);
     
     clearCanvas();

}
function clearCanvas() {
     ctx.fillStyle = "rgb(0 , 0, 0)";
     ctx.fillRect(0, 0, 500, 500);

     drawBoard()
}

function timercycle() {
     if (active == false) {
          sec = parseInt(sec);
          min = parseInt(min);
          milliseconds = parseInt(milliseconds);
          milliseconds += 1;
          if (milliseconds == 100) {
               sec += 1;
               milliseconds = 0;
          }
          if (sec == 60) {
               min += 1;
               sec = 0;
               milliseconds = 0;
          }

          if (sec < 10 || sec == 0) {
               sec = "0" + sec;
          }
          if (min < 10 || min == 0) {
               min = "0" + min;
          }
          if (milliseconds < 10 || milliseconds == 0) {
               milliseconds = "0" + milliseconds;
          }
          timeTitle.innerHTML =
               "<b>" + "Time: " + min + ":" + sec + "." + milliseconds + "</b>";
          setTimeout(timercycle, 10);
     }
}

document.addEventListener("keydown", checkKey);
function checkKey(e) {
     
     const goingUp = dy === -25;
     const goingDown = dy === 25;
     const goingRight = dx === 25;
     const goingLeft = dx === -25;



     e = e || window.event;
     
     if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
          e.preventDefault();
      }
     if (moves == 0){
           if (e.keyCode == "38" ) {
          // up arrow
          dx = 0;
          dy = -25;
     } else if (e.keyCode == "40" ) {
          // down arrow
          dx = 0;
          dy = 25;
     } else if (e.keyCode == "37") {
          // left arrow
          dx = -25;
          dy = 0;
     } else if (e.keyCode == "39" ) {
          // right arrow
          dx = 25;
          dy = 0;
     }
     }
     if (e.keyCode == "38" && !goingDown ) {
          // up arrow
          dx = 0;
          dy = -25;
     } else if (e.keyCode == "40" && !goingUp) {
          // down arrow
          dx = 0;
          dy = 25;
     } else if (e.keyCode == "37" && !goingRight) {
          // left arrow
          dx = -25;
          dy = 0;
     } else if (e.keyCode == "39" && !goingLeft) {
          // right arrow
          dx = 25;
          dy = 0;
     }
     if (moves == 0) {
          moveSnake()
     }
     moves++;
}
var w = 0;
function moveSnake() {
     if (active == false) {
          if (hasEatenFood == false) {
               ctx.fillStyle = "rgb(0, 0, 0)";
               ctx.fillRect(startx, starty, 19, 19);
          }
          else {
               w++
               let pointThing = {
                    x: startx, y: starty
               }
               snake[w] = pointThing;
               hasEatenFood = false
          }
          
          const goingUp = dy === -25;
          const goingDown = dy === 25;
          const goingRight = dx === 25;
          const goingLeft = dx === -25;
          
          
          ctx.fillStyle = "rgb(24, 186, 19)";
          startx += dx;
          starty += dy;
          const head = {x: snake[0].x + dx, y: snake[0].y + dy};
          snake.unshift(head)
          // for (let z = 0; z < snake.length; z++) {
          //      snake[z].x += dx;
          //      snake[z].y += dy;
          // }
          
          for (let i = 0; i < snake.length; i++) {

               ctx.fillRect(snake[i].x, snake[i].y, 19, 19);
          }
          ctx.fillStyle = "rgb(0, 0, 0)";
          ctx.fillRect(snake[snake.length-1].x, snake[snake.length-1].y, 19, 19);
          snake.splice(snake.length-1,snake.length);
          if (goingDown) {
               // up arrow
               dx = 0;
               dy = 25;
          } else if (goingUp) {
               // down arrow
               dx = 0;
               dy = -25;
          } else if (goingRight) {
               // left arrow
               dx = 25;
               dy = 0;
          } else if (goingLeft) {
               // right arrow
               dx = -25;
               dy = 0;
          }
          if (startx == randomx && starty == randomy) {
               points++;
               document.getElementById("points").innerHTML =
                    "<b>" + "Value: " + points + "</b>";
               hasEatenFood = true
               redMouse();

          }
          for(let h =0;h<snake.length-1;h++){
               if (snake[0].x == snake[h+1].x && snake[0].y == snake[h+1].y && points>2){
                    gameover()
               }
          }
          if (startx >= 500 || starty >= 500 || startx <= 0 || starty <= 0) {
               gameover()
          }
          
          setTimeout(moveSnake, 170);
     }
}

function gameover() {
     ctx.fillStyle = "rgb(0 , 0, 0)";
     ctx.fillRect(0, 0, 500, 500);
     ctx.fillStyle = "rgb(175, 106, 240)";
     ctx.font = "bold 50px 'Boulder', Courier, monospace"
     ctx.textAlign = "center";
     ctx.fillText('Game Over', 250, 250)
     active = true;
     started = false;
     newGame = false;
}

window.onload = drawBoard();