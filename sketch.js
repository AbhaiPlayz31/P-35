//Create variables here
var dog, dogImg, happyDog;

var foodS, foodStock;

var database;

var fedTime, lastFed;

var foodObj;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  canvas = createCanvas(1000,500);

  database = firebase.database();

  foodObj = new Food();

  // foodStock = database.ref("Food");
  // foodStock.on("value", readStock);
  // foodStock.set(20);
  
  dog = createSprite(800,220,150,150);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  
  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw(){  

  background("green");

 fedTime = database.ref("FeedTime");
 fedTime.on("value", function(data){
    lastFed = data.val();
 })
    fill(255,255,254);
    textSize(15);

  if(lastFed >= 12){
  text("Last Feed : " + lastFed%12 + "PM", 350,30);
    }else if(lastFed == 0){
      text("Last Feed : 12 AM", 350,30);
    }else{
      text("Last Feed : " + lastFed + "AM", 350,30);
  }

  foodObj.display();
  drawSprites();

}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()- 1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime:hour()
    })
}

function addFoods(){
  foodS ++;
  // foodObj.updateFoodStock(foodObj.getFoodStock()+ 1);
  database.ref('/').update({
    Food: foodS
  })
}