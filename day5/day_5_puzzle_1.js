var total = 0;
var vowelRegex = /[aeiou]{1}.*[aeiou]{1}.*[aeiou]{1}/;
var doubleRegex = /([a-z]{1})(?=\1)/;
var exiledRegex = /ab|cd|pq|xy/;

var allText = $('pre').innerHTML.split("\n");
for(var i = 0; i < allText.length; i++) {
  var text = allText[i];
  if(vowelRegex.test(text) && doubleRegex.test(text) && !exiledRegex.test(text)) {
    //Nice
    total++;
  } else {
    //Naughty
  }
}

console.log(total);
