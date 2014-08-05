var UIModule = function() {
	var adjustGraphics = function(element){
		var docWidth, docHeight;
		docWidth = window.screen.width;
		docHeight = window.screen.height;
		var size = docWidth < docHeight ? docWidth:docHeight;
		size = size > 400 ? 400 : size;
		var containerSize = size * 0.7;
		element.style.width = element.style.height = containerSize +"px";
		
		var cellSize = containerSize * 0.2;
		var cellMargin = containerSize * 0.025;
		var cells = element.getElementsByTagName("*");
		for ( var i = 0; i < cells.length; i++ ){
			cells[i].style.width = cells[i].style.height = cellSize + "px";
			cells[i].style.margin = cellMargin + "px";
			cells[i].style.lineHeight = cellSize + "px";
		}
		element.style.fontSize=cellSize / 3 + "px";
	};
	return {
		adjustGraphics : adjustGraphics
	};
}();