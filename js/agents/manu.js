(function ($) {
    "use strict";

    var Manu = {
        name: "Manu",
        positionX: 0,
        positionY: 0,
        speed: 20,
        src: 'images/bombe.jpg',
        srcExplosion: 'images/explosion.jpg',
        hit: 0,
        init: function () {
        },
        setKeycode: function (keycode) {
            var that = this;
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
            }
        },
        draw: function (container) {
            var that = this;
            var imageObj = new Image();
            var ctx = container.getContext('2d');

            if (this.hit > 1) {
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