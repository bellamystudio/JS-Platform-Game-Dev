/*

update the player startPosition = {x:x,y:y};

*/

ig.module(
	'game.entities.spawnpoint'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntitySpawnpoint = ig.Entity.extend({
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(255, 204, 0, 0.7)',
	_wmScalable: true,	
	size: {x: 16, y: 16},
    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.NEVER,
	check: function( other ) {
		console.log(this.pos.x, this.pos.y);
		other.updateStartPos(this.pos.x, this.pos.y);
	},
	update: function(){}
});

});