var instructions = "";
var knownRegisters = [];
var unknownRegisters = [];

var inputRegRegex = /^([a-z]+) -> ([a-z]+)$/;
var inputDecRegex = /^(\d+) -> ([a-z]+)$/;
var andRegRegex = /^([a-z]+) AND ([a-z]+) -> ([a-z]+)$/;
var andDecRegex = /^(\d+) AND ([a-z]+) -> ([a-z]+)$/;
var orRegex = /^([a-z]+) OR ([a-z]+) -> ([a-z]+)$/;
var leftRegex = /^([a-z]+) LSHIFT (\d+) -> ([a-z]+)$/;
var rightRegex = /^([a-z]+) RSHIFT (\d+) -> ([a-z]+)$/;
var notRegex = /^NOT ([a-z]+) -> ([a-z]+)$/;

var repititions = 0;
var unsolved = 0;

var fs = require('fs');
fs.readFile('puzzle_one_input.js', function (err, data) {
    if (err) {
      throw err; 
    }

    instructions = data.toString();
    var allInstructions = instructions.split("\n");
    for(var x = 0; x < allInstructions.length - 1; x++) {
      var currInstruction = allInstructions[x];
      unknownRegisters.push(currInstruction);
    }

    while(unknownRegisters.length > 0 && unsolved < unknownRegisters.length + 2) {
    //console.log(knownRegisters);
    //console.log(unknownRegisters);

      //console.log("Repitition: " + repititions + " has " + unknownRegisters.length + " unknown registers. It has been " + unsolved + " since a solution.");
      currInstruction = unknownRegisters.shift();

      var matches = [];
      if(matches = inputDecRegex.exec(currInstruction)) {
        //console.log("Input regex matches " + matches);
        var number = parseInt(matches[1]);
        var targetRegister = matches[2];
        knownRegisters[targetRegister] = number;
        unsolved = 0;
      } else if(matches = inputRegRegex.exec(currInstruction)) {
        var operandRegister = matches[1];
        var targetRegister = matches[2];
        if(knownRegisters[operandRegister] !== undefined) {
          knownRegisters[targetRegister] = knownRegisters[operandRegister];
          unsolved = 0;
        } else {
          unknownRegisters.push(operandRegister + " -> " + targetRegister);
        }
      } else if(matches = andDecRegex.exec(currInstruction)) {
        //console.log("AND regex matches " + matches);
        var number = parseInt(matches[1]);
        var operandRegister2 = matches[2];
        var targetRegister = matches[3];
        if(knownRegisters[operandRegister2] !== undefined) {
          var currValue2 = knownRegisters[operandRegister2];
          knownRegisters[targetRegister] = number & currValue2;
          unsolved = 0;
        } else {
          unknownRegisters.push(number + " AND " + operandRegister2 + " -> " + targetRegister);
        }
      } else if(matches = andRegRegex.exec(currInstruction)) {
        //console.log("AND regex matches " + matches);
        var operandRegister1 = matches[1];
        var operandRegister2 = matches[2];
        var targetRegister = matches[3];
        if(knownRegisters[operandRegister1] !== undefined && knownRegisters[operandRegister2] !== undefined) {
          var currValue1 = knownRegisters[operandRegister1];
          var currValue2 = knownRegisters[operandRegister2];
          knownRegisters[targetRegister] = currValue1 & currValue2;
          unsolved = 0;
        } else {
          unknownRegisters.push(operandRegister1 + " AND " + operandRegister2 + " -> " + targetRegister);
        }
      } else if(matches = orRegex.exec(currInstruction)) {
        //console.log("OR regex matches " + matches);
        var operandRegister1 = matches[1];
        var operandRegister2 = matches[2];
        var targetRegister = matches[3];
        if(knownRegisters[operandRegister1] !== undefined && knownRegisters[operandRegister2] !== undefined) {
          var currValue1 = knownRegisters[operandRegister1];
          var currValue2 = knownRegisters[operandRegister2];
          knownRegisters[targetRegister] = currValue1 | currValue2;
          unsolved = 0;
        } else {
          unknownRegisters.push(operandRegister1 + " OR " + operandRegister2 + " -> " + targetRegister);
        }
      } else if(matches = leftRegex.exec(currInstruction)) {
        //console.log("LSHIFT regex matches " + matches);
        var operandRegister = matches[1];
        var shiftBy = parseInt(matches[2]);
        var targetRegister = matches[3];
        if(knownRegisters[operandRegister] !== undefined) {
          var currValue = knownRegisters[operandRegister];
          var newValue = (currValue << shiftBy);
          knownRegisters[targetRegister] = newValue;
          unsolved = 0;
        } else {
          unknownRegisters.push(operandRegister + " LSHIFT " + shiftBy + " -> " + targetRegister);
        }
      } else if(matches = rightRegex.exec(currInstruction)) {
        //console.log("RSHIFT regex matches " + matches);
        var operandRegister = matches[1];
        var shiftBy = parseInt(matches[2]);
        var targetRegister = matches[3];
        if(knownRegisters[operandRegister] !== undefined) {
          var currValue = knownRegisters[operandRegister];
          var newValue = (currValue >> shiftBy);
          knownRegisters[targetRegister] = newValue;
          unsolved = 0;
        } else {
          unknownRegisters.push(operandRegister + " RSHIFT " + shiftBy + " -> " + targetRegister);
        }
      } else if(matches = notRegex.exec(currInstruction)) {
        //console.log("Not regex matches " + matches);
        var operandRegister = matches[1];
        var targetRegister = matches[2];
        if(knownRegisters[operandRegister] !== undefined) {
          var currValue = knownRegisters[operandRegister];
          knownRegisters[targetRegister] = 65535 - currValue;
          unsolved = 0;
        } else {
          unknownRegisters.push("NOT " + operandRegister + " -> " + targetRegister);
        }
      } else {
        console.log("-----Looks like " + currInstruction + " is NOT valid!")
      }
      repititions++;
      unsolved++;
    }
  
    console.log("Finished!");
    console.log(knownRegisters);
    console.log(unknownRegisters);
    console.log(knownRegisters["a"]);

});
