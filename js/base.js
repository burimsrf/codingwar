(function($) {
    "use strict";

    var Base = function(options) {
        this.init(options);
    }

    Base.prototype = {
        constructor: Base,

        init: function(options) {
            this.container = options.container;
        },

        connect: function() {
            try{

                var that = this;

                var ws_creator = window['MozWebSocket'] ? window['MozWebSocket'] : window['WebSocket'];

                that.socket = new ws_creator('ws://10.175.56.159:1337');

                this.message('Socket Status: ' + that.socket.readyState);

                this.socket.onopen = function(){
                    that.message('Socket Status: ' + that.socket.readyState + ' (open)');
                }

                this.socket.onmessage = function(msg){
                    that.message('Received: ' + msg.data);

                    var rocket = JSONfn.parse(msg.data);
                    var rocketObj = JSONfn.parse(rocket.data.text);

                    // run the object methods are coming over the websocket clients
                    rocketObj.init();
                    rocketObj.draw(that.container);
                }

                this.socket.onclose = function(){
                    that.message('Socket Status: ' + that.socket.readyState + ' (Closed)');
                }

            } catch(exception){
                this.message('Error');
            }
        },

        message: function(text) {
            console.log(text);
        },

        draw: function() {
            var context = this.container.getContext('2d');

            context.fillStyle = "rgb(140,0,0)";
            context.fillRect(0, 0, this.container.width, this.container.height);

            context.clearRect(10, 10, this.container.width - 20, this.container.height - 20);

            context.fillStyle = "rgb(0,0,0)";
            context.strokeRect(13, 13, this.container.width - 26, this.container.height - 26);
        }
    }

    $(document).on('ready', function() {
        var baseObject = new Base({
            container: document.getElementById('baseContainer')
        });

        baseObject.draw();

        if("WebSocket" in window) {
            baseObject.connect();
        } else {
            console.log('Websockets are not supportet on your browser!!!')
        }

        $(document).keydown(function(e) {

            window.rocket.keyCode = e.keyCode;

            // send the rocket object with functions to the websocket server
            var jsonstr = JSONfn.stringify(window.rocket);

            // send the message as an ordinary text
            baseObject.socket.send(jsonstr);
        });
    });

})(jQuery);