//Guesses: 1344 (1342?!)

var charactersInMemory = 0;
var charactersLiteral = 0;
var newCharacters = 0;

var fs = require('fs');
fs.readFile('puzzle_one_input.js', function (err, data) {
    if (err) {
      throw err; 
    }
    var input = data.toString();
    var inputLines = input.split("\n");
    for(var x = 0; x < inputLines.length - 1; x++) {
      var currString = inputLines[x];

      var finishedString = currString;
      finishedString = finishedString.replace(/\\/g, "\\\\"); //Remove start quotes
      finishedString = finishedString.replace(/"/g, "\\\""); //Remove start quotes
      finishedString = "\"" + finishedString + "\"";

      var finishedStringInMemory = finishedString.length;
      var currStringLiteralLength = currString.length;
      charactersInMemory += finishedStringInMemory;
      charactersLiteral += currStringLiteralLength;
      newCharacters += (finishedStringInMemory - currStringLiteralLength);
      //console.log("Initial string of: --" + currString + "-- had a length of: " + currStringLiteralLength + " and became string --" + finishedString + "-- with a length of " + finishedStringInMemory);
      //if((currStringLiteralLength - finishedStringInMemory) > 2) {
        console.log("--" + currString + "-- became --" + finishedString + "-- a length of " + finishedStringInMemory);
      //}
    }
    console.log("Total characters in memory: " + charactersInMemory);
    console.log("Total characters literal: " + charactersLiteral);
    console.log("Difference between literal and in memory: " + newCharacters);
});
