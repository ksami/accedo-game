var GRID_ROWS = 4;
var GRID_COLS = 4;
var GRID_SIZE = 100;  // px
var TIME_VISIBLE = 750;  // ms
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
var COLOR_CURSOR = "#ff0000";

// Populate grid with random paired colors
var availableColors = _.take(COLORS, GRID_ROWS*GRID_COLS/2);
var actual = _.chunk(_.shuffle(_.concat(availableColors, availableColors)), GRID_ROWS);
var covers = [];
var panels = [];

// Draw grid
for (var i = 0; i < GRID_ROWS; i++) {
  covers[i] = [];
  panels[i] = [];

  for (var j = 0; j < GRID_COLS; j++) {
    var rect = new Rectangle(new Point(j*GRID_SIZE, i*GRID_SIZE), new Size(GRID_SIZE, GRID_SIZE));
    var panel = new Path.Rectangle(rect);
    panel.strokeColor = COLOR_BORDER;
    panel.fillColor = actual[i][j];
    
    var cover = panel.clone();
    cover.fillColor = COLOR_COVER;
    
    covers[i][j] = cover;
    panels[i][j] = panel;
  }

}

// Draw cursor
var cursor = new Path.Rectangle(new Rectangle(new Point(0, 0), new Size(GRID_SIZE, GRID_SIZE)));
cursor.strokeColor = COLOR_CURSOR;
cursor.strokeWidth = 2;
cursor.i = 0;
cursor.j = 0;



function onKeyDown(event){
  var key = event.key;
  
  if(key === "up" && cursor.i > 0){
    cursor.i--;
    cursor.position -= new Point(0, GRID_SIZE);
  }
  else if(key === "down" && cursor.i < GRID_ROWS-1){
    cursor.i++;
    cursor.position += new Point(0, GRID_SIZE);
  }

  if(key === "left" && cursor.j > 0){
    cursor.j--;
    cursor.position -= new Point(GRID_SIZE, 0);
  }
  else if(key === "right" && cursor.j < GRID_COLS-1){
    cursor.j++;
    cursor.position += new Point(GRID_SIZE, 0);
  }
}

var openPanels = [];

function onKeyUp(event){
  var key = event.key;
  var isNotSamePanel = (openPanels.length === 0) || !(openPanels[0].i === cursor.i && openPanels[0].j === cursor.j);

  if(key === "enter" &&
    isNotSamePanel &&
    panels[cursor.i][cursor.j].visible &&
    covers[cursor.i][cursor.j].visible){

    covers[cursor.i][cursor.j].visible = false;
    openPanels.push({i: cursor.i, j: cursor.j});

    // 2 panels open
    if(openPanels.length !== 0 && openPanels.length%2 === 0){
      var prev = openPanels.shift();
      var curr = openPanels.shift();

      // Correctness condition
      if(actual[prev.i][prev.j] === actual[curr.i][curr.j]){
        panels[prev.i][prev.j].visible = false;
        panels[curr.i][curr.j].visible = false;

        // Game end
        if(_.every(panels, function(row){return _.every(row, function(p){return !p.visible;});})){
          console.log("Game end");
        }

      }
      else{
        setTimeout(function(){
          covers[prev.i][prev.j].visible = true;
          covers[curr.i][curr.j].visible = true;
          paper.view.draw();
        }, TIME_VISIBLE);
      }

    }

  }
}