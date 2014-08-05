/*global document */
var FieldModule = (function(){ /*module returns a constructor of the field instance*/
	"use strict";
	function roll (x) /* P(true) = 1/x */{
		var rez = Math.floor(Math.random()*(x-1));
		return rez === 0;
	}
	var COLLS = 4, //manageable
	ROWS = 4; //manageable
	var LEFT_EDGE = 0,
	RIGHT_EDGE = COLLS - 1,
	TOP_EDGE = 0,
	BOTTOM_EDGE = ROWS - 1;
	Field.prototype.__score = 0; //private module variable is not used since the score is referenced from the app ;(
	function Field() /*Field instance constructor*/ {
		this.cells=[];
		for (i = 0; i < ROWS; i++)
			this.cells[i]=[];
		for(var i = 0; i < COLLS; i++)
			for(var j = 0; j < ROWS; j++)
				this.cells[i][j]=0;
	}
	Field.prototype.display = function() /*displays current field state in console*/ {
		var str = "";
		for(var i =0; i < COLLS; i++){
			str="";
			for (var j =0; j < ROWS; j++)
				str+=this.cells[i][j]+" ";
			//console.log(str);
		}
	};
	Field.prototype.directions = /*is a set of movement directions descriptors*/ {
		left:{
			orientation:"horizontal",
			start:LEFT_EDGE,
			end:RIGHT_EDGE,
			next: 1,   //only one of this props can be used, but
			prev: -1   //it requires refactoring
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
	Field.prototype.bubbleVertical = function(direction, col){
		var i,j;
		var descriptor = this.directions[direction];
		var prev = descriptor.prev;
		for (i = descriptor.end; i != descriptor.start ; i += prev){
			for( j =  descriptor.end; j != descriptor.start ; j += prev){
				if (this.cells[j + prev][col] === 0){
					this.cells[j + prev][col]=this.cells[j][col];
					this.cells[j][col]=0;
				}
			}
		}
	};
	Field.prototype.bubbleHorizontal = function(direction, col){
		var i,j;
		var descriptor = this.directions[direction];
		var prev = descriptor.prev;
		for (i = descriptor.end; i != descriptor.start ; i += prev){
			for( j =  descriptor.end; j != descriptor.start ; j += prev){
				if(this.cells[col][j + prev] === 0){
					this.cells[col][j + prev]=this.cells[col][j];
					this.cells[col][j]=0;
				}
			}
		}
	};
	
	Field.prototype.clear = function(direction) /*cleares spaces between cells, 
	//moves the cell if there are no other cells
	should be called before and after Field.merge(direction) */ {
		var i;
		var descriptor=this.directions[direction];
		if (descriptor.orientation === "horizontal"){
			for (i = 0; i < ROWS; i++) {
				this.bubbleHorizontal(direction, i);
			}
		}
		if (descriptor.orientation === "vertical"){
				for (i = 0; i < COLLS; i++) {
					this.bubbleVertical(direction, i);
				}
		}
	};
	Field.prototype.merge = function (direction) /*merges 2 cells with == values, changes the score*/
	//requires Field.clear(direcion) before and after call
	{
		var i,j;
		var descriptor=this.directions[direction];
		var next = descriptor.next;
		if (descriptor.orientation === "horizontal"){
			for (i = 0; i < ROWS; i++)
				for (j = descriptor.start ; j != descriptor.end; j += next){
					if (this.cells[i][j + next] === this.cells[i][j] && this.cells[i][j]){
						this.cells[i][j] +=1;
						this.__score += 1 << this.cells[i][j];
						this.cells[i][j+next] = 0;
					}
				}
		}
		if (descriptor.orientation === "vertical"){
			for (i = 0; i < COLLS; i++)
				for (j = descriptor.start ; j != descriptor.end; j += next){
					if (this.cells[j + next][i] === this.cells[j][i] && this.cells[j][i]){
						this.cells[j][i] += 1;
						this.__score += 1 << this.cells[j][i];
						this.cells[j+next][i] = 0;
					}
				}
		}
	};
	Field.prototype.calcZeros = function () {
		var i,j,rez;
		rez = 0;
		for(i = 0; i < ROWS; i++)
			for(j = 0; j < COLLS; j++)
				if (this.cells[i][j] === 0)
					rez++;
		return rez;
	};
	Field.prototype.generate = function () /* generates new dice on the empty cell with P(2)=0.9, P(4) = 0.1*/
	//the probs are equal for all emty fields
	{
		var i,j,val,range;
		range = this.calcZeros();
		if (roll (10))
			val = 2;
		else val = 1;
		for (i = 0; i < ROWS; i++)
			for (j = 0; j < COLLS; j++)
				if (this.cells[i][j] === 0) {
					if (roll (range)){
					this.cells[i][j] = val;
					return ;
					}
				else range--;
				}
	};
	Field.prototype.getScore = function () {
		return this.__score;
	};
	Field.prototype.print = function () /*displays current field state + score on the page*/ {
		var i,j;
		var scoreBar = document.getElementById("scoreBar");
			scoreBar.innerHTML = this.getScore();
		var cells = document.getElementsByTagName("li");
		for (i = 0; i < ROWS; i++)
			for (j = 0; j < COLLS; j++)
				if (this.cells[i][j])
					cells[i*ROWS+j].innerHTML=1<<this.cells[i][j];
				else cells[i*ROWS+j].innerHTML="";
	};
	Field.prototype.isMovable = function (direction) /*checks if the move to %direction% can be performed*/{
		var i,j;
		var descriptor=this.directions[direction];
		var prev = descriptor.prev;
		if (descriptor.orientation === "horizontal"){
			for (i = 0; i < ROWS; i++)
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
			for (i = 0; i < ROWS; i++)
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
	};
	Field.prototype.step = function (direction) /*calls the functions which are performed during a 1 game move*/{
		if (this.isMovable(direction)){
			this.clear(direction);
			this.merge(direction);
			this.clear(direction);
			this.generate();
			this.display();
			this.print();
		}
	};
	Field.prototype.gameOver = function () /*returnes true if there are now valid directions left*/{
		var dirs = ['left','right','up','down'];
		var i;
		for (i = 0; i < 4; i++)
			if (this.isMovable(dirs[i]))
				return false;
		return true;
	};
	return {
		Field:Field
	};
})();