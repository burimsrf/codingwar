(function($) {
    "use strict";

    var Rocket = {
        name: "Burim",
        positionX: 0,
        positionY: 0,
        keyCode: 0,
        init: function() {

        },
        draw: function() {
            var container = document.getElementById('hackContainer');
            var context = container.getContext('2d');
            context.fillStyle = "rgb(0,150,0)";
            context.fillRect(this.keyCode, this.keyCode, 20, 20);
        }
    }

    window.rocket = Rocket;

})(jQuery);