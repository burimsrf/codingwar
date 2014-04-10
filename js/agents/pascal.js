(function($) {
    "use strict";

    var Rocket = {
        name: "Powerueli",
        positionX: 0,
        positionY: 0,
        velocity: 10,
        sprites: [
        [20,67,184,176],
        [235,67,131,176],
        [393,67,149,176],
        ],
        currentSprite: 0,
        sprite: false,
        init: function() {
        },
        setKeycode: function(keycode) {
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
            }
            this.currentSprite = ( this.currentSprite + 1 ) % this.sprites.length;
        },
        draw: function(container) {
            var that = this;
            var context = container.getContext('2d');
            context.save();
            context.fillStyle = "rgb(12,12,12, 1)";
            context.font = "5pt Arial";
            context.textAlign = 'center';
            context.fillText('PB', this.positionX + 5, this.positionY + 8);
            context.restore();
            context.save();
            var sprite = new Image();
            sprite.onload = function() {
                var spriteinfo = that.sprites[that.currentSprite];
                context.drawImage(sprite, spriteinfo[0], spriteinfo[1], spriteinfo[2], spriteinfo[3], that.positionX, that.positionY, 50,50);
            context.restore();
                
            }
            sprite.src = 'images/megaueli.jpg'
                        

            
        }
    }


})(jQuery);