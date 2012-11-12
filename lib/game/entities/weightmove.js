ig.module(
    'game.entities.weightmove'
)

.requires(
    'impact.entity'
)

.defines(function() { 
    
    EntityWeightmove = ig.Entity.extend ({ 
        
        _wmDrawBox: true,
        size: {x: 24, y: 8},
        offset: {x: 0, y: 1},
        maxVel: {x: 0, y: 100},
        gravityFactor: 0,
        
        type: ig.Entity.TYPE.NONE,
       checkAgainst: ig.Entity.TYPE.A,
       collides: ig.Entity.COLLIDES.FIXED,
       
       animSheet: new ig.AnimationSheet( 'media/weightmove.png', 24, 8 ),
       
       start: 0, //cache start pos.y

        init: function( x, y, settings ){
            this.parent( x, y, settings );
            this.addAnim ('change', .2, [0,1,2]);
            this.start = y;
            
        },
        
        collideWith: function( other, axis ) {
	        if (other instanceof EntityPlayer) {
		        if (axis === 'y' && other.pos.y < this.pos.y ) {
			        this.move = true;
            	}
        	}
    	},
        
        update: function(){
            if( this.move ){
                this.move = false;
                this.vel.y++;
            }
            else if( this.pos.y > this.start ){
                this.vel.y = -50;
            }
            else{
                this.pos.y = this.start;
                this.vel.y = 0;
            }
            this.parent();
        }
    
    });    
    
});