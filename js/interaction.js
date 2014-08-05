/*this module is used to create user interactions on a field instance. should not be a module*/
/*jslint nomen: true, plusplus: true, bitwise: true*/
/*global document, window, FieldModule, UIModule, InteractionModule */
var InteractionModule = (function () {
	'use strict';
	function checkGameEnd(field) {
	/*checks if the game is ended, resets the field after a confirm*/
		if (field.gameOver()) {
			if (window.confirm("Good job! Your score is " + field.getScore() + "\n Do you want to start a new game?")) {
				field.reset();
				field.generate();
				field.generate();
				field.print();
			}
		}
	}
	var up = 'up',
		down = 'down',
		left = 'left',
		right = 'right';
	function setSwipeActions(element, field) {
		var startX, startY, distX, distY;
		element.addEventListener('touchstart', function (e) {
			var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
			startX = parseInt(touchobj.clientX, 10);
			startY = parseInt(touchobj.clientY, 10);
			e.preventDefault();
		}, false);
		element.addEventListener('touchend', function (e) {
			var touchobj = e.changedTouches[0]; // reference first touch point for this event
			distX = parseInt(touchobj.clientX, 10) - startX;
			distY = parseInt(touchobj.clientY, 10) - startY;
			if (Math.abs(distX) >  2 || Math.abs(distY) > 2) {
				if (Math.abs(distX) > Math.abs(distY)) {
					if (distX > 0) {
						field.step(right);
						checkGameEnd(field);
					} else if (distX < 0) {
						field.step(left);
						checkGameEnd(field);
					}
				} else if (Math.abs(distX) < Math.abs(distY)) {
					if (distY > 0) {
						field.step(down);
						checkGameEnd(field);
					} else if (distY < 0) {
						field.step(up);
						checkGameEnd(field);
					}
				}
			}
			e.preventDefault();
		}, false);
	}
	function setKeyboardActions(field) {
		document.onkeydown = function (event) {
			var events = event || window.event;
			switch (events.keyCode) {
			case 37:
				field.step(left);
				checkGameEnd(field);
				break;
			case 38:
				field.step(right);
				checkGameEnd(field);
				break;
			case 39:
				field.step(right);
				checkGameEnd(field);
				break;
			case 40:
				field.step(down);
				checkGameEnd(field);
				break;
			default:
				break;
			}
		};
	}
	return {
		setUserInteraction : function (element, field) {
			setKeyboardActions(field);
			setSwipeActions(element, field);
		}
	};
}());