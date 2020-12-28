var database;
var playerCount = 0
const World = Matter.World
const Engine = Matter.Engine
const Bodies = Matter.Bodies
const Constraint = Matter.Constraint

var gameState = "PLAY"
var bg, heart;
var myEngine, myWorld
var p = []
var chain = []
var maxLives = 3

function preload(){
  punch = loadImage("fist.png");
  bg = loadImage("background.jpg");
  blocksImg = loadImage("bricks.png"); 
  heart = loadImage("heart.png");
}

function setup() {
  createCanvas(1100,600);
  myEngine = Engine.create()
  myWorld = myEngine.world

  database = firebase.database()

  Lgroup = createGroup();
  Bgroup = createGroup(); 
  
   
}

function draw() {
  background(bg);
    

  fill("yellow");
  textSize(25);
  text("Life :"+ maxLives, 1000,50 );

 
  Engine.update(myEngine)
  if(gameState === "PLAY"){

    if(p[0].player.position.x > 5 ){
    
    if(keyIsDown(LEFT_ARROW))
    p[0].player.position.x = p[0].player.position.x - 10
    }
   
    if(p[0].player.position.x < 1095) {
    if(keyIsDown(RIGHT_ARROW))
    p[0].player.position.x = p[0].player.position.x + 10
    }
 
    
    spawnBlocks();
    spawnLife();


    if(detectCollision(Lgroup, p[0].player)){
      maxLives = maxLives + 1;
      p.push(new ball(400+3*60,50+(-3*10)))
      
      chain.push(new snake(p[maxLives-2].player,p[maxLives-1].player))
      Lgroup.destroyEach();
    }

    if(detectCollision(Bgroup, p[0].player)){
      maxLives = maxLives - 1;
      Bgroup.destroyEach();
      World.remove(myWorld,p[p.length - 1].player)
      p.pop();
    }

  if(maxLives === 0){
    gameState = "END";
  }
}
else if(gameState === "END"){

Bgroup.setVelocityYEach(0);
Lgroup.setVelocityYEach(0);
Bgroup.setLifetimeEach(-1);
Lgroup.setLifetimeEach(-1);

var resetButton = createButton("Restart");
resetButton.position(width/2,height/2);
resetButton.mousePressed(() => {
   
  location.reload()

})
}

/*for(var i =0;i<chain.length;i++){
  chain[i].display()
}*/
  drawSprites();
}

function spawnBlocks() {
  if(frameCount %80 === 0) {
    var blocks = createSprite(random(20,1080),10,105,105);
    blocks.addImage(blocksImg);
    blocks.scale = 0.5;
    blocks.shapeColor = "red";
    blocks.velocityY  = 7;

    Bgroup.add(blocks);
    blocks.lifetime = 200;
    

  }  
}

function spawnLife(){
  if(frameCount %300 === 0){
    var life = createSprite(random(20,1080),10)
    life.addImage(heart);
    life.scale = 0.2;
    life.velocityY = 7;
    Lgroup.add(life)
    life.lifetime = 200;

  }
}

function detectCollision(group,body){
  for(var i =0; i < group.length;i++){
  if(Math.abs(body.position.y - group[i].y) < 50+105/2 && Math.abs(body.position.x - group[i].x) < 50+105/2){
    return true
    //console.log(" collision")
    //group[i].velocityY = 0
  }
}
}