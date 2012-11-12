ig.module(
	'game.entities.ballboy'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityBallboy = ig.Entity.extend({
	size: {x: 16, y: 16},
	maxVel: {x: 100, y: 100},
	friction: {x: 150, y: 0},
	
	type: ig.Entity.TYPE.B, // Evil enemy group
	checkAgainst: ig.Entity.TYPE.A, // Check against friendly
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	health: 18,
	speed: 14,
	flip: false,
	
	animSheet: new ig.AnimationSheet( 'media/ball-cycle.png', 16, 16 ),
	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'walk', 0.08, [1,2,3,4,5] );
	    this.addAnim('angry', .07, [8,9,10,11,12]);
	},
	
	
	update: function() {
	
	    if(this.health < 7) {
    		this.currentAnim = this.anims.angry;
    		this.grenadeProbability = 98;
    		if (this.speed < 40) {this.speed += 1};
    	}

	
		// near an edge? return!
		if( !ig.game.collisionMap.getTile(
				this.pos.x + (this.flip ? +4 : this.size.x -4),
				this.pos.y + this.size.y+1
			)
		) {
			this.flip = !this.flip;
		}
		
    	var xdir = this.flip ? -1 : 1;
    	this.vel.x = this.speed * xdir;
    	this.currentAnim.flip.x = this.flip;
    	this.parent();
	},
	
	
	handleMovementTrace: function( res ) {
		this.parent( res );
		
		// collision with a wall? return!
		if( res.collision.x ) {
			this.flip = !this.flip;
		}
	},	
	
	check: function( other ) {
		other.receiveDamage( 10, this );
	},
    kill: function(){
        ig.game.stats.kills ++;
        this.parent();
        ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, {colorOffset: 0});
    }
});

});