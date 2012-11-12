ig.module(
	'game.entities.zombie'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityZombie = ig.Entity.extend({
    animSheet: new ig.AnimationSheet( 'media/enemy1.png', 16, 16 ),
    size: {x: 8, y:14},
    offset: {x: 4, y: 2},
    maxVel: {x: 100, y: 100},
    flip: false,
    friction: {x: 150, y: 0},
    speed: 14,
    grenadeProbability: 100,
    animoffset: 0,
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.PASSIVE,
    setupAnim: function(animoffset){
	    this.addAnim('walk', .07, [0,1,2,3,4,5]);
	    this.addAnim('angry', .07, [11,12,13,14,15]);
    },
    init: function( x, y, settings ) {
    	this.parent( x, y, settings );
    	this.setupAnim(this.animoffset);
    },
    update: function() {
    	// random grenade throw number
    	var throwG = Math.round(Math.random()*100);
    	
    	//console.log(this.health);
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
    	} else if (throwG == this.grenadeProbability) {
	    	ig.game.spawnEntity( 'EntityEvilGrenade', this.pos.x, this.pos.y, {flip:this.flip} );
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
    receiveDamage: function(value){
        this.parent(value);
        if(this.health > 0) 
    		ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, {particles: 2, colorOffset: 1});
    },
    kill: function(){
        ig.game.stats.kills ++;
        this.parent();
        ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, {colorOffset: 1});
    }
});

    EntityEvilGrenade = ig.Entity.extend({
        size: {x: 4, y: 4},
        offset: {x: 2, y: 2},
        animSheet: new ig.AnimationSheet( 'media/grenade.png', 8, 8 ),
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE,
        maxVel: {x: 100, y: 100},
        bounciness: 0.4,
        bounceCounter: 0,
        init: function( x, y, settings ) {
            this.parent( x + (settings.flip ? -4 : 7), y, settings );
            this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
            this.vel.y = -(50 + (Math.random()*100));
            this.addAnim( 'idle', 0.2, [0,1] );
        },
        handleMovementTrace: function( res ) {
        	this.parent( res );
        	if( res.collision.x || res.collision.y ) {
        		// only bounce 3 times
        		this.bounceCounter++;
        		if( this.bounceCounter > 1 ) {
        			this.kill();
        		}
        	}
        },
        check: function( other ) {
        	other.receiveDamage( 10, this );
        	this.kill();
        },
        kill: function(){
            for(var i = 0; i < 20; i++)
                ig.game.spawnEntity(EntityGrenadeParticle, this.pos.x, this.pos.y);
            this.parent();
        }
    });


});
