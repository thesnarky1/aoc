var Light = function() {
  this._state = 0;
  this._nextState = 0;
}

Light.prototype.getNextState = function() {
  return this._nextState;
}

Light.prototype.getState = function() {
  return this._state;
}

Light.prototype.setState = function(state) {
  this._state = state;
}

Light.prototype.setNextState = function(state) {
  this._nextState = state;
}

Light.prototype.toggleLight = function() {
  this._state = (this._state ? 0 : 1)
}

Light.prototype.turnLightOn = function() {
//  console.log("Turning on!");
  this._state = 1;
}

Light.prototype.turnLightOff = function() {
//  console.log("Turning off!");
  this._state = 0;
}

var LightGrid = function(width, height) {
  this._array = [];
  for(var x = 0; x < height; x++) {
    this._array[x] = [];
    for(var y = 0; y < width; y++) {
      this._array[x][y] = new Light();
    }
  }
  //console.log(this._array);
}

LightGrid.prototype.getLight = function(x, y) {
  return this._array[x][y];
}

LightGrid.prototype.turnLightOn = function(x, y) {
  this.getLight(x, y).turnLightOn();
}

LightGrid.prototype.turnLightOff = function(x, y) {
  this.getLight(x, y).turnLightOff();
}

LightGrid.prototype.prepareNextStep = function() {
  for(var x = 0; x < this._array.length; x++) {
    for(var y = 0; y < this._array.length; y++) {
      var tmpLight = this.getLight(x, y);
      var neighborsOn = this.countNeighborsOn(x, y);
      if(tmpLight.getState()) {
        if(neighborsOn >= 2 && neighborsOn <= 3) {
          tmpLight.setNextState(1);
        } else {
          tmpLight.setNextState(0);
        }
      } else {
        if(neighborsOn == 3) {
          tmpLight.setNextState(1);
        } else {
          tmpLight.setNextState(0);
        }
      }
    }
  }
}

LightGrid.prototype.doNextStep = function() {
  for(var x = 0; x < this._array.length; x++) {
    for(var y = 0; y < this._array.length; y++) {
      var tmpLight = this.getLight(x, y);
      tmpLight.setState(tmpLight.getNextState());
    }
  }
}

LightGrid.prototype.countNeighborsOn = function(x, y) {
  var toCount = this.getNeighbors(x, y);
  console.log(toCount);
  var count = 0;
  for(var x = 0; x < toCount.length; x++) {
    if(toCount[x].getState()) {
      count++;
    }
  }
  return count;
}

LightGrid.prototype.getNeighbors = function(x, y) {
  var toReturn = [];
  if(x > 0 && x < this._array.length && y > 0 && y < this._array.length) {
    toReturn.push(this.getLight(x - 1, y - 1));
    toReturn.push(this.getLight(x - 1, y));
    toReturn.push(this.getLight(x - 1, y + 1));
    toReturn.push(this.getLight(x, y - 1));
    toReturn.push(this.getLight(x, y + 1));
    toReturn.push(this.getLight(x + 1, y - 1));
    toReturn.push(this.getLight(x + 1, y));
    toReturn.push(this.getLight(x + 1, y + 1));
  } else {
    if(x > 0) {
      toReturn.push(this.getLight(x - 1, y));
    }
    if(x < this._array.length) {
      toReturn.push(this.getLight(x + 1, y));
    }
    if(y > 0) {
      toReturn.push(this.getLight(x, y - 1));
    }
    if(y < this._array.length) {
      toReturn.push(this.getLight(x, y + 1));
    }
    if(x > 0 && y > 0) {
      toReturn.push(this.getLight(x - 1, y - 1));
    }
    if(x < this._array.length && y < this._array.length) {
      toReturn.push(this.getLight(x + 1, y + 1));
    }
    if(x > 0 && y < this._array.length) {
      toReturn.push(this.getLight(x - 1, y + 1));
    }
    if(x < this._array.length && y > 0) {
      toReturn.push(this.getLight(x + 1, y - 1));
    }
  }
  return toReturn;
}

var fs = require('fs');
fs.readFile('test_input.js', function(err, data) {
  if(err) { throw err; }

  var input = data.toString();
  var inputLines = input.split("\n");
  var height = inputLines.length - 1;
  var width = inputLines[0].length;
  var lightGrid = new LightGrid(width, height);

  for(var x = 0; x < height; x++) {
    var tmpLine = inputLines[x];
    for(var y = 0; y < width; y++) {
      var thisLight = tmpLine[y];
      if(thisLight == '#') {
        lightGrid.turnLightOn(x, y);
      } else if(thisLight == '.') {
        lightGrid.turnLightOff(x, y);
      } else {
        console.log("Busted character? " + thisLight);
      }
    }
  }

  lightGrid.prepareNextStep();
  lightGrid.doNextState();

});
