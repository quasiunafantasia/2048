var up = 'up',
		down = 'down',
		left = 'left',
		right = 'right';

window.onload = function () {
	var field = new FieldModule.Field();
	field.generate();
	field.generate();
	field.print();
	$(function(){
		$( "body" ).on( "swiperight", function(){field.step(right)} );
	});
	$(function(){
		$( "body" ).on( "swipeleft", function(){field.step(left)} );
	});
	$(function(){
		$( "body" ).on( "swipedown", function(){field.step(down)} );
	});
	$(function(){
		$( "body" ).on( "swipeup", function(){field.step(up)} );
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
		}
	

}
