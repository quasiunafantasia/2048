"use strict";
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
	//this.cells=Array.prototype.create(COLLS,eval("new Array(RAWS)"));
	//for(var i=0, j=0;i<COLLS, j<RAWS;this.cells[i++][j++]=new Cell(i+j));
	var i,j;
	this.cells=[];
		for (i = 0; i< RAWS; i++)
			this.cells[i]=[];
		for(var i = 0; i<COLLS;i++)
			for(var j = 0; j<RAWS;j++)
				this.cells[i][j]=((i*RAWS)+j);
}
Field.prototype.setLinks = function() /* sets navigation links for cells like in a linked list */{
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
Field.prototype.moveLeft=function (){
	var i,
	iterator;
	for ( i=0; i < RAWS; i++) {
		iterator=this.cells[i][LEFT_EDGE];
		while(iterator.nextRight){
			if ( iterator.value === iterator.nextRight.value){
				iterator.value*=2;		//здесь надо было "пробрасывать" ссылку мимо ненужного 
				iterator.nextRight.value=0;	//элемента, удалять его и создавать новый, но я испугался			
			}					//тк  javascript
			iterator=iterator.nextRight;
		}
	}		
}
Field.prototype.clear = function(direction) /*clears 0 after moveLeft, starts from the Right side >.< */{
	var i,
	iterator;
	var descriptor=this.directions[direction];
	var next = descriptor.next;
	var prev = descriptor.prev;
	if (descriptor.orientation === "horizontal"){
		for ( i=0; i < RAWS; i++) {
			iterator=this.cells[i][descriptor.end];
			while(iterator[prev]){
				if ( iterator[prev].value === 0){
					iterator[prev].value=iterator.value;	
					iterator.value=0; 
					iterator=this.cells[i][descriptor.end];//inconvinient :(
								
				}
				iterator=iterator[prev];
			}
		}		
	}
	if (descriptor.orientation === "vertical"){
		for ( i=0; i < COLLS; i++) {
			iterator=this.cells[descriptor.end][i];
			while(iterator[prev]){
				if ( iterator[prev].value === 0){
					iterator[prev].value=iterator.value;	
					iterator.value=0; 
					iterator=this.cells[descriptor.end][i];//inconvinient :(
								
				}
				iterator=iterator[prev];
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
	var descriptor=this.directions[direction];
	var next = descriptor.next;
	var prev = descriptor.prev;
	if (descriptor.orientation === "horizontal"){
		for ( i=0; i < RAWS; i++) {
			for(j =descriptor.start;j<descriptor.end; j+=next){
				if ( this.cells[i][j] === this.cells[i][j+next]){
					this.cells[i][j] *= 2;
					this.cells[i][j+next] = 0;
				}
				if (this.cells[i][j] === 0){
					for(var t = j; t < descriptor.end; t+=next){
						var temp = 0;
						temp = this.cells[i][t];
						this.cells[i][t] = this.cells[i][t+next];
						this.cells[i][t+next] = temp;
					}
					this.display();
					j-=next;
				}
			}
		}
	}
}
f.cells[0][3]=2;
f.cells[0][0]=1;
f.cells[1][0]=2;
f.cells[1][1]=4;
