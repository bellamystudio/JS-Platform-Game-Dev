/* copy of weightmove - make a dissolving platform! */

ig.module(
    'game.entities.dissolving'
)

.requires(
    'impact.entity'
)

.defines(function() { 
    
    EntityDissolving = ig.Entity.extend ({ 
        
        _wmDrawBox: true,
        size: {x: 16, y: 16},
        offset: {x: 0, y: 1},
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
            this.addAnim('crumble', 0.1, [0+offset]);            
        },
        collideWith: function( other, axis ) {
	        if (other instanceof EntityPlayer) {
		        if (axis === 'y' && other.pos.y < this.pos.y ) {
			        this.crumble = true;
            	}
        	}
    	},
        
        update: function(){
            if( this.crumble ){
            	if (this.crumbleState < this.maxCrumbles) {
	            	this.crumbleState ++;
	            	this.alphareduction = this.crumbleState/10;
	            	this.vel.y++;
	            	this.currentAnim.alpha = 1-this.alphareduction;
	            	console.log(this.crumbleState);
	            	this.setupAnimation(this.crumbleState);
	            	this.receiveDamage( 1, this );
	            	this.crumble = false;
	            	}
            }
            this.parent();
        }
    
    });    
    
});