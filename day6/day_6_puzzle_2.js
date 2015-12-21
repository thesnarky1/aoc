var lightsOn = 0;
var size = 1000;
var commandRegex = /(.+) (\d+),(\d+) through (\d+),(\d+)/;
var commandMatches = [];
var command = "";
var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;
var brightness = 0;

var lights = [];
for(var x = 0; x < size; x++) {
  lights[x] = [];
  for(var y = 0; y < size; y++) {
    lights[x][y] = 0;
  }
}

console.log("Done with initialization");

var allText = $('pre').innerHTML.split("\n");
for(var i = 0; i < allText.length - 1; i++) {
  var text = allText[i];
  commandMatches = commandRegex.exec(text);
  command = commandMatches[1];
  startX = parseInt(commandMatches[2]);
  startY = parseInt(commandMatches[3]);
  endX = parseInt(commandMatches[4]);
  endY = parseInt(commandMatches[5]);

  for(var x = startX; x <= endX; x++) {
    for(var y = startY; y <= endY; y++) {
      brightness = lights[x][y];
      if(command == "toggle") {
        //console.log("Toggling " + x + "," + y);
        lights[x][y] = brightness + 2;
      } else if(command == "turn on") {
        //console.log("Turning on " + x + "," + y);
        lights[x][y] = brightness + 1;
      } else if(command == "turn off") {
        //console.log("Turning ooff " + x + "," + y);
        if(brightness > 0) { lights[x][y] = brightness - 1; }
      }
    }
  }
}

console.log("Counting what's on");
for(var x = 0; x < size; x++) {
  for(var y = 0; y < size; y++) {
    lightsOn += lights[x][y];
  }
}
console.log(lightsOn);
