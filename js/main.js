window.onload = function () {
	var field = new FieldModule.Field();	
	field.generate();
	field.generate();
	field.print();
	var gameField = document.getElementsByClassName("game")[0];
	UIModule.adjustGraphics(gameField);
	InteractionModule.setUserInteraction(gameField, field);
};