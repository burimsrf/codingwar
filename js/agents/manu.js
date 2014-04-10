(function ($) {
    "use strict";

    var Manu = {
        name: "Manu",
        positionX: 0,
        positionY: 0,
        speed: 7,
        src: 'images/bombe.jpg',
        srcExplosion: 'images/explosion.jpg',
        hit: 1,
        lastHit: false,
        init: function () {
        },
        setKeycode: function (keycode) {
            switch (keycode) {
                case 37:
                    this.positionX -= this.speed;
                    break;
                case 38:
                    this.positionY -= this.speed;
                    break;
                case 39:
                    this.positionX += this.speed;
                    break;
                case 40:
                    this.positionY += this.speed;
                    break;
                case 13:
                    this.hit = 100;
                    break;
            }
        },
        draw: function (container) {
            var that = this;
            var imageObj = new Image();
            var ctx = container.getContext('2d');
            if (this.hit >= 1) {
                imageObj.src = this.srcExplosion;
            } else {
                imageObj.src = this.src;
            }

            ctx.drawImage(
                imageObj,
                that.positionX,
                that.positionY,
                20,
                20
            );
        }
    };

    window.rocket = Manu;

})(jQuery);