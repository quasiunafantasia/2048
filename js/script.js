var up = 'up',
	down = 'down',
	left = 'left',
	right = 'right';
	
window.onload = function () {
/*
	var docWidth, docHeight;
	docWidth = document.body.clientWidth;
    docHeight = document.body.clientHeight;
	var size = docWidth < docHeight? docWidth:docHeight;
	var container = document.getElementsByClassName("game")[0];
	container.style.width = container.style.height = size * 0.6+"px";
	var cells = document.getElementsByClassName("cell");
	for ( var i = 0; i < cells.length; i++ ){
		cells[i].style.width = cells[i].style.height = size * 0.6 * 0.2+"px";
		cells[i].style.margin = size * 0.025 * 0.2+"px";		
	}*/
	var field;
	var gen = function(){
		field = new FieldModule.Field();	
		field.generate();
		field.generate();
		field.print();
		}();
	var move = function(direction){
		field.step(direction);
			if (field.gameOver())
				if (confirm("Good job! Your score is " + field.getScore() +"\n Do you want to start a new game?"))
					gen();
	};
	/* setUnselectable = function(node){ //did not work out
		if (node.nodeType == 1) {
			node.unselectable = true;
	    }
		var child = node.firstChild;
		while (child) {
			setUnselectable(child);
			child = child.nextSibling;
		}
	}
	setUnselectable(document.body); */
	/*	$( "body" ).on( "swiperight", function(){
		move(right);
		});
	$( "body" ).on( "swipeleft", function(){
		move(left);
	});
	$( "body" ).on( "swipedown", function(event){
		move(down);
	});
	$( "body" ).on( "swipeup", function(event){
		move(up);
	});	*/
	var startX,startY, distX, distY;
	document.body.addEventListener('touchstart', function(e){
	var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
		startX = parseInt(touchobj.clientX);
		startY = parseInt(touchobj.clientY);
		e.preventDefault();
		}, false);
	/* document.body.addEventListener('touchmove', function(e){
	  var touchobj = e.changedTouches[0] // reference first touch point for this event
	   
	   //alert("x :" + distX+" y: " + distY);
	   e.preventDefault();
	 }, false);*/
	 document.body.addEventListener('touchend', function(e){
		var touchobj = e.changedTouches[0]; // reference first touch point for this event
		distX = parseInt(touchobj.clientX) - startX;
		distY = parseInt(touchobj.clientY) - startY;
		 if ( Math.abs(distX) >  2 || Math.abs(distY) > 2){
			if (Math.abs(distX) > Math.abs(distY)){
				if (distX > 0){
					move(right);
				}
				if (distX < 0){
					move(left);
				}
			}
			else if (Math.abs(distX) < Math.abs(distY)){
				if (distY > 0){
					move(down);
				}
				if (distY < 0){
					move(up);
				}	
			}
		}
		e.preventDefault()
		}, false);
document.onkeydown = function(event){
var events = event || window.event;
	if (events.keyCode == 37) 
		field.step(left);
	if (events.keyCode == 39) 
		field.step(right);
	if (events.keyCode == 38) 
		field.step(up);
	if (events.keyCode == 40) 
		field.step(down);
	if (field.gameOver())
		if (confirm("Good job! Your score is " + field.getScore() +"\n Do you want to start a new game?"))
			gen();
	}
}