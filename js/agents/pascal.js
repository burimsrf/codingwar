(function($) {
    "use strict";

    var Rocket = {
        name: "Powerueli",
        positionX: 0,
        positionY: 100,
        hit: 1,
        lastHit: false,
        velocity: 10,
        sprites: [
        [20,67,184,176],
        [235,67,131,176],
        [393,67,149,176],
        ],
        killsprite: [576, 277, 196, 205],
        colors : ['#F60', '#FFF', '#c00', '#FFF'],
        currentSprite: 0,
        sprite: false,
        exploding: false,
        floor: 100,
        gravity: 0.9,
        jumping: false,
        jumpphase: 0,
        init: function() {
        },
        setKeycode: function(keycode) {
            this.exploding = false;
            this.jumping = false;
            
            switch(keycode) {
                case 37: 
                    this.positionX-=this.velocity;
                    break;
                case 38: 
                    this.positionY-=this.velocity;
                    break;
                case 39: 
                    this.positionX+=this.velocity;
                    break;
                case 40:
                    this.positionY+=this.velocity;
                    break;
                case 88:
                    this.exploding = true;    
            }
            if (this.positionY > this.floor) {
                this.positionY = this.floor;
            }
            this.currentSprite = ( this.currentSprite + 1 ) % this.sprites.length;
            
        },
        draw: function(container) {
            var that = this;
            if (that.jumping === true) {
                that.jumping = false;
                that.jumpphase = 1;
                that.positionY--;
                that.positionX++;

                
            }
            if (that.jumping === 'falling') {
                if (that.jumpphase > 100) {
                    that.jumping = false;
                    that.jumpphase = 0;
                } else {
                    that.positionY++;
                    that.positionX++;
                    that.jumpphase++;
                }

            } else if (that.jumpphase > 50) {
                that.jumping = 'falling';
            } else if (that.jumpphase > 0) {
                that.jumpphase++;
                that.positionX++;
                that.positionY--;
            }
            var context = container.getContext('2d');
            if (this.hit>=1) {
                var sprite = new Image();
                sprite.src = 'images/megaueli.jpg'
            
                    var spriteinfo = that.sprites[that.currentSprite];
                    context.drawImage(sprite, that.killsprite[0], that.killsprite[1], that.killsprite[2], that.killsprite[3], that.positionX, that.positionY, 20,20);
                    return;
            }
            
            context.save();
            if (this.exploding) {
                context.fillStyle = that.colors[Math.round(Math.random()*that.colors.length)];
                context.fillRect(0, 0, container.width, container.height);

            }
            var sprite = new Image();
            sprite.src = 'images/megaueli.jpg'
            
                var spriteinfo = that.sprites[that.currentSprite];
                context.drawImage(sprite, spriteinfo[0], spriteinfo[1], spriteinfo[2], spriteinfo[3], that.positionX, that.positionY, 20,20);
                context.restore();
            
                        

            
        }
    }

    window.rocket = Rocket;

})(jQuery);