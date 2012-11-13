/* copy of weightmove - make a dissolving platform! */

ig.module(
    'game.entities.dissolving'
)

.requires(
    'impact.entity',
	'game.entities.particle'
)

.defines(function() { 
    
    EntityDissolving = ig.Entity.extend ({ 
        
        _wmDrawBox: true,
        size: {x: 16, y: 16},
        offset: {x: 0, y: 0},
        maxVel: {x: 0, y: 100},
        gravityFactor: 0,
        crumbleState: 0,
        health: 9,
        type: ig.Entity.TYPE.NONE,
       checkAgainst: ig.Entity.TYPE.A,
       collides: ig.Entity.COLLIDES.FIXED,
       
       animSheet: new ig.AnimationSheet( 'media/crumbly.png', 16,16 ),
       
       start: 0, //cache start pos.y

        init: function( x, y, settings ){
            this.parent( x, y, settings );
            this.setupAnimation(this.crumbleState);
            this.maxCrumbles = this.health;
            this.start = y;
        },
        setupAnimation: function(offset){
        	console.log('animframe '+offset);
            this.addAnim('crumble', 0.01, [0+offset]);            
        },
        collideWith: function( other, axis ) {
	        if (other instanceof EntityPlayer) {
		        if (axis === 'y' && other.pos.y < this.pos.y ) {
			        this.crumble = true;
			        this.vel.y + this.health;
			        ig.game.spawnEntity(EntityCrumbly, this.pos.x, this.pos.y);
            	} 
        	}
    	},
        
        update: function(){
            if( this.crumble ){
            	if (this.crumbleState < this.maxCrumbles) {
	            	this.crumbleState ++;
	            	this.alphareduction = this.crumbleState/10;
	            	this.currentAnim.alpha = 1-this.alphareduction;
	            	this.setupAnimation(this.crumbleState);
	            	this.receiveDamage( 1, this );
	            	this.crumble = false;
	            	}
            }
            this.parent();
        }
    
    });    

	EntityCrumbly = ig.Entity.extend({
	        lifetime: 1,
	        callBack: null,
	        particles: 1,
	        init: function( x, y, settings ) {
	            this.parent( x, y, settings );
	                for(var i = 0; i < this.particles; i++)
	                    ig.game.spawnEntity(EntityCrumblyParticle, x, y, {colorOffset: settings.colorOffset ? settings.colorOffset : 0});
	                this.idleTimer = new ig.Timer();
	            },
	            update: function() {
	                if( this.idleTimer.delta() > this.lifetime ) {
	                    this.kill();
	                    if(this.callBack)
	                        this.callBack();
	                    return;
	                }
	            }
	    });
	    
	EntityCrumblyParticle = EntityParticle.extend({
		lifetime: 1,
		fadetime: 1,
		bounciness: 0.2,
		vel: {x: 60, y: 20},
		
		animSheet: new ig.AnimationSheet( 'media/debris.png', 2, 2 ),
			
		init: function( x, y, settings ) {
			this.addAnim( 'idle', 5, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14] );		
			this.parent( x, y, settings );
		}
	});

});
