(function ($) {
    "use strict";

    var Manu = {
        name: "Manu",
        positionX: 0,
        positionY: 0,
        speed: 20,
        src: 'images/bombe.jpg',
        boom: false,
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
                case 13:
                    if (that.boom === false) {
                        that.src = "images/explosion.jpg";
                        that.boom = true;
                    } else {
                        that.src = "images/bombe.jpg";
                        that.boom = false;
                    }
                    break;
            }
        },
        draw: function (container) {
            var that = this;
            var imageObj = new Image();
            var ctx = container.getContext('2d');

            imageObj.src = this.src;
            ctx.drawImage(
                imageObj,
                that.positionX,
                that.positionY,
                18,
                27
            );
        }
    };

    window.rocket = Manu;

})(jQuery);