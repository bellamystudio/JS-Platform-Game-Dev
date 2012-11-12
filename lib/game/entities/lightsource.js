ig.module(
	'game.entities.lightsource'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityLightsource = ig.Entity.extend({
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(255, 255, 204, 0.7)',
	light: false,
	size: {x: 16, y: 16},

	init: function( x, y, settings ) {
		this.parent( x, y, settings );		
		this.light = ig.game.lightManager.addLight(this, {
			angle: 0,
			angleSpread: 380,
			radius: 20,
			color:'rgba(255,255,255,0.1)',
			useGradients: true,
			shadowGradientStart: 'rgba(0,0,0,0.1)',
			shadowGradientStop: 'rgba(0,0,0,0.1)',
			lightGradientStart: 'rgba(0,255,0,0.1)',
			lightGradientStop: 'rgba(0,0,0,0.8)',
			pulseFactor: 5
		});
	}
});

});