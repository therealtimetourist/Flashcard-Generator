// define the cloze card constructor
module.exports = function(fullText, cloze){
	this.front = fullText;
	this.back = cloze;
	//this.partial = this.front.replace(this.back, " . . . ");
	//this.partial = function(){
		//var part = "";
		//if(fullText.includes(cloze)){
		//	part = fullText.replace(cloze, " . . . ");
		//} else{
		//	part = cloze + " is not found in " + fullText;
		//}
		//console.log(part);
	//};
};