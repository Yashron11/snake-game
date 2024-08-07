//Game Constants and variables
let inputDir = {x: 0, y:0};
const foodSound = new Audio('food.wav');
const gameOverSound = new Audio('gameover.wav');
const moveSound = new Audio('move.wav');
const bgSound = new Audio('bgmusic.mp3');
let speed = 7;
let score = 0;
lastPaintTime = 0;
let snakeArr = [
    {x:13, y:15}//array coz it consumes food and will grow continuously
]
food = {x:6, y:7};//food is not array coz it has only one element


//Game Functions
function main(ctime){
    window.requestAnimationFrame(main);//use for anim rendering better than setInterval()
    //console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){ //condition when rendering is not required
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}


function isCollide(snake){
    //If you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }   
    }
    //If go outside boundary
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0){
        return true;
    }
}


function gameEngine(){
    // Part 1: Updating the snake array & food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        moveSound.pause();
        bgSound.pause();
        inputDir = {x: 0, y:0};
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x:13, y:15}];
        moveSound.play();
        bgSound.play();
        score = 0;
    }


    //If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem("High_Score", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "High_Score: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
    }


    //Moving the snake
    for (let i = snakeArr.length-2; i >= 0; i--) {
        //const element = array[i];
        snakeArr[i+1] = {...snakeArr[i]};//see use of ... for new object

    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;



    // Part 2: Display the snake and food
    //Display the snake 
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}


//Main logic starts here
let hiscore = localStorage.getItem("High_Score");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("High_Score", JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High_Score: " + hiscoreval;
}



window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x:0, y:1} //Start the game
    moveSound.play();
    bgSound.play();

    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;
            
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});