var debug = false

var readString = function(start) {
  if(debug) {
    console.log("Starting with " + start);
  }
  var toReturn = "";
  var x = 0;
  while(x < start.length) {
    var thisChar = start[x];
    var y = x + 1;
    if(debug) {
      console.log("Character " + x + " was " + thisChar);
    }
    if(y < start.length && start[y] == thisChar) {
      if(debug) {
        console.log("--Following character was the same, checking how many there are.");
      }
      while(y < start.length && start[y] == thisChar) {
        y++;
      }
      var difference  = y - x;
      if(debug) {
        console.log("--I saw " + difference + " more of " + thisChar);
      }
      toReturn += difference;
      toReturn += thisChar;
      x = y - 1;
    } else {
      toReturn += "1" + thisChar;
    }
    x++;
  }
  return toReturn;
}

var iterate = function(seedString, num) {
  var toDo = seedString;
  for(var x = 1; x <= num; x++) {
    if(debug) {
      console.log("\n---\nChecking " + toDo + " as iteration " + x + " of " + num);
    }
    toDo = readString(toDo);
    if(debug) {
      console.log("--The result was " + toDo);
    }
  }
  if(debug) {
    console.log("The final answer was " + toDo);
  }
  return toDo;
}

var longString = iterate("1321131112", 50);
console.log("Final answer has " + longString.length + " digits");
