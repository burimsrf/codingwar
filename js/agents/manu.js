(function($) {
    "use strict";

    var Manu = {
        name: "Manu",
        positionX: 0,
        positionY: 0,
        keyCode: 0,
        init: function() {
            this.initObserver();
        },
        initObserver: function() {

        },
        draw: function(container) {
            var context = container.getContext('2d');
            context.fillStyle = "rgb(140,150,0)";
            context.fillRect(this.keyCode, this.keyCode, 20, 20);
        }
    };

    window.manu = Manu;


})(jQuery);