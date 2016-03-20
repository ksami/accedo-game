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
var COLOR_BUTTON = "#000000";
var COLOR_CURSOR = "#ff0000";
var UI_POS_X = GRID_COLS*GRID_SIZE + 100;  // px
var UI_SIZE_X = 200;  // px

var gameScore = 0;

var availableColors, actual, covers, panels, openPanels;
var gameLayer;

// Populate grid with random paired colors
function newGame(){
  gameLayer = new Layer();

  availableColors = _.take(COLORS, GRID_ROWS*GRID_COLS/2);
  actual = _.chunk(_.shuffle(_.concat(availableColors, availableColors)), GRID_ROWS);
  covers = [];
  panels = [];
  openPanels = [];
  gameScore = 0;
  updateScore(gameScore);

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

  gameLayer.sendToBack();
}

var border, cursor, button, buttonHighlight, buttonText;
var uiLayer;

function drawUi(){
  uiLayer = new Layer();

  border = new Path.Rectangle(new Rectangle(new Point(0, 0), new Size(GRID_SIZE*GRID_COLS, GRID_SIZE*GRID_ROWS)));
  border.strokeColor = COLOR_BORDER;


  // Draw cursor
  cursor = new Path.Rectangle(new Rectangle(new Point(0, 0), new Size(GRID_SIZE, GRID_SIZE)));
  cursor.strokeColor = COLOR_CURSOR;
  cursor.strokeWidth = 2;
  cursor.i = 0;
  cursor.j = 0;
  cursor.isOnButton = false;


  button = new Path.Rectangle(new Rectangle(new Point(UI_POS_X, 350), new Size(200, 50)));
  button.strokeColor = COLOR_BORDER;

  buttonHighlight = button.clone();
  buttonHighlight.strokeColor = COLOR_CURSOR;
  buttonHighlight.strokeWidth = 2;
  buttonHighlight.visible = false;

  buttonText = new PointText(new Point(UI_POS_X+100, 380));
  buttonText.fillColor = COLOR_BUTTON;
  buttonText.justification = "center";
  buttonText.content = "Restart";
  buttonText.fontSize = 25;
}




function onKeyDown(event){
  var key = event.key;
  
  if(key === "up" && cursor.i > 0 && !cursor.isOnButton){
    cursor.i--;
    cursor.position -= new Point(0, GRID_SIZE);
  }
  else if(key === "down" && cursor.i < GRID_ROWS-1 && !cursor.isOnButton){
    cursor.i++;
    cursor.position += new Point(0, GRID_SIZE);
  }

  if(key === "left" && cursor.j > 0 && !cursor.isOnButton){
    cursor.j--;
    cursor.position -= new Point(GRID_SIZE, 0);
  }
  else if(key === "right" && cursor.j < GRID_COLS-1 && !cursor.isOnButton){
    cursor.j++;
    cursor.position += new Point(GRID_SIZE, 0);
  }
  else if(key === "left" && cursor.j === GRID_COLS-1 && cursor.isOnButton){
    buttonHighlight.visible = false;
    cursor.visible = true;
    cursor.isOnButton = false;
  }
  else if(key === "right" && cursor.j === GRID_COLS-1 && !cursor.isOnButton){
    buttonHighlight.visible = true;
    cursor.visible = false;
    cursor.isOnButton = true;
  }
}

function onKeyUp(event){
  var key = event.key;
  var isNotSamePanel = (openPanels.length === 0) || !(openPanels[0].i === cursor.i && openPanels[0].j === cursor.j);
  var isVisiblePanel = panels[cursor.i][cursor.j].visible && covers[cursor.i][cursor.j].visible;

  if(key === "enter" && !cursor.isOnButton && isNotSamePanel && isVisiblePanel){
    covers[cursor.i][cursor.j].visible = false;
    openPanels.push({i: cursor.i, j: cursor.j});

    // 2 panels open
    if(openPanels.length !== 0 && openPanels.length%2 === 0){
      var prev = openPanels.shift();
      var curr = openPanels.shift();

      // Correctness condition
      if(actual[prev.i][prev.j] === actual[curr.i][curr.j]){
        gameScore++;
        updateScore(gameScore);

        panels[prev.i][prev.j].visible = false;
        panels[curr.i][curr.j].visible = false;

        // Game end
        if(_.every(panels, function(row){return _.every(row, function(p){return !p.visible;});})){
          console.log("Game end");
          //TODO: Game end
        }

      }
      else{
        gameScore--;
        updateScore(gameScore);

        setTimeout(function(){
          covers[prev.i][prev.j].visible = true;
          covers[curr.i][curr.j].visible = true;
          paper.view.draw();
        }, TIME_VISIBLE);

      }

    }

  }
  else if(key === "enter" && cursor.isOnButton){
    gameLayer.remove();
    newGame();
  }
}


function updateScore(score){
  document.getElementById("gameScore").innerHTML = score;
}



//////////
// Main //
//////////
newGame();
drawUi();