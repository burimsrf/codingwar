(function($) {
    "use strict";

    var Rocket = {
        name: "Pascal",
        positionX: 0,
        positionY: 0,
        init: function() {
        },
        setKeycode: function(keycode) {
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
            }
        },
        draw: function(container) {
            var context = container.getContext('2d');
            context.fillStyle = "rgb(12,12,12)";
            
            context.fillRect(this.positionX, this.positionY, 10, 10);
        }
    }

    window.rocket = Rocket;

})(jQuery);