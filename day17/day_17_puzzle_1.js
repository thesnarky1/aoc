


var getContainersToFill = function(amount, available) {
  var allContainerPossibilities = [];
  if(amount == 0) {
    return allContainerPossibilities;
  } else if(amount < available[available.length - 1]) { //Do we have something smaller than we can hold?
    return null;
  } else if(available.length == 0) { //Do we not have any containers left?
    return null;
  } else { //We should have a amount to fill and containers that might fill it
    while(available.length > 0) {
      var firstContainer = available.shift();
      //console.log("Checking " + firstContainer);
      if(firstContainer > amount) {
        //console.log(firstContainer + " is too big");
      } else if(firstContainer == amount) {
        allContainerPossibilities.push([firstContainer]);
        //console.log(firstContainer + " is just right");
      } else {
        var newAmount = amount - firstContainer;
        //console.log(amount + " minus " + firstContainer + " leaves " + newAmount + " to fill");
        var newContainerPossibilities = getContainersToFill(newAmount, available.slice(0));
        if(newContainerPossibilities != null) {
          for(var x = 0; x < newContainerPossibilities.length; x++) {
            var tmpPossibility = newContainerPossibilities[x];
            tmpPossibility.push(firstContainer);
            allContainerPossibilities.push(newContainerPossibilities[x]);
          }
        }
      }
    }
    //console.log(allContainerPossibilities);
    return allContainerPossibilities;
  }
}

var containers = [47,46,44,44,43,41,38,36,34,31,27,21,17,17,10,9,6,4,4,3];

var testContainers = [30,20,15,10,5,5];
var test = getContainersToFill(150, containers);
console.log(test);
console.log(test.length);
