//"use strict";
var FieldModule = (function(){
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
	var __score = 0;
	function Field(){
		var i,j;
		this.cells=[];
			for (i = 0; i< RAWS; i++)
				this.cells[i]=[];
			for(var i = 0; i<COLLS;i++)
				for(var j = 0; j<RAWS;j++)
					this.cells[i][j]=0;

	}
	Field.prototype.display = function(){
		var str = "";
		for(var i =0; i < COLLS; i++){
			str="";
			for (var j =0; j<RAWS; j++)
				str+=this.cells[i][j]+" ";
			//console.log(str);
		}
	}
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
	Field.prototype.move = function (direction){
		var i,j;
		var costili = 0;
		var descriptor=this.directions[direction];
		var next = descriptor.next;
		var prev = descriptor.prev;
		if (descriptor.orientation === "horizontal"){
			for (i = 0; i < RAWS; i++)
				for (j = descriptor.start ; j != descriptor.end; j += next){
					if (this.cells[i][j + next] === this.cells[i][j] && this.cells[i][j]){
						this.cells[i][j] +=1;
						__score += 1 << this.cells[i][j];
						this.cells[i][j+next] = 0;
					}
					
				}
		}
		if (descriptor.orientation === "vertical"){
			for (i = 0; i < COLLS; i++)
				for (j = descriptor.start ; j != descriptor.end; j += next){
					if (this.cells[j + next][i] === this.cells[j][i] && this.cells[j][i]){
						this.cells[j][i] += 1;
						__score += 1 << this.cells[j][i];
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
			val = 2;
		
		else val = 1;
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
		return __score;
	}
	Field.prototype.print = function (){
		var i,j;
		var scoreBar = document.getElementById("scoreBar");
			scoreBar.innerHTML = this.getScore();
		var cells = document.getElementsByTagName("li");
		for (i = 0; i < RAWS; i++)
			for (j = 0; j < COLLS; j++)
				if (this.cells[i][j])
					cells[i*RAWS+j].innerHTML=1<<this.cells[i][j];
				else cells[i*RAWS+j].innerHTML="";
	}
	Field.prototype.isMovable = function (direction) {
		var i,j;
		var descriptor=this.directions[direction];
		var next = descriptor.next;
		var prev = descriptor.prev;
		if (descriptor.orientation === "horizontal"){
			for (i = 0; i < RAWS; i++)
				for (j = descriptor.end ; j != descriptor.start; j += prev){
					if (this.cells[i][j] && (this.cells[i][j + prev] === this.cells[i][j])){
						return true;
					}
					if (this.cells[i][j] && ! this.cells[i][j+prev]){
						return true;
					}
					
				}
			return false;
		}
		if (descriptor.orientation === "vertical"){
			for (i = 0; i < RAWS; i++)
				for (j = descriptor.end ; j != descriptor.start; j += prev){
					if (this.cells[j][i] && this.cells[j + prev][i] === this.cells[j][i]){
						return true;
					}
					if (this.cells[j][i] && ! this.cells[j + prev][i]){
						return true;
					}
					
				}
			return false;
		}
		
	}
	Field.prototype.step = function (direction) {
		if (this.isMovable(direction)){
			this.clear(direction);
			this.move(direction);
			this.clear(direction);
			this.generate();
			this.display();
			this.print();
		}
	}
	return {
		Field:Field
	}
})();


