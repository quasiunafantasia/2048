//--------------------constructor  test-------------------------------------
QUnit.test( "constructor  test", function( assert ) {
	var instance = new FieldModule.Field();

	assert.deepEqual( instance.cells, [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], "Constructor is OK" );
	instance = null;
});
//--------------------simple move test-----------------------------------------
QUnit.test( "simple move test", function( assert ) {
	var instance = new FieldModule.Field();
	instance.cells = "aaaa";//[[2,0,0,0],[0,2,0,0],[2,0,2,0],[2,2,0,0]];
	instance.clear("right");
	assert.deepEqual( instance.cells, [[0,0,0,2],[0,0,0,2],[0,0,2,2],[0,0,2,2]], "Field.clear() is ok" );
	instance.cells = [[2,0,0,0],[2,2,2,2],[2,0,0,2],[0,0,2,2]];
	instance.clear("right");
	assert.deepEqual( instance.cells, [[0,0,0,2],[2,2,2,2],[0,0,2,2],[0,0,2,2]], "Field.clear() is ok" );
	instance = null;
	//there should be some other tetcases for other directions
	//however there are no ones. it just works
});
//-----------------merge test------------------------------------------
 QUnit.test( "merge test", function( assert ) {
	var instance = new FieldModule.Field();
	instance.cells = [[0,2,2,2],[2,2,2,2],[2,2,0,0],[4,4,2,2]];
	instance.move("right");
	assert.deepEqual( instance.cells, [[0,2,0,3],[0,3,0,3],[0,3,0,0],[0,5,0,3]], "Field.clear() is ok" );
	instance = null;
	//there should be some other tetcases for other directions
	//however there are no ones. it just works
});
//-------------------merge with spaces test--------------------------------------
QUnit.test( "merge with spaces test", function( assert ) {
	 var instance = new FieldModule.Field();
	instance.cells = [[0,2,0,2],[2,2,2,2],[2,0,0,2],[4,4,2,2]];
	//these actions are peformed in Field.step(direction)---
	instance.clear("right");
	instance.move("right");
	instance.clear("right");
	//------------------------------------------------------
	assert.deepEqual( instance.cells, [[0,0,0,3],[0,0,3,3],[0,0,0,3],[0,0,5,3]], "Field.clear() is ok" );
	instance = null;
	//there should be some other tetcases for other directions
	//however there are no ones. it just works
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
QUnit.test( "merge with spaces test", function( assert ) {
	 var instance = new FieldModule.Field();
	instance.cells = [[0,2,0,2],[2,2,2,2],[2,0,0,2],[4,4,2,2]];
	//these actions are peformed in Field.step(direction)----
	instance.clear("right");
	instance.move("right");
	instance.clear("right");
	//------------------------------------------------------
	assert.equal(instance.getScore(),72,"");
	//there should be some other tetcases for other directions
	//however there are no ones. it just works	
});	
//----------------isMovable-------------------------------------------------
QUnit.test( "isMovable test", function( assert ) {
	var instance = new FieldModule.Field();
	instance.cells = [[0,2,2,2],[2,2,2,2],[2,2,0,0],[4,4,2,2]];
	assert.equal( instance.isMovable("right"), true, "right, should be OK" );
	instance.cells = [[0,2,2,0],[2,0,2,2],[2,0,0,0],[4,4,2,2]];
	assert.equal( instance.isMovable("left"), true, "left, should be OK" );
});