var Ingredient = function(name, capacity, durability, flavor, texture, calories) {
  this._name = name;
  this._capacity = capacity;
  this._durability = durability;
  this._flavor = flavor;
  this._texture = texture;
  this._calories = calories;
}

Ingredient.prototype.getName = function() {
  return this._name;
}

Ingredient.prototype.getCapacity = function() {
  return this._capacity;
}

Ingredient.prototype.getDurability = function() {
  return this._durability;
}

Ingredient.prototype.getFlavor = function() {
  return this._flavor;
}

Ingredient.prototype.getTexture = function() {
  return this._texture;
}

Ingredient.prototype.getCalories = function() {
  return this._calories;
}

var Mix = function() {
  this._ingredients = [];
  this._capacity = 0;
  this._durability = 0;
  this._flavor = 0;
  this._texture = 0;
  this._calories = 0;
  this._score = -1;
}

Mix.prototype.getCapacity = function() {
  if(this._capacity < 0) { return 0; }
  return this._capacity;
}

Mix.prototype.addCapacity = function(num) {
  this._capacity += num;
}

Mix.prototype.getDurability = function() {
  if(this._durability < 0) { return 0; }
  return this._durability;
}

Mix.prototype.addDurability = function(num) {
  this._durability += num;
}

Mix.prototype.getFlavor = function() {
  if(this._flavor < 0) { return 0; }
  return this._flavor;
}

Mix.prototype.addFlavor = function(num) {
  this._flavor += num;
}

Mix.prototype.getTexture = function() {
  if(this._texture < 0) { return 0; }
  return this._texture;
}

Mix.prototype.addTexture = function(num) {
  this._texture += num;
}

Mix.prototype.getCalories = function() {
  return this._calories;
}

Mix.prototype.addCalories = function(num) {
  this._calories += num;
}

Mix.prototype.getIngredients = function() {
  return this._ingredients;
}

Mix.prototype.addIngredient = function(ingredient, count) {
  this._ingredients.push([ingredient, count]);
}

Mix.prototype.getIngredientCount = function() {
  return this._ingredients.length;
}

Mix.prototype.getIngredientAt = function(num) {
  return this._ingredients[num];
}

Mix.prototype.getScore = function() {
  if(this._score < 0) {
    for(var x = 0; x < this.getIngredientCount(); x++) {
      var tmpIngArr = this.getIngredientAt(x);
      console.log(tmpIngArr);
      var tmpIng = tmpIngArr[0];
      var tmpCount = tmpIngArr[1];
      this.addCapacity(tmpIng.getCapacity() * tmpCount);
      this.addDurability(tmpIng.getDurability() * tmpCount);
      this.addFlavor(tmpIng.getFlavor() * tmpCount);
      this.addTexture(tmpIng.getTexture() * tmpCount);
      this.addCalories(tmpIng.getCalories() * tmpCount);
    }
    this._score = (this.getCapacity() * this.getDurability() * this.getFlavor() * this.getTexture());
  }
  return this._score;
}

var ingredients = [];
ingredients.push(new Ingredient("Sprinkles", 5, -1, 0, 0, 5)); 
ingredients.push(new Ingredient("Peanut Butter", -1, 3, 0, 0, 1)); 
ingredients.push(new Ingredient("Frosting", 0, -1, 4, 0, 6)); 

var getMaxScore = function(ingredients, max) {
  if(ingredients.length == 1) {
    console.log("Checking one ingredient: " + ingredients[0].getName());
    var tmpIng = ingredients[0];
    var capacity = tmpIng.getCapacity() * max;
    var durability = tmpIng.getDurability() * max;
    var flavor = tmpIng.getFlavor() * max;
    var texture = tmpIng.getTexture() * max;
    console.log("Capacity: " + capacity + ", Durability: " + durability + ", Flavor: " + flavor + ", Texture: " + texture);
    var totalScore = (capacity * durability * flavor * texture);
    console.log(totalScore);
    return totalScore;
  } else if (ingredients.length == 2) {
    var maxCookie = 0;
    for(var x = 0; x < max; x++) {
      var tmpIng1 = ingredients[0];
      var tmpIng2 = ingredients[1];
      var capacity = (tmpIng1.getCapacity() * x) + (tmpIng2.getCapacity() * (max - x));
      var durability = (tmpIng1.getDurability() * x) + (tmpIng2.getFlavor() * (max - x));
      var flavor = (tmpIng1.getFlavor() * x) + (tmpIng2.getFlavor() * (max - x));
      var texture = (tmpIng1.getTexture() * x) + (tmpIng2.getTexture() * (max - x));
      var totalScore = (capacity * durability * flavor * texture);
      if(totalScore > maxCookie) {
        maxCookie = totalScore;
      }
    }
    return maxCookie;
  } else if (ingredients.length == 3) {
    var maxCookie = 0;
    //Check max 2-ingredient
    for(var x = 0; x < ingredients.length; x++) {
      var tmpIng = ingredients.shift();
      var maxTwoIng = getMaxScore(ingredients);
      if(maxTwoIng > maxCookie) { maxCookie = maxTwoIng; }
      ingredients.push(tmpIng);
    }
    return maxCookie;
  } else {
    return 0;
  }
}

ingredients.push(new Ingredient("Sugar", -1, 0, 0, 2, 8)); 

var max = 10;
var mixes = [];
for(var x = 0; x < 4; x++) {
  var tmpIng = ingredients.shift();
  console.log("Trying the " + tmpIng.getName() + " permutations.");
  for(var y = (max - 3); y > 3; y--) { //y will be the value of the first ingredient
    var tmpMix = new Mix();
    tmpMix.addIngredient(tmpIng, y);
    tmpMix.addIngredient(ingredients.shift(), 1);
    tmpMix.addIngredient(ingredients.shift(), 1);
    tmpMix.addIngredient(ingredients.shift(), 1);
    console.log(tmpMix);
    tmpMix.getScore();
    mixes.push(tmpMix);
  }
  ingredients.push(tmpIng);
}

console.log(mixes);
