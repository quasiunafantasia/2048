var up = 'up',
		down = 'down',
		left = 'left',
		right = 'right';

window.onload = function () {
	var field = new FieldModule.Field();
	field.generate();
	field.generate();
	field.print();
	if ($.detectSwipe.enabled) 
		$(".body").on('swipeleft', field.step(left))
				  .on('swiperight',field.step(right))
				  .on('swipeup',    field.step(up))
				  .on('swipedown',  field.step(down));
	else {	
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

}
