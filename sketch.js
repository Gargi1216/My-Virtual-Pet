//Create variables here
var dog, happyDog, database, foodS, foodStock;
function preload()
{
  //load images here
  dog_img = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(250,200,20,20);
  dog.addImage(dog_img);
  dog.scale = 0.3;

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
  }
  text("Note: Press Up Arrow key to feed Tommy milk",200,450);
  text("Food remaining:"+foodS, 100,50)

  drawSprites();
  //add styles here
  textSize(60);
  fill(77,136,185);
  stroke(5);
  


}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  } else{
    x = x-1;
  }

  database.ref('/').update({
    Food : x
  })
}


