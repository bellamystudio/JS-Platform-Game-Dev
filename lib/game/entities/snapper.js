ig.module(
	'game.entities.snapper'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntitySnapper = ig.Entity.extend({
	size: {x: 16, y: 16},
	maxVel: {x: 300, y: 100},
	friction: {x: 50, y: 0},
	
	type: ig.Entity.TYPE.B, // Evil enemy group
	checkAgainst: ig.Entity.TYPE.A, // Check against friendly
	collides: ig.Entity.COLLIDES.PASSIVE,
	health: 20,
	speed: 50,
	flip: false,	
	animSheet: new ig.AnimationSheet( 'media/snapper.png', 16, 16 ),
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'snap', 0.05, [2, 2, 2, 2, 2, 2, 2, 0,1] );
	},
	
	
	update: function() {
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
/*	HEALTH BAR
		draw: function() {
        // border/background
        ig.system.context.fillStyle = "rgb(0,0,0)";
        ig.system.context.beginPath();
        ig.system.context.rect(
                        (this.pos.x - ig.game.screen.x) * ig.system.scale, 
                        (this.pos.y - ig.game.screen.y - 8) * ig.system.scale, 
                        this.size.x * ig.system.scale, 
                        4 * ig.system.scale
                    );
        ig.system.context.closePath();
        ig.system.context.fill();
        // health bar
        ig.system.context.fillStyle = "rgb(255,0,0)";
        ig.system.context.beginPath();
        ig.system.context.rect(
                        (this.pos.x - ig.game.screen.x + 1) * ig.system.scale, 
                        (this.pos.y - ig.game.screen.y - 7) * ig.system.scale, 
                        ((this.size.x - 2) * (this.health / this.maxHealth)) * ig.system.scale, 
                        2 * ig.system.scale
                    );
        ig.system.context.closePath();
        ig.system.context.fill(); 
        this.parent();
    }, 
    */
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
        ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, {colorOffset: 1});
    }

});

});