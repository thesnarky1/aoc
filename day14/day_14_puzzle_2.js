var Reindeer = function(name, speed, endurance, rest) {
  this._name = name;
  this._speed = speed;
  this._distancePossible = endurance;
  this._restNeeded = rest;
  this._distanceFlown = 0;
  this._points = 0;
  this._flightTime = 0;
  this._restTime = 0;
}

Reindeer.prototype.addPoint = function() {
  this._points++;
}

Reindeer.prototype.getPoints = function() {
  return this._points;
}

Reindeer.prototype.getDistanceFlown = function() {
  return this._distanceFlown;
}

Reindeer.prototype.getRestTime = function() {
  return this._restTime;
}

Reindeer.prototype.getRestNeeded = function() {
  return this._restNeeded;
}

Reindeer.prototype.getFlightTime = function() {
  return this._flightTime;
}

Reindeer.prototype.getDistancePossible = function() {
  return this._distancePossible;
}

Reindeer.prototype.canFlyMore = function() {
  return (this.getFlightTime() < this.getDistancePossible());
}

Reindeer.prototype.needsMoreRest = function() {
  return (this.getRestTime() < this.getRestNeeded());
}

Reindeer.prototype.getSpeed = function() {
  return this._speed;
}

Reindeer.prototype.addDistance = function(speed) {
  this._distanceFlown += speed;
}

Reindeer.prototype.fly = function() {
  this.addDistance(this.getSpeed());
  this._flightTime++;
}

Reindeer.prototype.rest = function() {
  this._restTime++;
}

Reindeer.prototype.resetCounters = function() {
  this._restTime = 0;
  this._flightTime = 0;
}

Reindeer.prototype.doTick = function() {
  if(this.canFlyMore()) {
    this.fly();
  } else if(this.needsMoreRest()) {
    this.rest();
  } else {
    this.resetCounters();
    this.fly();
  }
}

var reindeerGames = [];
reindeerGames.push(new Reindeer("Dancer", 27, 5, 132));
reindeerGames.push(new Reindeer("Cupid", 22, 2, 41));
reindeerGames.push(new Reindeer("Rudoplh", 11, 5, 48));
reindeerGames.push(new Reindeer("Donner", 28, 5, 134));
reindeerGames.push(new Reindeer("Dasher", 4, 16, 55));
reindeerGames.push(new Reindeer("Blitzen", 14, 3, 38));
reindeerGames.push(new Reindeer("Prancer", 3, 21, 40));
reindeerGames.push(new Reindeer("Comet", 18, 6, 103));
reindeerGames.push(new Reindeer("Vixen", 18, 5, 84));

//console.log(reindeerGames);
var length = 2503;
for(var x = 0; x < length; x++) {
  var longest = 0;
  for(var y = 0; y < reindeerGames.length; y++) {
    var tmpReindeer = reindeerGames[y];
    tmpReindeer.doTick();
    var tmpDistance = tmpReindeer.getDistanceFlown();
    if(tmpDistance >= longest) {
      longest = tmpDistance;
    }
  }
  for(var y = 0; y < reindeerGames.length; y++) {
    var tmpReindeer = reindeerGames[y];
    if(tmpReindeer.getDistanceFlown() == longest) {
      tmpReindeer.addPoint();
    }
  }
}
//console.log("--");
console.log(reindeerGames);
var mostPoints = 0;
for(var y = 0; y < reindeerGames.length; y++) {
  var tmpReindeer = reindeerGames[y];
  var tmpPoints = tmpReindeer.getPoints();
  if(tmpPoints > mostPoints) {
    mostPoints = tmpPoints;
  }
}

console.log(mostPoints);
