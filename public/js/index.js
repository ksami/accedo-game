var GRID_ROWS = 4;
var GRID_COLS = 4;
var SIZE = 50;
var COLORS = [
  "#000000",
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#ff00ff",
  "#00ffff",
  "#ffffff"
];
var COLOR_BORDER = "#000000";
var COLOR_BACK = "#888888";
var COLOR_HIDDEN = "#cccccc";

for (var i = 0; i < GRID_ROWS; i++) {
  for (var j = 0; j < GRID_COLS; j++) {
    var rect = new Rectangle(new Point(i*SIZE, j*SIZE), new Size(SIZE, SIZE));
    var panel = new Path.Rectangle(rect);
    panel.strokeColor = "black";
    panel.fillColor = COLORS[((i*GRID_ROWS)+j)%8];
  }
}