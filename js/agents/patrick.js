(function($) {
    "use strict";

    var Rocket = {
        name: "Patrick",
        positionX: 0,
        positionY: 0,
        step: 5,
        lastKeycode: 0,
        lastHit: false,
        hit: 0,
        init: function() {
        },
        setKeycode: function(keycode) {
            switch(keycode) {
                case 37:
                    this.positionX = this.positionX-this.step;
                    break;
                case 38: 
                    this.positionY = this.positionY-this.step;
                    break;
                case 39: 
                    this.positionX = this.positionX+this.step;
                    break;
                case 40:
                    this.positionY = this.positionY+this.step;
                    break;
            }
            this.lastKeycode = keycode;
        },
        draw: function(container) {
            var context = container.getContext('2d');
            context.fillStyle = "rgb(00,00,99)";
            var pat = new Image();
            pat.src = "images/purplepal.png";

            if (this.hit > 0) {
                context.drawImage(pat, this.positionX+10, this.positionY+10, 10, 10);
            } else {
                context.drawImage(pat, this.positionX, this.positionY, 20, 20);
            }
        }
    }

    window.rocket = Rocket;

})(jQuery);