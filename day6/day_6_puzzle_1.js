var lightsOn = 0;
var size = 1000;
var commandRegex = /(.+) (\d+),(\d+) through (\d+),(\d+)/;

var lights = [];
for(var x = 0; x < size; x++) {
  lights[x] = [];
  for(var y = 0; y < size; y++) {
    lights[x][y] = 0;
  }
}

console.log("Done with initialization");

var allText = $('pre').innerHTML.split("\n");
for(var i = 0; i < allText.length; i++) {
  var text = allText[i];
  var commandMatches = commandRegex.exec(text);
  var command = commandMatches[1];
  var startX = parseInt(commandMatches[2]);
  var startY = parseInt(commandMatches[3]);
  var endX = parseInt(commandMatches[4]);
  var endY = parseInt(commandMatches[5]);

  for(var x = startX; x <= endX; x++) {
    for(var y = startY; y <= endY; y++) {
      if(command == "toggle") {
        //console.log("Toggling " + x + "," + y);
        if(lights[x][y] == 0) {
          lights[x][y] = 1;
        } else if(lights[x][y] == 1) {
          lights[x][y] = 0;
        }
      } else if(command == "turn on") {
        //console.log("Turning on " + x + "," + y);
        lights[x][y] = 1;
      } else if(command == "turn off") {
        //console.log("Turning ooff " + x + "," + y);
        lights[x][y] = 0;
      }
    }
  }
}

console.log("Counting what's on");
for(var x = 0; x < size; x++) {
  for(var y = 0; y < size; y++) {
    if(lights[x][y] == 1) {
      lightsOn++;
    }
  }
}
console.log(lightsOn);
