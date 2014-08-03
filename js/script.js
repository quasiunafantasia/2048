var up = 'up',
	down = 'down',
	left = 'left',
	right = 'right';

window.onload = function () {
	var field = new FieldModule.Field();	
	field.generate();
	field.generate();
	field.print();
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
		//$.mobile.defaultPageTransition = 'none';
	/* same
	var lastScrollTop = 200;
	$(window).scroll(function(event){
    var st = $(this).scrollTop();
	var st2 = $(this).scrollDown();
	if (st > lastScrollTop){
       // downscroll code
	   field.ste(up);
   } else {
      // upscroll code
	  field.step(down);
   }
   lastScrollTop = st;
   //alert("st = " +st);
	//alert("last scroll top " + lastScrollTop);
	//alert("down " + st2);
	});*/
	
		$( "body" ).on( "swiperight", function(){field.step(right);
			if (field.gameOver())
				if (confirm("Good job! Your score is " + field.getScore() +"\n Do you want to start a new game?")){
					field = new FieldModule.Field();					
					field.generate();
					field.generate();
					field.print();} 
	});
	
		$( "body" ).on( "swipeleft", function(){field.step(left);
			if (field.gameOver())
				if (confirm("Good job! Your score is " + field.getScore() +"\n Do you want to start a new game?")){
					field = new FieldModule.Field();					
					field.generate();
					field.generate();
					field.print();} 
	});
	
		$( "body" ).on( "swipedown", function(){field.step(down);
			if (field.gameOver())
				if (confirm("Good job! Your score is " + field.getScore() +"\n Do you want to start a new game?")){
					field = new FieldModule.Field();					
					field.generate();
					field.generate();
					field.print();}
	});
	
		$( "body" ).on( "swipeup", function(){field.step(up);
			if (field.gameOver())
				if (confirm("Good job! Your score is " + field.getScore() +"\n Do you want to start a new game?")){
					field = new FieldModule.Field();					
					field.generate();
					field.generate();
					field.print();} 
	});
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
			if (confirm("Good job! Your score is " + field.getScore() +"\n Do you want to start a new game?")){
				field = new FieldModule.Field();					
				field.generate();
				field.generate();
				field.print();
			}
	}
}