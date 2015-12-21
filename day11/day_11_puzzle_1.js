var invalidCharacters = /[iol]{1,}/;
var validLengthChars = /^[a-z]{8}$/;
var validPassword = function(pass) {
  if(!validLengthChars.test(pass)) {
    //console.log("Password too short or has bad characters");
    return false;
  }
  if(invalidCharacters.test(pass)) {
    //console.log("Password has bad characters");
    return false;
  }
  var tripleCheck = false;
  var doubleCheck = false;
  for(var x = 0; x < pass.length - 2; x++) {
    if(pass.charCodeAt(x) == (pass.charCodeAt(x + 1) - 1) && pass.charCodeAt(x) == (pass.charCodeAt(x + 2) - 2)) {
      tripleCheck = true;
      break;
    }
  }
  if(!tripleCheck) {
    //console.log("Don't have three consecutive letters");
    return false;
  }
  var doubles = "";
  for(var x = 0; x < pass.length - 1; x++) {
    if(pass[x] == pass[x + 1]) {
      if(doubles.indexOf(pass[x]) == -1) {
        doubles += pass[x];
      }
    }
  }
  if(doubles.length <= 1) {
    //console.log("Don't have two sets of doubles");
    return false;
  }
  return true;
}

var incrementPassword = function(pass) {
  var newPass = pass;
  var debug = 30;
  while(newPass == pass || !validPassword(newPass)) {
    //console.log("Incrementing " + newPass);
    if(newPass.charCodeAt(7) == 122) {
      var y = 7;
      var newTail = "";
      while(newPass.charCodeAt(y) == 122) {
        newTail = newTail + "a";
        y--;
      }
      newPass = newPass.substring(0, y) + String.fromCharCode(newPass.charCodeAt(y) + 1) + newTail;
    } else {
      newPass = newPass.substring(0, 7) + String.fromCharCode(newPass.charCodeAt(7) + 1);
    }
    //console.log(newPass);
  }
  return newPass;
}

var toStart = "hepxxyzz";
console.log(incrementPassword(toStart));
