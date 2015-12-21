var total = 0;
var pairRegex = /([a-z]{2}).*(?=\1)/;
var doubleRegex = /([a-z]{1})[a-z]{1}(?=\1)/;

var allText = $('pre').innerHTML.split("\n");
for(var i = 0; i < allText.length; i++) {
  var text = allText[i];
  if(doubleRegex.test(text) && pairRegex.test(text)) {
    //Nice
    //console.log("Nice!")
    total++;
  } else {
    //Naughty
    //console.log("Naughty!")
  }
}

console.log(total);
