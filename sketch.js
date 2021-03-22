var dog,HungryDog,HappyDog;
var database;
var foodS,foodStock,foodObj;
var lastFed, FeedTime;

function preload(){

  //loading images
  HungryDog = loadImage("images/dogImg.png");
  HappyDog = loadImage("images/dogImg1.png");
	
}

function setup() {
	createCanvas(500, 500);

  database = firebase.database();
  
  foodObj = new Food();

  dog = createSprite(250,250,10,10);
  dog.addImage(HungryDog);
  dog.scale = 0.3;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  //button to feed the dog
  feed = createButton("Feed Scooby Doo");
  feed.position(250,15);
  feed.mousePressed(FeedDog);

  //button to add more food
  add = createButton("Add Food")
  add.position(200,15)
  add.mousePressed(addFood)
  
}


function draw() {  
  background(46,139,87);

  foodObj.display()
 
  drawSprites();
  
  fill(255,255,254);
  textSize(15);

  drawSprites();

}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(HappyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFood(){
  foodS = foodS + 1;
  database.ref('/').update({
    Food: foodS
  })
}

function writeStocks