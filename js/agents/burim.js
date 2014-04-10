(function($) {
    "use strict";

    var Rocket = {
        name: "Burim",
        positionX: 0,
        positionY: 0,
        shooting: false,
        shootingX: 0,
        deltaTime: 0,
        speed: 100,
        imgSrc: "images/burim.png",
        hit: 0,
        lastHit:false,
        init: function() {
        },
        setKeycode: function(keycode) {
            this.shooting = false;
            switch(keycode) {
                case 37:
                    this.positionX-= this.speed * this.deltaTime;
                    break;
                case 38:
                    this.positionY-= this.speed * this.deltaTime;
                    break;
                case 39:
                    this.positionX+= this.speed * this.deltaTime;
                    break;
                case 40:
                    this.positionY+= this.speed * this.deltaTime;
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
            var width = 20;
            var height = 9;

            if (this.hit == 1) {
                width = 40;
                height = 18;
            }

            imageObj.src = this.imgSrc;
            context.drawImage(imageObj,this.positionX,this.positionY,width,height)

            //context.rotate(20*Math.PI/180);

            if (this.shooting) {
                this.shoot(context, this.shootingX, this.shootingY);
                this.shootingX = this.shootingX + 5;
                //this.grayScale(context, this.positionX,this.positionY,width,height);
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
        },

        grayScale: function (context, posX, posY, imgWidth, imgHeight) {
            var imgData = context.getImageData(posX, posY, imgWidth, imgHeight);
            var pixels  = imgData.data;
            for (var i = 0, n = pixels.length; i < n; i += 4) {
                var grayscale = pixels[i] * .3 + pixels[i+1] * .59 + pixels[i+2] * .11;
                pixels[i  ] = grayscale;        // red
                pixels[i+1] = grayscale;        // green
                pixels[i+2] = grayscale;        // blue
                //pixels[i+3]              is alpha
            }
            //redraw the image in black & white
            context.putImageData(imgData, posX, posY, imgWidth, imgHeight);
        }
    }

    window.rocket = Rocket;

})(jQuery);