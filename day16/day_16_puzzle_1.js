var Sue = function(num, children, cats, samoyeds, pomeranians, akitas, vizslas, goldfish, trees, cars, perfumes) {
  this._num = num;
  this._children = children;
  this._cats = cats;
  this._samoyeds = samoyeds;
  this._pomeranians = pomeranians;
  this._akitas = akitas;
  this._vizslas = vizslas;
  this._goldfish = goldfish;
  this._trees = trees;
  this._cars = cars;
  this._perfumes = perfumes;
}

Sue.prototype.getAttrib = function(name) {
  if(name == "children") { return this._children; }
  if(name == "cats") { return this._cats; }
  if(name == "samoyeds") { return this._samoyeds; }
  if(name == "pomeranians") { return this._pomeranians; }
  if(name == "akitas") { return this._akitas; }
  if(name == "vizslas") { return this._vizslas; }
  if(name == "goldfish") { return this._goldfish; }
  if(name == "trees") { return this._trees; }
  if(name == "cars") { return this._cars; }
  if(name == "perfumes") { return this._perfumes; }
}

var sueRegex = /^Sue (\d+): ([a-z0-9,: ]+)$/;
var attribRegex = /^\s*([a-z]+): ([0-9]+)\s*$/;

var allSues = [];

var perfectSue = new Sue(0, 3, 7, 2, 3, 0, 0, 5, 3, 2, 1);

var fs = require('fs');
fs.readFile('input.js', function (err, data) {
  if(err) { throw err; }

  var input = data.toString();
  var sues = input.split("\n");
  for(var x = 0; x < sues.length; x++) {
    var tmpSue = sues[x];
    var tmpMatches = sueRegex.exec(tmpSue);
    if(tmpMatches) {
      var possibleSue = true;
      var attributes = tmpMatches[2];
      var attributeArr = attributes.split(",");
      //console.log(attributeArr);
      for(var y = 0; y < attributeArr.length; y++) {
        var tmpAttribArr = attribRegex.exec(attributeArr[y]);
        var tmpAttribName = tmpAttribArr[1];
        var tmpAttribCount = tmpAttribArr[2];
        var perfectSueCount = perfectSue.getAttrib(tmpAttribName);
        if(tmpAttribName == "cats" || tmpAttribName == "trees") {
          if(tmpAttribCount <= perfectSueCount) {
            possibleSue = false;
          }
        } else if(tmpAttribName == "pomeranians" || tmpAttribName == "goldfish") {
          if(tmpAttribCount >= perfectSueCount) {
            possibleSue = false;
          }
        } else {
          if(perfectSue.getAttrib(tmpAttribName) != tmpAttribCount) {
            possibleSue = false;
          }
        }
      }
      if(possibleSue) {
        console.log("Possible sue : " + x + "!");
        var tmpSue = new Sue(x + 1, 3, 7, 2, 3, 0, 0, 5, 3, 2, 1);
        allSues.push(tmpSue);
      }
    } else {
      //console.log("Error in matching --" + tmpSue + "--");
    }
  }
  console.log(allSues);
});

