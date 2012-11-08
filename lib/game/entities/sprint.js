/*

make the player run!

*/

ig.module(
	'game.entities.sprint'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntitySprint = ig.Entity.extend({
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(255, 102, 102, 0.7)',
	_wmScalable: true,
	size: {x: 16, y: 16},
    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.NEVER,
	check: function( other ) {
		//console.log(this.pos.x, this.pos.y);
		other.sprint=true;
	},
	update: function(){}
});

});