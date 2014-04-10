(function($) {
    "use strict";

    var Rocket = {
        name: "Burim",
        positionX: 0,
        positionY: 0,
        shooting: false,
        shootingX: 0,
        shootingY: 0,
        init: function() {
        },
        setKeycode: function(keycode,container) {
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
                    break;
            }
        },
        draw: function(container) {
            var context = container.getContext('2d');
            //context.fillStyle = "rgb(12,12,12)";

            var imageObj = new Image();

            //imageObj.onload = function() {
                imageObj.src = 'http://local/codingwar/images/burim.png';
                context.drawImage(imageObj,this.positionX,this.positionY,20,9);
            //};

            if (this.shooting) {
                this.shoot(context, this.shootingX, this.shootingY);

                this.shootingX = this.shootingX + 5;
            }
        },

        shoot: function(context, posX, posY) {
            context.fillStyle = "rgb(12,12,12)";
            context.fillRect(this.positionX + posX, this.positionY+4, 2, 2);
        }
    }

    window.rocket = Rocket;

})(jQuery);