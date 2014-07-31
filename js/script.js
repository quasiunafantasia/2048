var COLLS = 4, RAWS = 4; 
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
				this.cells[i][j]=new Cell((i*RAWS)+j);
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
Field.prototype.display = function(){
	var str = "";
	for(var i =0; i < COLLS; i++){
		str="";
		for (var j =0; j<RAWS; j++)
			console.log(this.cells[i][j].value);
		console.log();
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
Field.prototype.display = function(){
	var str = "";
	for(var i =0; i < COLLS; i++){
		str="";
		for (var j =0; j<RAWS; j++)
			console.log(this.cells[i][j].value);
		console.log();
	}
}
f.setLinks();