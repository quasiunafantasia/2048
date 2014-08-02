"use strict";
function roll (x) /* P(true) = 1/x */{
	var rez = Math.floor(Math.random()*(x-1));
	return rez === 0;
}
var COLLS = 4, 
RAWS = 4,
LEFT_EDGE=0,
RIGHT_EDGE=3,
TOP_EDGE = 0,
BOTTOM_EDGE = 3;
// [i][j] : i=0..RAWS, j = 0..COLLS
function Cell(val) {
	if (val !== undefined)
		this.value = val;
}
Cell.prototype.value = -1;
Array.prototype.create = function (n,val) {
	var rez=[];
	for(var i = 0;i < n; i++)
		rez[i]=val;
	return rez;
}
function Field(){
//	for(var i=0, j=0;i<COLLS, j<RAWS;this.cells[i++][j++]=0);
	var i,j;
	this.cells=[];
		for (i = 0; i< RAWS; i++)
			this.cells[i]=[];
		for(var i = 0; i<COLLS;i++)
			for(var j = 0; j<RAWS;j++)
				this.cells[i][j]=0;

}
/*
Field.prototype.setLinks = function() {
//sets navigation links for cells like in a linked list 
	//right
	for(var i = 0; i<RAWS;i++){
		for(var j = 0;j<COLLS-1;j++)
			this.cells[i][j]["nextRight"]=this.cells[i][j+1];
		this.cells[i][COLLS-1]["nextRight"]=null;
	}
	//left
	for(i=0;i<RAWS;i++){
		for( j = 1;j<COLLS;j++)
			this.cells[i][j]["nextLeft"]=this.cells[i][j-1];
		this.cells[i][0]["nextLeft"]=null;
	}
	//bottom
	for(j=0;j<COLLS;j++){
		for(i = 0;i<RAWS-1;i++)
			this.cells[i][j]["nextBottom"]=this.cells[i+1][j];
		this.cells[RAWS-1][j]["nextBottom"]=null;
	}
	//top
	for(j=0;j<COLLS;j++){
		for(i = 1;i<RAWS;i++)
			this.cells[i][j]["nextTop"]=this.cells[i-1][j];
		this.cells[0][j]["nextTop"]=null;
	}
		
}
*/
var field = [4];
var f = new Field();
Field.prototype.search=function(cell){
	for(var i = 0; i<COLLS; i++)
		for(var j = 0; j < RAWS; j++)
			if(this.cells[i][j]===cell)
				return [i,j];
	return null;
}
Field.prototype.display = function(){
	var str = "";
	for(var i =0; i < COLLS; i++){
		str="";
		for (var j =0; j<RAWS; j++)
			str+=this.cells[i][j]+" ";
		console.log(str);
	}
}
//f.setLinks();
Field.prototype.directions = {
	left:{
		orientation:"horizontal",
		start:LEFT_EDGE,
		end:RIGHT_EDGE,
		next: 1,
		prev: -1
		},
	right:{
		orientation:"horizontal",
		start:RIGHT_EDGE,
		end:LEFT_EDGE,
		next: -1,
		prev: 1
		},
	down:{
		orientation:"vertical",
		start:BOTTOM_EDGE,
		end:TOP_EDGE,
		next: -1,
		prev: 1
		},
	up:{
		orientation:"vertical",
		start:TOP_EDGE,
		end:BOTTOM_EDGE,
		next: 1,
		prev: -1
		}
};
var up = 'up',
	down = 'down',
	left = 'left',
	right = 'right';
Field.prototype.clear = function(direction) {
	var i,j,k;
	var descriptor=this.directions[direction];
	var next = descriptor.next;
	var prev = descriptor.prev;
	if (descriptor.orientation === "horizontal"){
		for ( k=0; k < RAWS; k++) {
			for(i = descriptor.end; i != descriptor.start ; i += prev){
				for( j =  descriptor.end; j != descriptor.start ; j += prev)
					if(this.cells[k][j + prev] === 0){
						this.cells[k][j + prev]=this.cells[k][j];
						this.cells[k][j]=0;
					}
					
			
			}
		}
	}
	if (descriptor.orientation === "vertical"){
			for ( k=0; k < RAWS; k++) {
				for(i = descriptor.end; i != descriptor.start ; i += prev){
				for( j =  descriptor.end; j != descriptor.start ; j += prev)
					if(this.cells[j + prev][k] === 0){
						this.cells[j + prev][k]=this.cells[j][k];
						this.cells[j][k]=0;
					}
				}		
			}
	
	}
}
/* не пошло
Field.prototype.move = function (direction){
	var i,j,
	iterator;
	var descriptor=this.directions[direction];
	var next = descriptor.next;
	var prev = descriptor.prev;
	if (descriptor.orientation === "horizontal"){
		for ( i=0; i < RAWS; i++) {
			iterator=this.cells[i][descriptor.start];
			while(iterator[next]){
				if ( iterator.value === iterator[next].value){
					iterator.value*=2;		//здесь надо было "пробрасывать" ссылку мимо ненужного 
					iterator[next].value=0;	//элемента, удалять его и создавать новый, но я испугался	
					this.display();
				}					//тк  javascript
				if ( iterator.value === 0 && iterator[next].value !==0){
					iterator.value=iterator[next].value;		//здесь надо было "пробрасывать" ссылку мимо ненужного 
					iterator[next].value=0;	//элемента, удалять его и создавать новый, но я испугался	
					iterator=this.cells[i][descriptor.start];
					this.display();					
				}	
				iterator=iterator[next];
			}
		}
		//this.clear(direction);
	}else if (descriptor.orientation === "vertical"){
		for ( j=0; j < COLLS; j++) {
			iterator=this.cells[descriptor.start][j];
			while(iterator[next]){
				if ( iterator.value === iterator[next].value){
					iterator.value*=2;		//здесь надо было "пробрасывать" ссылку мимо ненужного 
					iterator[next].value=0;	//элемента, удалять его и создавать новый, но я испугался			
				}					//тк  javascript
				if ( iterator.value === 0 && iterator[next].value !==0){
					iterator.value=iterator[next].value;		//здесь надо было "пробрасывать" ссылку мимо ненужного 
					iterator[next].value=0;	//элемента, удалять его и создавать новый, но я испугался		
					terator=this.cells[i][descriptor.start];
				}	
				iterator=iterator[next];
			}
		}	
	}
	this.display();
}
*/
Field.prototype.move = function (direction){
	var i,j;
	var costili = 0;
	var descriptor=this.directions[direction];
	var next = descriptor.next;
	var prev = descriptor.prev;
	if (descriptor.orientation === "horizontal"){
		for (i = 0; i < RAWS; i++)
			for (j = descriptor.start ; j != descriptor.end; j += next){
				if (this.cells[i][j + next] === this.cells[i][j]){
					this.cells[i][j] *=2;
					this.cells[i][j+next] = 0;
				}
				
			}
	}
	if (descriptor.orientation === "vertical"){
		for (i = 0; i < COLLS; i++)
			for (j = descriptor.start ; j != descriptor.end; j += next){
				if (this.cells[j + next][i] === this.cells[j][i]){
					this.cells[j][i] *=2;
					this.cells[j+next][i] = 0;
				}
				
			}
	}
}

Field.prototype.calcZeros = function () {
	var i,j,rez;
	rez = 0;
	for(i = 0; i < RAWS; i++)
		for(j = 0; j < COLLS; j++)
			if (this.cells[i][j] === 0)
				rez++;
	return rez;
}
Field.prototype.generate = function () /* generates new dice on the empty cell with P(2)=0.9, P(4) = 0.1*/{
	var i,j,val,range;
	range = this.calcZeros();
	if (roll (10))
		val = 4;
	
	else val = 2;
	for (i = 0; i < RAWS; i++)
		for (j = 0; j < COLLS; j++)
			if (this.cells[i][j] === 0) {
				if (roll (range)){
				this.cells[i][j] = val;
				return ;
				}
			else range--;
			}
}
Field.prototype.getScore = function () {
	var sum = 0;
	var i,j;
	for (i = 0; i < RAWS; i++)
		for (j = 0; j < COLLS; j++)
			sum += this.cells[i][j];
	return sum;
}
Field.prototype.print = function (){
	var i,j;
	var cells = document.getElementsByTagName("li");
	for (i = 0; i < RAWS; i++)
		for (j = 0; j < COLLS; j++)
			cells[i*RAWS+j].innerHTML=this.cells[i][j];


}
Field.prototype.step = function (direction) {
	this.clear(direction);
	this.move(direction);
	this.clear(direction);
	this.generate();
	this.print();
}
document.onkeydown = function(event){
	var events = event || window.event;

		if (events.keyCode == 37) 
			f.step(left);
		if (events.keyCode == 39) 
			f.step(right);
		if (events.keyCode == 38) 
			f.step(up);
		if (events.keyCode == 40) 
			f.step(down);
}



