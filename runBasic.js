// require constructor
var BasicCard = require('./BasicCard');
// require inquirer npm
var inquirer  = require('inquirer');

// create the printInfo method and apply it to all BasicCard instances
BasicCard.prototype.printInfo = function() {
  console.log("Question: " + this.front);
  console.log("Answer: " + this.back);
  console.log("---------------");
};

// question count
var count = 0;
var maxcount = 10;
// question objects array
var arrBasicQuestions = [];

function addQuestion(){
	// loop to max question count
	if (count < maxcount){
		console.log("Question " + (count+1));
		// ask question parts (front and back)
		inquirer.prompt([
			{
				name: "front",
				message: "Question Text: "
			},
			{
				name: "back",
				message: "Answer Text: "
			}
		]).then(function(cards){
			// initialize new card instance
			var card = new BasicCard(
				cards.front,
				cards.back
			);

			// pushe object to arrBasicQuestions array
			arrBasicQuestions.push(card);
			// increment count
			count++;
			// recurse function -- ask question again
			addQuestion();
		});
	} else{	// else ask to start the game
		inquirer.prompt([
		{
			type: "confirm",
			name: "confirmStartGame",
			message: "Would you like to see a random question now?"
		}
		]).then(function(confirm){
			if(confirm.confirmStartGame){
				for (var i = 0; i < arrBasicQuestions.length; i++) {
	      			arrBasicQuestions[i].printInfo();
	    		}
			}else{
				console.log("fine then!");
			}
	    });
	}
};

// run the code
addQuestion();
