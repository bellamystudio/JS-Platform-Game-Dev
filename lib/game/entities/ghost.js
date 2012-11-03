ig.module(
	'game.entities.ghost'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityGhost = ig.Entity.extend({
    animSheet: new ig.AnimationSheet( 'media/ghost.png', 16, 16 ),
    size: {x: 13, y:14},
    offset: {x: 3, y: 2},
    flip: false,
        maxVel: {x: 100, y: 150},
        friction: {x: 600, y: 0},
        accelGround: 400,
        accelAir: 200,
        floaty: 200,


    speed: 14,
    animoffset: 0,    
    type: ig.Entity.TYPE.A,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.NEVER,
    setupAnim: function(animoffset){
	    this.addAnim('float', .07, [4,5,6,7]);
	    //this.addAnim('angry', .07, [8,9,10,11,12,13]);
    },
    init: function( x, y, settings ) {
    	this.parent( x, y, settings );
    	this.setupAnim(this.animoffset);
    	this.currentAnim.alpha = 0.5;
    	this.floatMin = this.pos.y;
    	this.floatMax = this.pos.y - 100;
    },
    update: function() {
        var accel = this.standing ? this.accelGround : this.accelAir;
    	// near an edge? return!
    	if( !ig.game.collisionMap.getTile(
    		this.pos.x + (this.flip ? +4 : this.size.x -4),
    			this.pos.y + this.size.y+1
    		)
    	) {
    		this.flip = !this.flip;
    	}
    	var xdir = this.flip ? -1 : 1;
    	//if(this.standing) {this.vel.y = -this.floaty};
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
    }/*,
    receiveDamage: function(value){
        this.parent(value);
        if(this.health > 0) 
    		ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, {particles: 2, colorOffset: 1});
    }
    kill: function(){
        ig.game.stats.kills ++;
        this.parent();
        ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, {colorOffset: 1});
    }*/
});

});
