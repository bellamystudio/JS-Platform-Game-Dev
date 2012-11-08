
ig.module('game.entities.followcamera')

.requires('impact.entity')

.defines(function () {
    var ACCEL_FACTOR = 0.1;
    EntityFollowcamera = ig.Entity.extend({
        _wmDrawBox: true,
        _wmBoxColor: '#0000ff',
        size: {
            x: 32,
            y: 32
        },
        maxVel: {
            x: 5000,
            y: 5000
        },
        collides: ig.Entity.COLLIDES.NEVER,
        gravityFactor: 0,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.halfScreenWidth = ig.system.width / 2;
            this.halfScreenHeight = ig.system.height / 2;
        },
        calculatePlayerStats: function () {
            this.player = ig.game.getEntityByName('EntityPlayer');
            if (this.player) {
                this.halfPlayerWidth = this.player.size.x / 2;
                this.halfPlayerHeight = this.player.size.y / 2;
                this.maxVel = this.player.maxVel;
            }
        },
        update: function () {
            this.parent();
            ig.game.screen.x = this.pos.x;
            ig.game.screen.y = this.pos.y;
            if (!this.player) {
                this.calculatePlayerStats();
            }
            if (this.player && this.player.alive) {
                var currentX = this.pos.x;
                var currentY = this.pos.y;
                var targetX = this.player.pos.x - this.halfScreenWidth + this.halfPlayerWidth;
                var targetY = this.player.pos.y - this.halfScreenHeight + this.halfPlayerHeight;
                this.pos.x = Math.round(currentX + (targetX - currentX) * ACCEL_FACTOR);
                this.pos.y = Math.round(currentY + (targetY - currentY) * ACCEL_FACTOR);
            } else {
                this.player = null;
            }
        }
    });
});