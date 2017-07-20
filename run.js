// require constructors
var BasicCard = require('./BasicCard');
var ClozeCard = require('./ClozeCard');
// require inquirer npm
var inquirer  = require('inquirer');

// create the printInfo method and apply it to all BasicCard instances
BasicCard.prototype.printInfo = function() {
  console.log("Question: " + this.front);
  console.log("Answer: " + this.back);
  console.log("---------------");
};

ClozeCard.prototype.printInfo = function() {
  console.log("Full Text: " + this.front);
  console.log("Cloze : " + this.back);
  console.log("Partial Text Hint: " + this.partial);
  console.log("---------------");
};

ClozeCard.partial = function() {
	if(cards.fullText.includes(cards.cloze)){
		cards.fullText.replace(cards.cloze, " . . . ");
	} else{
		cards.cloze + " is not found in " + cards.fullText;
	}
}

// question count
var count = 0;
var maxcount = 10;
// question objects array
var arrQuestions = [];
// loop to max question count
function buildQuestionArray(){
	if (count < maxcount){
		console.log("Question " + (count+1));
		inquirer.prompt([
			{
				type: "list",
				name: "questType",
				message: "What kind of Question would you like to make?",
				choices: ["Basic", "Cloze"]
			}
		]).then(function(q){
			console.log("Question Type: " + q.questType);

			switch (q.questType){
				case "Basic":
				console.log("Basic Questions");
					addBasicQuestion();
				break;

				case "Cloze":
					addClozeQuestion();
				break;
			}
		});
	}else{
		regurge();
	}
}


function addBasicQuestion(){
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
		// error check for blank entries
		if(cards.front === "" || cards.back === ""){
			console.log("blank answers are not allowed. Please try again");
			addBasicQuestion();
		}else{
			// push object to arrBasicQuestions array
			arrQuestions.push(card);
			// increment count
			count++;
			//recurse the function
			buildQuestionArray();
		}
		
	});
};

function addClozeQuestion(){
	// ask question parts (front and back)
	inquirer.prompt([
		{
			name: "fullText",
			message: "Full Question Text: "
		},
		{
			name: "cloze",
			message: "Cloze Text: "
		}
	]).then(function(cards){
		// initialize new card instance
		var card = new ClozeCard(
			cards.fullText,
			cards.cloze
			//cards.partial
		);

		// error check for blank entries
		if(cards.front === "" || cards.back === ""){
			console.log("blank answers are not allowed. Please try again");
			addClozeQuestion();
		} else{
			// push object to arrBasicQuestions array
			arrQuestions.push(card);
			// increment count
			count++;
			//recurse the function
			buildQuestionArray();
		}
		
	});
};

function regurge(){
	inquirer.prompt([
		{
			type: "confirm",
			name: "confirmStartGame",
			message: "Would you like to see the questions and answers listed now?"
		}
		]).then(function(confirm){
			if(confirm.confirmStartGame){
				for (var i = 0; i < arrQuestions.length; i++) {
	     			arrQuestions[i].printInfo();
	   		}
			}else{
				console.log("fine then, I'm out!");
			}
		}	
	);
}

// start the show
buildQuestionArray();
