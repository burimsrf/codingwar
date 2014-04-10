(function($) {
    "use strict";

    var Sven = {
        name: "Sven",
        positionX: 100,
        positionY: 100,
        deltaTime: 0,
        speed: 100,
        hit: 0,
        lastHit: false,
        superShape: function (context, image_id, d_image, a, b, m, n1, n2, n3, pntx,pnty, scale){
            var r = 0;
            var p  = 0;
            var xp = 0;
            var yp = 0;

            while(p <= 3.14*2/*TWO_PI*/){
                var ang = m * p / 4;
                r = Math.pow(Math.pow(Math.abs(Math.cos(ang) / a), n2) + Math.pow(Math.abs(Math.sin(ang) / b), n3),-1/n1);
                xp = r * Math.cos(p);
                yp = r * Math.sin(p);

                p += 0.01;

                //putpixelb(pntx + xp *scale, pnty + yp * scale,1,1,1);
                d_image[0]   = 1;
                d_image[1]   = 1;
                d_image[2]   = 1;
                d_image[3]   = 255;
                context.putImageData( image_id, pntx + xp *scale, pnty + yp * scale);

            }
        },
        init: function() {
            var self = window.rocket;
            var date = new Date();
            self.lastUpdate = date.getTime();
        },
        setKeycode: function(keycode) {

            var self = window.rocket;

            switch(keycode) {
                case 37:
                    self.positionX-= self.speed * self.deltaTime;
                    break;
                case 38:
                    self.positionY-= self.speed * self.deltaTime;
                    break;
                case 39:
                    self.positionX+= self.speed * self.deltaTime;
                    break;
                case 40:
                    self.positionY+= self.speed * self.deltaTime;
                    break;
            }
        },
        draw: function(container) {
            var self = window.rocket;
            var ctx = container.getContext('2d');
            var image_id = ctx.createImageData(1,1);
            var d_image  = image_id.data;

            // Create gradient
            var grd = ctx.createRadialGradient(this.positionX,this.positionY,5,this.positionX,this.positionY,10);

            if (this.hit) {
                grd.addColorStop(0,"red");
            } else {
                grd.addColorStop(0,"green");
            }
            grd.addColorStop(1,"transparent");

            // Fill with gradient
            ctx.fillStyle = grd;
            ctx.fillRect(this.positionX-10,this.positionY-10,20,20);

            var date = new Date();
            this.superShape(ctx, image_id, d_image, 1, 0.5+ (Math.abs((((date.getTime() / 10) % 100)) - 50) / 100), 20, 3.5, 5.5,0.5+ (Math.abs((((date.getTime() / 50) % 100)) - 50) / 10), this.positionX,this.positionY, 10);

        }
    }

    window.rocket = Sven;

})(jQuery);