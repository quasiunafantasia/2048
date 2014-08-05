/*this module adjusts field size for any screen resolution*/
/*jslint nomen: true, plusplus: true, bitwise: true*/
var UIModule = (function () {
	'use strict';
	var adjustGraphics = function (element, containerSize, blockSize, blockNum) {
		var cellSize, cellMargin, cells, i;
		element.getElementsByTagName('ul')[0].style.width = element.getElementsByTagName('ul')[0].style.height = containerSize + "px";
		cellSize = containerSize * blockSize;
		cellMargin = (containerSize - cellSize * blockNum) / (blockNum * 2);
		cells = element.getElementsByTagName("li");
		for (i = 0; i < cells.length; i++) {
			cells[i].style.width = cells[i].style.height = cellSize + "px";
			cells[i].style.margin = cellMargin + "px";
			cells[i].style.lineHeight = cellSize + "px";
		}
		element.getElementsByTagName('ul')[0].style.fontSize = cellSize / 4 + "px";
	};
	return {
		adjustGraphics : adjustGraphics
	};
}());