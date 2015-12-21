var dataToRead = "";
var splitter = /([0-9]+)/g;
var fs = require('fs');
fs.readFile('puzzle_input.js', function (err, data) {
    if (err) {
      throw err; 
    }

    dataToRead = data.toString();

    console.log(dataToRead);

    dataToRead = dataToRead.replace(/[^\-0-9]+/g, ",");
    dataToRead = dataToRead.replace(/,+/g, ",");
    console.log(dataToRead);

    var nums = dataToRead.split(",");
    //console.log(nums);
    var total = 0;
    for(var x = 1; x < nums.length - 1; x++) {
      var thisCount = parseInt(nums[x])
      total += thisCount;
    }
    console.log(total);
});
fs.readFile('puzzle_1_input_2.js', function (err, data) {
    if (err) {
      throw err; 
    }

    dataToRead = data.toString();

    //console.log(dataToRead);

    dataToRead = dataToRead.replace(/[^\-0-9]+/g, ",");
    dataToRead = dataToRead.replace(/,+/g, ",");
    //console.log(dataToRead);

    var nums = dataToRead.split(",");
    //console.log(nums);
    var total = 0;
    for(var x = 1; x < nums.length - 1; x++) {
      var thisCount = parseInt(nums[x])
      total += thisCount;
    }
    console.log(total);
});
