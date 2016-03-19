var GRID_ROWS = 4;
var GRID_COLS = 4;
var SIZE = 100;
var COLORS = [
  "#966fd6",
  "#ff6961",
  "#03c03c",
  "#779ecb",
  "#f49ac2",
  "#ffb347",
  "#836953",
  "#fdfd96"
];
var COLOR_BORDER = "#000000";
var COLOR_COVER = "#cfcfc4";
var COLOR_DONE = "#dfdfdf";

var actual = _.shuffle(_.concat(COLORS, COLORS));
var covers = [];

for (var i = 0; i < GRID_ROWS; i++) {
  covers[i] = [];

  for (var j = 0; j < GRID_COLS; j++) {
    var rect = new Rectangle(new Point(j*SIZE, i*SIZE), new Size(SIZE, SIZE));
    var panel = new Path.Rectangle(rect);
    panel.strokeColor = "black";
    panel.fillColor = actual[i*GRID_ROWS+j];
    
    var cover = panel.clone();
    cover.fillColor = COLOR_COVER;
    
    covers[i][j] = cover;
  }

}


var cursor = new Path.Rectangle(new Rectangle(new Point(0, 0), new Size(SIZE, SIZE)));
cursor.strokeColor = "red";
cursor.fillColor = "white";
cursor.opacity = 0.45;
cursor.i = 0;
cursor.j = 0;


function onKeyDown(event){
  var key = event.key;
  
  if(key === "up" && cursor.i > 0){
    cursor.i--;
    cursor.position -= new Point(0, SIZE);
  }
  else if(key === "down" && cursor.i < GRID_ROWS-1){
    cursor.i++;
    cursor.position += new Point(0, SIZE);
  }

  if(key === "left" && cursor.j > 0){
    cursor.j--;
    cursor.position -= new Point(SIZE, 0);
  }
  else if(key === "right" && cursor.j < GRID_COLS-1){
    cursor.j++;
    cursor.position += new Point(SIZE, 0);
  }
}

var openPanels = [];

function onKeyUp(event){
  var key = event.key;

  if(key === "enter"){
    covers[cursor.i][cursor.j].visible = false;
    openPanels.push({i: cursor.i, j: cursor.j});

    if(openPanels.length !== 0 && openPanels.length%2 === 0){
      var timer = setTimeout(function(){
        var prev = openPanels.shift();
        var curr = openPanels.shift();
        covers[prev.i][prev.j].visible = true;
        covers[curr.i][curr.j].visible = true;
        console.log("timer done");
      }, 1000);
      console.log(timer);
    }

  }
}