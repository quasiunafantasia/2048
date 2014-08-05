/*jslint nomen: true, plusplus: true, bitwise: true*/
/*global document */
var FieldModule = (function () { /*module returns a constructor of the field instance*/
	"use strict";
	var directions = /*is a set of movement directions descriptors*/ {
		left : {
			orientation : "horizontal",
			start : "left_edge",
			end : "right_edge",
			next : 1,
			prev : -1
		},
		right : {
			orientation : "horizontal",
			start : "right_edge",
			end : "left_edge",
			next : -1,
			prev : 1
		},
		down : {
			orientation : "vertical",
			start : "bottom_egde",
			end : "top_egde",
			next : -1,
			prev : 1
		},
		up : {
			orientation: "vertical",
			start : "top_egde",
			end : "bottom_egde",
			next : 1,
			prev : -1
		}
	};
	function roll(x) {/* P(true) = 1/x */
		var rez = Math.floor(Math.random() * (x - 1));
		return rez === 0;
	}
	function Field(container, rows, cols) {
		var i, j;
		this.container_ = container || document.body;
		this.rows_ = rows || 4;
		this.cols_ = cols || 4;
		this.left_edge = 0;
		this.right_edge  = this.cols_ - 1;
		this.top_egde = 0;
		this.bottom_egde = this.rows_ - 1;
		this.cells_ = [];
		this.score_ = 0;
		for (i = 0; i < this.rows_; i++) {
			this.cells_[i] = [];
		}
		for (i = 0; i < this.cols_; i++) {
			for (j = 0; j < this.rows_; j++) {
				this.cells_[i][j] = 0;
			}
		}
	}
	Field.prototype.bubbleVertical = function (direction, col) {
		var i, j, descriptor, prev;
		descriptor = directions[direction];
		prev  = descriptor.prev;
		for (i = this[descriptor.end]; i !== this[descriptor.start]; i += prev) {
			for (j =  this[descriptor.end]; j !== this[descriptor.start]; j += prev) {
				if (this.cells_[j + prev][col] === 0) {
					this.cells_[j + prev][col] = this.cells_[j][col];
					this.cells_[j][col] = 0;
				}
			}
		}
	};
	Field.prototype.bubbleHorizontal = function (direction, col) {
		var i, j, descriptor, prev;
		descriptor = directions[direction];
		prev = descriptor.prev;
		for (i = this[descriptor.end]; i !== this[descriptor.start]; i += prev) {
			for (j =  this[descriptor.end]; j !== this[descriptor.start]; j += prev) {
				if (this.cells_[col][j + prev] === 0) {
					this.cells_[col][j + prev] = this.cells_[col][j];
					this.cells_[col][j] = 0;
				}
			}
		}
	};
	Field.prototype.clear = function (direction) {
	/*cleares spaces between cells_, 
	//moves the cell if there are no other cells_
	should be called before and after Field.merge(direction) */
		var i, descriptor;
		descriptor = directions[direction];
		if (descriptor.orientation === "horizontal") {
			for (i = 0; i < this.rows_; i++) {
				this.bubbleHorizontal(direction, i);
			}
		}
		if (descriptor.orientation === "vertical") {
			for (i = 0; i < this.cols_; i++) {
				this.bubbleVertical(direction, i);
			}
		}
	};
	Field.prototype.mergeRow = function (direction, row) {
		var j, descriptor, next;
		descriptor = directions[direction];
		next = descriptor.next;
		for (j = this[descriptor.start]; j !== this[descriptor.end]; j += next) {
			if (this.cells_[row][j + next] === this.cells_[row][j] && this.cells_[row][j]) {
				this.cells_[row][j] += 1;
				this.score_ += 1 << this.cells_[row][j];
				this.cells_[row][j + next] = 0;
			}
		}
	};
	Field.prototype.mergeCol = function (direction, col) {
		var j, descriptor, next;
		descriptor = directions[direction];
		next = descriptor.next;
		for (j = this[descriptor.start]; j !== this[descriptor.end]; j += next) {
			if (this.cells_[j + next][col] === this.cells_[j][col] && this.cells_[j][col]) {
				this.cells_[j][col] += 1;
				this.score_ += 1 << this.cells_[j][col];
				this.cells_[j + next][col] = 0;
			}
		}
	};
	Field.prototype.merge = function (direction) {
		/*merges 2 near cells with same values, increases the score, sets the first cell value to 0 */
		var i, descriptor, next;
		descriptor = directions[direction];
		next = descriptor.next;
		if (descriptor.orientation === "horizontal") {
			for (i = 0; i < this.rows_; i++) {
				this.mergeRow(direction, i);
			}
		} else if (descriptor.orientation === "vertical") {
			for (i = 0; i < this.cols_; i++) {
				this.mergeCol(direction, i);
			}
		}
	};
	Field.prototype.calcZeros = function () {
		var i, j, rez;
		rez = 0;
		for (i = 0; i < this.rows_; i++) {
			for (j = 0; j < this.cols_; j++) {
				if (this.cells_[i][j] === 0) {
					rez++;
				}
			}
		}
		return rez;
	};
	Field.prototype.generate = function () {
	/* generates new dice on the empty cell with P(2)=0.9, P(4) = 0.1*/
	//the probs are equal for all emty fields
		var i, j, val, range;
		range = this.calcZeros();
		if (roll(10)) {
			val = 2;
		} else {
			val = 1;
		}
		for (i = 0; i < this.rows_; i++) {
			for (j = 0; j < this.cols_; j++) {
				if (this.cells_[i][j] === 0) {
					if (roll(range)) {
						this.cells_[i][j] = val;
						return;
					} else {
						range--;
					}
				}
			}
		}
	};
	Field.prototype.getScore = function () {
		return this.score_;
	};
	Field.prototype.initGraph = function () {
		/*creates required elements in field container. oldschool name from Pascal is used*/
		var fragment, scoreBar, gameField, cell, i, j;
		fragment = document.createDocumentFragment();
		scoreBar = document.createElement('div');
		scoreBar.className = 'scoreBar';
		gameField = document.createElement('ul');
		gameField.className = "game";
		for (i = 0; i < this.rows_; i++) {
			for (j = 0; j < this.cols_; j++) {
				cell = document.createElement('li');
				cell.className = 'cell';
				gameField.appendChild(cell);
			}
		}
		fragment.appendChild(scoreBar);
		fragment.appendChild(gameField);
		this.container_.appendChild(fragment);
	};
	Field.prototype.print = function () {
	/*displays current field state + score on the page
	fills container with required elements if they are absent*/
		var i, j, scoreBar, cells;
		if (this.container_.getElementsByTagName("*").length === 0) {
			this.initGraph();
		}
		scoreBar = this.container_.getElementsByTagName("div")[0];
		scoreBar.innerHTML = this.getScore();
		cells = this.container_.getElementsByTagName("li");
		for (i = 0; i < this.rows_; i++) {
			for (j = 0; j < this.cols_; j++) {
				if (this.cells_[i][j]) {
					cells[i * this.rows_ + j].innerHTML = 1 << this.cells_[i][j];
				} else {
					cells[i * this.rows_ + j].innerHTML = "";
				}
			}
		}
	};
	Field.prototype.isMovable = function (direction) {
	/*checks if the move to %direction% can be performed*/
		var i, j, descriptor, prev;
		descriptor = directions[direction];
		prev = descriptor.prev;
		if (descriptor.orientation === "horizontal") {
			for (i = 0; i < this.rows_; i++) {
				for (j = this[descriptor.end]; j !== this[descriptor.start]; j += prev) {
					if (this.cells_[i][j] && (this.cells_[i][j + prev] === this.cells_[i][j])) {
						return true;
					}
					if (this.cells_[i][j] && !this.cells_[i][j + prev]) {
						return true;
					}
				}
			}
			return false;
		}
		if (descriptor.orientation === "vertical") {
			//debugger;
			for (i = 0; i < this.cols_; i++) {
				for (j = this[descriptor.end]; j !== this[descriptor.start]; j += prev) {
					if (this.cells_[j][i] && this.cells_[j + prev][i] === this.cells_[j][i]) {
						return true;
					}
					if (this.cells_[j][i] && !this.cells_[j + prev][i]) {
						return true;
					}
				}
			}
			return false;
		}
	};
	Field.prototype.step = function (direction) {
		/*calls the functions which are performed during a 1 game move*/
		if (this.isMovable(direction)) {
			this.clear(direction);
			this.merge(direction);
			this.clear(direction);
			this.generate();
			this.print();
		}
	};
	Field.prototype.assign = function (element) {
		/*assigns a new container to a field*/
		this.container_ = element;
	};
	Field.prototype.gameOver = function () {
		/*returns true if there are now valid directions left*/
		var dirs, i;
		dirs = ['left', 'right', 'up', 'down'];
		for (i = 0; i < 4; i++) {
			if (this.isMovable(dirs[i])) {
				return false;
			}
		}
		return true;
	};
	Field.prototype.reset = function () {
	/*resets the game field*/
		var i, j;
		//debugger;
		this.score_ = 0;
		for (i = 0; i < this.rows_; i++) {
			for (j = 0, j = 0; j < this.cols_; j++) {
				this.cells_[i][j] = 0;
			}
		}
	};
	return {
		Field: Field
	};
}());