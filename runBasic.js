// require constructor
var BasicCard = require('./BasicCard');
// require inquirer npm
var inquirer  = require('inquirer');

// create the printInfo method and apply it to all BasicCard instances
BasicCard.prototype.printInfo = function() {
  console.log("Question: " + this.front);
  console.log("---------------");
};

var firstPresident = new BasicCard("Who was the first president of the United States?", "George Washington");

firstPresident.printInfo();