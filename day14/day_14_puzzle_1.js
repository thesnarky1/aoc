var Reindeer = function(name, speed, endurance, rest) {
  this._name = name;
  this._speed = speed;
  this._enduranceLength = endurance;
  this._restTime = rest;
  this._distanceFlown = 0;
  this._points = 0;
}

Reindeer.prototype.doTicks = function(num) {
  var ticks = 0;
  var flyTime = 0;
  var restTime = 0;
  while(ticks < num) {
    if(flyTime < this._enduranceLength) {
      console.log("Flying: " + flyTime + " of " + this._enduranceLength);
      this._distanceFlown += this._speed;
      flyTime++;
    } else if(flyTime == this._enduranceLength) {
      if(restTime < this._restTime) {
        console.log("Resting: " + restTime + " of " + this._restTime);
        restTime++;
      } else if(restTime == this._restTime) {
        restTime = 0;
        flyTime = 0;
        this._distanceFlown += this._speed;
        flyTime++;
      }
    }
    ticks++;
  }
}

Reindeer.prototype.getDistance = function() {
  return this._distanceFlown;
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

console.log(reindeerGames);
var longest = 0;
for(var x = 0; x < reindeerGames.length; x++) {
  reindeerGames[x].doTicks(2503);
  var tmpDist = reindeerGames[x].getDistance();
  if(tmpDist > longest) {
    longest = tmpDist;
  }
}
console.log("--");
console.log(reindeerGames);
console.log(longest);
