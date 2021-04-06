var path,boy,cash,diamonds,jewellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jewelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jewelleryG,swordGroup;
var PLAY=1;
var END=0;
var gameState=1;
function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jewelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  gameoverImage =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(windowWidth/2,windowHeight/2);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,windowHeight-70,20,20);
boy.addAnimation("Running",boyImg);
boy.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jewelleryG=new Group();
swordGroup=new Group();

  gameover=createSprite(width/2-20,height/2);
  gameover.addAnimation("gameover",gameoverImage);
  gameover.scale=1.0;
  gameover.visible=false;
}

function draw() {

  background(0);
  boy.x = World.mouseX;
  if(gameState===PLAY){
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > windowHeight){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJewellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+100
      
    }else if(jewelleryG.isTouching(boy)) {
      jewelleryG.destroyEach();
      treasureCollection=treasureCollection+150
      
    }else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        gameState=END;
      }
    }
  }
else if(gameState===END){
  boy.destroy();
  path.velocityY=0;
  gameover.visible=true;
}
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,width/2-50,30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJewellery() {
  if (World.frameCount % 80 == 0) {
  var jewellery = createSprite(Math.round(random(50, width-50),40, 10, 10));
  jewellery.addImage(jewelleryImg);
  jewellery.scale=0.13;
  jewellery.velocityY = 3;
  jewellery.lifetime = 150;
  jewelleryG.add(jewellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}