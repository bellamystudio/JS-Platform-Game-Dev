ig.module(
    'game.entities.hielo'
)
.requires(
    'impact.entity'
)
.defines(function(){
    
EntityHielo = ig.Entity.extend({
    size: {x: 16, y: 16},
    checkAgainst: ig.Entity.TYPE.A,

    _wmScalable: true,
    _wmDrawBox: true,
    _wmBoxColor: 'rgba(0, 132, 255, 0.7)'
        
});

});