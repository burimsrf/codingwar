(function($) {
    "use strict";

    var Base = function(options) {
        this.init(options);
    }

    Base.prototype = {
        constructor: Base,
        agents: {},
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
                    that.agents[rocketObj.name] = rocketObj;
                }

                this.socket.onclose = function(){
                    that.message('Socket Status: ' + that.socket.readyState + ' (Closed)');
                }

            } catch(exception){
                this.message('Error');
            }
        },

        message: function(text) {
            //console.log(text);
        },

        draw: function() {
            var context = this.container.getContext('2d');
            var that = this;
            this.container.width = this.container.width;
            context.fillStyle = "rgb(140,0,0)";
            context.fillRect(0, 0, this.container.width, this.container.height);

            context.clearRect(10, 10, this.container.width - 20, this.container.height - 20);

            context.fillStyle = "rgb(0,0,0)";
            context.strokeRect(13, 13, this.container.width - 26, this.container.height - 26);
            that.render();
        },
        collides: function(agentA, agentB) {
            var distX = agentA.positionX - agentB.positionX;
            var distY = agentA.positionY - agentB.positionY;
        	var squaredist = (distX * distX) + (distY * distY)
        	return squaredist <= 400;
            
            
        },
        render: function() {
            var that = this;
            for(var identifier in this.agents) {
                var agent = this.agents[identifier];
                    var collides = false;
                    if (identifier == window.rocket.name) {
                        for(var id in this.agents) {
                            if (id != agent.name && this.agents[id].hit > 0) {
                                collides = collides || that.collides(agent, this.agents[id]);
                            }
                        }
                        if (collides) {
                            if (window.rocket.hit > 0 && new Date().getTime() - window.rocket.lastHit > 1000) {
                                window.rocket.hit=0;
                                window.rocket.lastHit = new Date().getTime();
                                var jsonstr = JSONfn.stringify(window.rocket);
                                that.socket.send(jsonstr);
                                
                            } else if (new Date().getTime() - window.rocket.lastHit > 10000 ) {
                                window.rocket.hit = 1;
                                window.rocket.lastHit = new Date().getTime();

                                var jsonstr = JSONfn.stringify(window.rocket);
                                that.socket.send(jsonstr);
                                
                            } 
                        }
                        
                    }
                    agent.init();
                    agent.draw(that.container);
                    
             }
        }
    }

    $(document).on('ready', function() {
        var baseObject = new Base({
            container: document.getElementById('baseContainer')
        });

        var keysDown = {};
        var lastUpdate = new Date().getTime();;

        (function animloop(){

            if (typeof window.rocket === 'undefined') {
                return;
            }
            var date = new Date();
            var deltaTime = (date.getTime() - lastUpdate) / 1000;
            lastUpdate = date.getTime();

            window.rocket.deltaTime = deltaTime;

            if (Object.keys(keysDown).length > 0) {

                for (var keyCode in keysDown) {
                    window.rocket.setKeycode(parseInt(keyCode));
                }

                // send the rocket object with functions to the websocket server
                var jsonstr = JSONfn.stringify(window.rocket);

                // send the message as an ordinary text
                baseObject.socket.send(jsonstr);
            }

          requestAnimFrame(animloop);
          baseObject.draw();
        })();

        if("WebSocket" in window) {
            baseObject.connect();
        } else {
            console.log('Websockets are not supportet on your browser!!!')
        }


        $(document).keydown(function(e) {
            keysDown[e.keyCode] = 1;
        });

        $(document).keyup(function(e) {
            delete keysDown[e.keyCode];
        });
    });
    window.requestAnimFrame = (function(){
      return  function( callback ){
                window.setTimeout(callback, 1000 / 20);
              };
    })();

})(jQuery);