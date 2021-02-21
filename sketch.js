var dog, happyDog, database, foodS, foodStock
var feedDog
var addFood
var fedTime, lastFed
var foodObj



function preload()
{
  dog=loadImage( "images/dogImg1.png")
  happyDog=loadImage ( "images/dogImg.png")
}

function setup() {
  database=firebase.database()
  createCanvas(500,500);
  pet=createSprite(250,300,150,150)
  pet.addImage (dog)
  
  pet.scale=0.15

  foodStock=database.ref('Food');
    foodStock.on("value", readStock)

    foodObj = new Food()

    feed=createButton("Feed The Dog");
    feed.position(630,65);
    feed.mousePressed(feedDog);

    addFood=createButton("Add Food");
    addFood.position(730,65);
    addFood.mousePressed(addFood);

  
}


function draw() {  
  background(46,139,87)

  if (keyDown("UP_ARROW")){
    writeStock(foodS);
    pet.addImage(happyDog)
  }

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Fed : "+ lastFed%12 + "PM", 70,30);
  } else if (lastFed==0){
    text("Last Fed : 12 AM",350,30);
  } else {
    text("Last Fed : "+ lastFed + "AM", 70,30);
  }

  //drawSprites();
  //textSize(20)
  //fill("white")
  //text("Press UP Arrow Key To Feed The Dog",130,10,300,20)

  textSize(20)
  fill("white")
  text("Food Remaining:  20",160,120,400,200)

  pet.display();
  foodObj.display();
  feed.display();
  addFood.display();
  fedTime.display();
  lastFed.display();

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  } else{
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update
}


function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    fedTime:hour()
  })
}