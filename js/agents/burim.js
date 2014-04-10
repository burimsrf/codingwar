(function($) {
    "use strict";

    var Rocket = {
        name: "Burim",
        positionX: 0,
        positionY: 0,
        shooting: false,
        shootingX: 0,
        init: function() {
        },
        setKeycode: function(keycode) {
            this.shooting = false;
            switch(keycode) {
                case 37: 
                    this.positionX--;
                    break;
                case 38: 
                    this.positionY--;
                    break;
                case 39: 
                    this.positionX++;
                    break;
                case 40:
                    this.positionY++;
                    break;
                case 32:
                    this.shooting = true;
                    this.playShootSound();
                    break;
            }
        },
        draw: function(container) {
            var context = container.getContext('2d');

            var imageObj = new Image();

            imageObj.src = 'images/burim.png';
            context.drawImage(imageObj,this.positionX,this.positionY,20,9);

            if (this.shooting) {
                this.shoot(context, this.shootingX, this.shootingY);
                this.shootingX = this.shootingX + 5;
            }
        },

        shoot: function(context, posX, posY) {
            context.fillStyle = "rgb(12,12,12)";
            context.clearRect(this.positionX + posX, this.positionY+4, 2, 2);
            context.fillRect(this.positionX + posX, this.positionY+4, 2, 2);
        },

        playShootSound: function() {
            var shootSound = new Audio("sounds/gun_shoot_metal.wav");
            shootSound.loop = false;
            shootSound.volume = .25;
            shootSound.load();
            shootSound.play();
        }
    }

    window.rocket = Rocket;

})(jQuery);