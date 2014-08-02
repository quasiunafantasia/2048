//--------------------constructor  test-------------------------------------
QUnit.test( "constructor  test", function( assert ) {
	var instance = new FieldModule.Field();

	assert.deepEqual( instance.cells, [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], "Constructor is OK" );
	instance = null;
});
//--------------------simple move test-----------------------------------------
QUnit.test( "simple move test 1 ", function( assert ) {
	var instance = new FieldModule.Field();
	instance.cells = [[2,0,0,0],[0,2,0,0],[2,0,2,0],[2,2,0,0]];
	instance.clear("right");
	assert.deepEqual( instance.cells, [[0,0,0,2],[0,0,0,2],[0,0,2,2],[0,0,2,2]], "Field.clear() is ok" );
	instance.cells = [[2,0,0,0],[2,2,2,2],[2,0,0,2],[0,0,2,2]];
	instance.clear("right");
	assert.deepEqual( instance.cells, [[0,0,0,2],[2,2,2,2],[0,0,2,2],[0,0,2,2]], "Field.clear() is ok" );
	instance = null;
});
//-----------------merge test------------------------------------------
 QUnit.test( "merge test", function( assert ) {
	var instance = new FieldModule.Field();
	instance.cells = [[0,2,2,2],[2,2,2,2],[2,2,0,0],[4,4,2,2]];
	instance.move("right");
	assert.deepEqual( instance.cells, [[0,2,0,3],[0,3,0,3],[0,3,0,0],[0,5,0,3]], "Field.clear() is ok" );
	instance = null;
});
//-------------------merge with spaces test--------------------------------------
QUnit.test( "merge with spaces test", function( assert ) {
	 var instance = new FieldModule.Field();
	instance.cells = [[0,2,0,2],[2,2,2,2],[2,0,0,2],[4,4,2,2]];
	instance.clear("right");
	instance.move("right");
	instance.clear("right");

	assert.deepEqual( instance.cells, [[0,0,0,3],[0,0,3,3],[0,0,0,3],[0,0,5,3]], "Field.clear() is ok" );
	instance = null;
});
//------------------calcZeros----------------------------------------------
QUnit.test( "calcZeros test", function( assert ) {
	var instance = new FieldModule.Field();
	
	instance.cells = [[0,2,2,2],[2,2,2,2],[2,2,0,0],[4,4,2,2]];
	assert.equal( instance.calcZeros(), 3, "" );
	instance.cells = [[0,2,2,0],[2,0,2,2],[2,0,0,0],[4,4,2,2]];
	assert.equal( instance.calcZeros(), 6, "" );
});
//----------------getScore-------------------------------------------------
	//this function testing requieres users actions
//----------------isMovable-------------------------------------------------
QUnit.test( "isMovable test", function( assert ) {
	var instance = new FieldModule.Field();
	instance.cells = [[0,2,2,2],[2,2,2,2],[2,2,0,0],[4,4,2,2]];
	assert.equal( instance.getScore(), 44, "" );
	instance.cells = [[0,2,2,0],[2,0,2,2],[2,0,0,0],[4,4,2,2]];
	assert.equal( instance.getScore(), 32, "" );
});