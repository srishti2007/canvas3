var drawing = [];
var new_drawing = [];
var canvas;
var database;

function setup(){

    canvas = createCanvas(displayWidth+20, displayHeight);

    database = firebase.database();

    var button = createButton('clear');
    button.position(width/2, height/1.1);
    button.mousePressed(clearDrawing);
}

function mouseDragged(){

    var point={
    x : mouseX,
    y : mouseY
  }
  drawing.push(point);
  var drawingRef = database.ref('drawing');
  drawingRef.set({
    "d":drawing
  })
} 

function draw(){
  background(0);

  readData();

  beginShape();

  strokeWeight(4);

  stroke("pink");

  fill(0);
  for(var i = 0; i< new_drawing.length; i++){
    vertex(new_drawing[i].x, new_drawing[i].y);

    endShape();

  }
}

function readData(){
  database.ref('drawing').on('value', (data) =>{
    new_drawing = data.val().d;
  })
}

function clearDrawing(){
  drawing = [];
  var clear = database.ref('drawing');
  clear.remove();
}