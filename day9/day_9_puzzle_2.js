var Galaxy = function() {
  this._locations = [];
}

Galaxy.prototype.getLocation = function(name) {
  for(var x = 0; x < this._locations.length; x++) {
    if(this._locations[x].getName() == name || this._locations[x].getName().toLowerCase() == name) {
      return this._locations[x];
    }
  }
  return false;
}

Galaxy.prototype.addLocation = function(name) {
  var tmpLocation = new Location(name);
  this._locations.push(tmpLocation);
  return tmpLocation;
}

Galaxy.prototype.getAllLocations = function() {
  return this._locations;
}

Galaxy.prototype.addPath = function(start, end, cost) {
  //console.log("Calling add path with start: " + start + " and end: " + end + " costing: " + cost);
  start.addPath(end, cost);
  end.addPath(start, cost);
}

Galaxy.prototype.getShortestPath = function(locationsToVisit, locationsVisited, currCost) {
  if(locationsToVisit.length < 2) {
    return 0;
  }
  if(locationsToVisit.length == 2) {
    var firstStop = locationsToVisit[0];
    var secondStop = locationsToVisit[1];
    return firstStop.getPathCost(secondStop);
  } else {
    var cost = 1000000000;
    for(var x = 0; x < locationsToVisit.length; x++) {
      var tmpLocation = locationsToVisit.shift();
      locationsVisited.push(tmpLocation);
      var tmpCost = currCost + myGalaxy.getShortestPath(locationsToVisit, locationsVisited, currCost);
      if(tmpCost < cost) { cost = tmpCost };
      locationsVisited.pop();
      locationsToVisit.push(tmpLocation);
      return cost;
    }
  }
}

var Location = function(name) {
  this._visited = false;
  this._name = name;
  this._paths = [];
}

Location.prototype.getName = function() {
  return this._name;
}

Location.prototype.addPath = function(target, cost) {
  this._paths[target.getName()] = cost;
}

Location.prototype.getPathCost = function(nextStop) {
  return this._paths[nextStop.getName()];
}

Location.prototype.setVisited = function(bool) {
  this._visited = bool;
}

Location.prototype.getVisited = function() {
  return this._visited;
}

var myGalaxy = new Galaxy();

/*var london = myGalaxy.addLocation("London");
var belfast = myGalaxy.addLocation("Belfast");
var dublin = myGalaxy.addLocation("Dublin");

myGalaxy.addPath(london,dublin,464);
myGalaxy.addPath(london,belfast,518);
myGalaxy.addPath(dublin,belfast,141);*/

var alphacentauri = myGalaxy.addLocation("AlphaCentauri");
var arbre = myGalaxy.addLocation("Arbre");
var faerun = myGalaxy.addLocation("Faerun");
var norrath = myGalaxy.addLocation("Norrath");
var snowdin = myGalaxy.addLocation("Snowdin")
var straylight = myGalaxy.addLocation("Straylight")
var tambi = myGalaxy.addLocation("Tambi");
var tristram = myGalaxy.addLocation("Tristrim");

myGalaxy.addPath(faerun,tristram,65);
myGalaxy.addPath(faerun,tambi,129);
myGalaxy.addPath(faerun,norrath,144);
myGalaxy.addPath(faerun,snowdin,71);
myGalaxy.addPath(faerun,straylight,137);
myGalaxy.addPath(faerun,alphacentauri,3);
myGalaxy.addPath(faerun,arbre,149);
myGalaxy.addPath(tristram,tambi,63);
myGalaxy.addPath(tristram,norrath,4);
myGalaxy.addPath(tristram,snowdin,105);
myGalaxy.addPath(tristram,straylight,125);
myGalaxy.addPath(tristram,alphacentauri,55);
myGalaxy.addPath(tristram,arbre,14);
myGalaxy.addPath(tambi,norrath,68);
myGalaxy.addPath(tambi,snowdin,52);
myGalaxy.addPath(tambi,straylight,65);
myGalaxy.addPath(tambi,alphacentauri,22);
myGalaxy.addPath(tambi,arbre,143);
myGalaxy.addPath(norrath,snowdin,8);
myGalaxy.addPath(norrath,straylight,23);
myGalaxy.addPath(norrath,alphacentauri,136);
myGalaxy.addPath(norrath,arbre,115);
myGalaxy.addPath(snowdin,straylight,101);
myGalaxy.addPath(snowdin,alphacentauri,84);
myGalaxy.addPath(snowdin,arbre,96);
myGalaxy.addPath(straylight,alphacentauri,107);
myGalaxy.addPath(straylight,arbre,14);
myGalaxy.addPath(alphacentauri,arbre,46);

//var shortestPath = myGalaxy.getShortestPath([london,belfast,dublin], [], 0);
//console.log(shortestPath);
var allRoutes = [];
var leastCost = -1;
var tmpGalaxy = myGalaxy.getAllLocations();
for(var x = 0; x < tmpGalaxy.length; x++) {
  var tmpLocation = tmpGalaxy.shift();
  console.log("Starting at " + tmpLocation.getName());
  //allRoutes[tmpLocation.getName()] = [];
  for(var y = 0; y < tmpGalaxy.length; y++) {
    var tmpLocation2 = tmpGalaxy.shift();
    //allRoutes[tmpLocation.getName()][tmpLocation2.getName()] = [];
    for(var z = 0; z < tmpGalaxy.length; z++) {
      var tmpLocation3 = tmpGalaxy.shift();
      //allRoutes[tmpLocation.getName()][tmpLocation2.getName()][tmpLocation3.getName()] = [];
      for(var a = 0; a < tmpGalaxy.length; a++) {
        var tmpLocation4 = tmpGalaxy.shift();
        //allRoutes[tmpLocation.getName()][tmpLocation2.getName()][tmpLocation3.getName()][tmpLocation4.getName()] = [];
        for(var b = 0; b < tmpGalaxy.length; b++) {
          var tmpLocation5 = tmpGalaxy.shift();
          //allRoutes[tmpLocation.getName()][tmpLocation2.getName()][tmpLocation3.getName()][tmpLocation4.getName()][tmpLocation5.getName()] = [];
          for(var c = 0; c < tmpGalaxy.length; c++) {
            var tmpLocation6 = tmpGalaxy.shift();
            //allRoutes[tmpLocation.getName()][tmpLocation2.getName()][tmpLocation3.getName()][tmpLocation4.getName()][tmpLocation5.getName()][tmpLocation6.getName()] = [];
            for(var d = 0; d < tmpGalaxy.length; d++) {
              var tmpLocation7 = tmpGalaxy.shift();
              //allRoutes[tmpLocation.getName()][tmpLocation2.getName()][tmpLocation3.getName()][tmpLocation4.getName()][tmpLocation5.getName()][tmpLocation6.getName()][tmpLocation7.getName()] = [];
              for(var e = 0; e < tmpGalaxy.length; e++) {
                var tmpLocation8 = tmpGalaxy.shift();
                var route = tmpLocation.getName() + " -> " + tmpLocation2.getName() + " -> " + 
                            tmpLocation3.getName() + " -> " + tmpLocation4.getName() + " -> " + 
                            tmpLocation5.getName() + " -> " + tmpLocation6.getName() + " -> " + 
                            tmpLocation7.getName() + " -> " + tmpLocation8.getName();
                //console.log(route);
                //allRoutes[tmpLocation.getName()][tmpLocation2.getName()][tmpLocation3.getName()][tmpLocation4.getName()][tmpLocation5.getName()][tmpLocation6.getName()][tmpLocation7.getName()][tmpLocation8.getName()] = 
                var tmpCost = tmpLocation.getPathCost(tmpLocation2) + 
                tmpLocation2.getPathCost(tmpLocation3) + 
                tmpLocation3.getPathCost(tmpLocation4) + 
                tmpLocation4.getPathCost(tmpLocation5) + 
                tmpLocation5.getPathCost(tmpLocation6) + 
                tmpLocation6.getPathCost(tmpLocation7) + 
                tmpLocation7.getPathCost(tmpLocation8);
                if(leastCost == -1) { leastCost = tmpCost; }
                if(tmpCost > leastCost) {
                  console.log("New greatest! " + route + ": " + tmpCost);
                  leastCost = tmpCost;
                }
                if(allRoutes[route]) { console.log("Duplicate found!"); break;}
                allRoutes[route] = tmpCost;
                tmpGalaxy.push(tmpLocation8);
              }
              tmpGalaxy.push(tmpLocation7);
            }
            tmpGalaxy.push(tmpLocation6);
          }
          tmpGalaxy.push(tmpLocation5);
        }
        tmpGalaxy.push(tmpLocation4);
      }
      tmpGalaxy.push(tmpLocation3);
    }
    tmpGalaxy.push(tmpLocation2);
  }
  tmpGalaxy.push(tmpLocation);
}

//console.log(allRoutes);
