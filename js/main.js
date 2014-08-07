/*global document, window, FieldModule, UIModule, InteractionModule */
window.onload = function () {
	'use strict';
	var field, field2, gameField, docWidth, docHeight, size;
	docWidth = window.screen.width;
	docHeight = window.screen.height;
	size = docWidth < docHeight ? docWidth : docHeight;
	size = size > 400 ? 400 : size;
	size *= 0.7;
	field2 = new FieldModule.Field(document.getElementById('instance2'), 3, 3);
	gameField = document.getElementById('instance2');
	field2.generate();
	field2.generate();
	field2.print();
	UIModule.adjustGraphics(gameField, size, 0.3, 3);
	InteractionModule.setUserInteraction(document.getElementById('instance2'), field2);
	
};