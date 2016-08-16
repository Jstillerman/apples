// create a wrapper around native canvas element (with id="c")
var canvas = new fabric.Canvas('canvasID', {
   backgroundColor: 'rgb(30, 30, 30)'
});

// create a rectangle object
var Fruit = (color) => {
  return new fabric.Rect({
    left: 100,
    top: 100,
    fill: color,
    width: 20,
    height: 20
  });
}

var Basket = (left) => {
  return new fabric.Rect({
    left: left,
    top: 440,
    fill: "red",
    width: 40,
    height: 40
  })
}

var Text = (text, left) => {
  return new fabric.Text(text, {left:left, top: 460, fontSize: 20, fill: "White"});
}

// "add" rectangle onto canvas

fruits = [];

lBasket = Basket(100);
rBasket = Basket(400);
tText = Text("Trash", 100);
rText = Text("Recycling", 400);

canvas.add(lBasket, rBasket, tText, rText);

tick = function () {
  if(Math.random() > 0.4){
    var fruit = Fruit(Math.random() > 0.5? "green":"red");
    putInRow(fruit, "left");
    fruits.push(fruit);
    canvas.add(fruit);
  }

  if(Math.random() > 0.4){
    var fruit = Fruit(Math.random() > 0.5? "green":"red");
    putInRow(fruit, "right");
    fruits.push(fruit);
    canvas.add(fruit);
  }

  fruits.map(moveDown(60)).forEach(check);

  canvas.renderAll();
}

function check(fruit){
  if(fruit.top >=440){
    if(fruit.side=="left"){
      console.log(fruit.fill == lBasket.fill? null : "LEFT IS DEAD");
    }
    if(fruit.side=="right"){
      console.log(fruit.fill != rBasket.fill ? null : "RIGHT IS DEAD");
    }
    canvas.remove(fruit);
    fruits.splice(fruits.indexOf(fruit), 1);
  }
}

var moveDown = function(amount){
  return function(fruit){
    fruit.set({top: fruit.top+amount});
    return fruit;
  }
}

function putInRow(fruit, side){
  if(side == "right") fruit.left = 400;
  fruit.side = side;
}

function flip(basket){
  basket.set({fill:(basket.fill == "red" ? "green" : "red")});
  canvas.renderAll();
}

setInterval(tick, 1600);

window.addEventListener("keydown", function(e){
  if(e.keyCode == 65) flip(lBasket)
  if(e.keyCode == 68) flip(rBasket)
});
