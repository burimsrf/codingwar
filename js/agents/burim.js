(function($) {
    "use strict";

    var Burim = {
        name: "Burim",
        positionX: 0,
        positionY: 0,
        keyCode: 0,
        init: function() {

        },
        draw: function(container) {
            var context = container.getContext('2d');
            context.fillStyle = "rgb(0,150,0)";
            context.fillRect(this.keyCode, this.keyCode, 20, 20);
        }
    }

    window.burim = Burim;

})(jQuery);