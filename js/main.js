/*global document, window, FieldModule, UIModule, InteractionModule */
window.onload = function () {
	'use strict';
	var field, field2, gameField, docWidth, docHeight, size;
	field = new FieldModule.Field(document.getElementById('instance1'), 8, 8);
	field.assign(document.getElementById('instance1'));
	field.generate();
	field.generate();
	field.print();
	gameField = document.getElementById('instance1');
	docWidth = window.screen.width;
	docHeight = window.screen.height;
	size = docWidth < docHeight ? docWidth : docHeight;
	size = size > 400 ? 400 : size;
	size *= 0.7;
	UIModule.adjustGraphics(gameField, size, 0.1, 8);
	InteractionModule.setUserInteraction(document.getElementById('instance1'), field);
	field2 = new FieldModule.Field(document.getElementById('instance2'), 4, 4);
	gameField = document.getElementById('instance2');
	field2.generate();
	field2.generate();
	field2.print();
	UIModule.adjustGraphics(gameField, size, 0.2, 4);
	InteractionModule.setUserInteraction(document.getElementById('instance2'), field2);
	
};