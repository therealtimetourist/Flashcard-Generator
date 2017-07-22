// define the cloze card constructor
module.exports = function(fullText, cloze){
	this.front = fullText;
	this.back = cloze;
	this.partial  = function(){this.front.replace(this.back, " . . . ");}
};