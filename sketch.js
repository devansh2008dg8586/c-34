var ball;
var database,position;

function setup(){
    //in order to establish the connection between code and data base we use firebase.database
    database=firebase.database();
    createCanvas(500,500);

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    
    //in order to connect to the data base and refer the table ball/position we use ref command
    var ballPosition=database.ref("ball/position");
    //in order to read the data values we use on function here readposition and showError are the funct() 
    ballPosition.on("value",readPosition,showError);

}

function draw(){
    background("white");
    if(position!==undefined){
        if(keyDown(LEFT_ARROW)){
            changePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            changePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            changePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            changePosition(0,+1);
        }
    }
    
    drawSprites();
}

function changePosition(x,y){
    //for every change in position (x,y)the data base has to updated using set command
    database.ref("ball/position").set({
        "x":position.x+x,
        "y":position.y+y
    });
}
//read position is the funct to retrieve (to get the data)from data base 
function readPosition(data){

    position=data.val();
    ball.x=position.x;
    ball.y=position.y

}
//if in case the data base coudn't be found or we coudn't read the data show error funct willl be called
function showError(){

    console.log("there is an error in dataBase connection");


}


