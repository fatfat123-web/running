<template>
    <canvas id="canvas" ></canvas>
</template>

<script>
    export default {
        name: "snow",
        data(){
            return{

            }
        },
        mounted() {
            (function () {

                    var canvas = document.getElementById('canvas');
                    if (!canvas || !canvas.getContext) {
                        return false;
                    }

                    /********************
                     Random Number 随机数
                     ********************/

                    function rand(min, max) {
                        return Math.floor(Math.random() * (max - min + 1) + min);
                    }

                    /********************
                     Var
                     ********************/

                        // canvas
                    var ctx = canvas.getContext('2d');
                    var X = canvas.width = document.body.clientWidth;
                    var Y = canvas.height = document.body.clientHeight;

                    /********************
                     Animation
                     ********************/

                    window.requestAnimationFrame =
                        window.requestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        function(cb) {
                            setTimeout(cb, 17);
                        };

                    /********************
                     Snow
                     ********************/

                        // var
                    var snowNum = 80;
                    var backSnowNum = 80;
                    var snows = [];
                    var backSnows = [];
                    //这个X能算是范围吗
                    if (X < 768) {
                        snowNum = 25;
                        backSnowNum = 25;
                    }

                    function Snow(ctx, x, y, r, g) {
                        this.ctx = ctx;
                        this.init(x, y, r, g);
                    }

                    Snow.prototype.init = function(x, y, r, g) {
                        this.x = x;
                        this.y = y;
                        this.r = r;
                        this.c = '255, 255, 255';
                        this.v = {
                            x: 0,
                            y: g
                        };
                    };

                    Snow.prototype.updatePosition = function() {
                        this.x -= this.v.y;
                    };

                    Snow.prototype.wrapPosition = function() {
                        if (this.x - this.r > X) {
                            this.x = 0;
                        }
                        if (this.x + this.r < 0) {
                            this.x = X;
                        }
                        if (this.y - this.r > Y) {
                            this.y = 0;
                        }
                        if (this.y + this.r < 0) {
                            this.y = Y;
                        }
                    };

                    Snow.prototype.draw = function() {
                        ctx = this.ctx;
                        ctx.save();
                        ctx.beginPath();
                        ctx.fillStyle = this.gradient();
                        ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
                        ctx.fill();
                        ctx.closePath();
                        ctx.restore();
                    };

                    Snow.prototype.gradient = function () {
                        var col = this.c;
                        var g = this.ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
                        g.addColorStop(0, "rgba(" + col + ", " + (1 * 1) + ")");
                        g.addColorStop(0.5, "rgba(" + col + ", " + (1 * 0.2) + ")");
                        g.addColorStop(1, "rgba(" + col + ", " + (1 * 0) + ")");
                        return g;
                    };
                    Snow.prototype.resize = function() {
                        this.x = rand(0, X);
                        this.y = rand(0, Y);
                    };
                    Snow.prototype.render = function() {
                        this.updatePosition();
                        this.wrapPosition();
                        this.draw();
                    };
                    for (var i = 0; i < backSnowNum; i++) {
                        var snow = new Snow(ctx, rand(0, X), rand(0, Y), rand(1, 5), Math.random());
                        backSnows.push(snow);
                    }
                    for (var i = 0; i < snowNum; i++) {
                        var snow = new Snow(ctx, rand(0, X), rand(0, Y), rand(10, 15), Math.random() + 0.3);
                        snows.push(snow);
                    }

                    function render(){
                        ctx.clearRect(0, 0, X, Y);
                        for (var i = 0; i < backSnows.length; i++) {
                            backSnows[i].render();
                        }

                        for (var i = 0; i < snows.length; i++) {
                            snows[i].render();
                        }
                        requestAnimationFrame(render);
                    }

                    render();

                    /********************
                     Event
                     ********************/

                    // resize 大小
                    function onResize() {
                        X = canvas.width = document.body.clientWidth;
                        Y = canvas.height = document.body.clientHeight;
                        for (var i = 0; i < backSnows.length; i++) {
                            backSnows[i].resize();
                        }
                        for (var i = 0; i < snows.length; i++) {
                            snows[i].resize();
                        }
                    }
                    window.addEventListener('resize', function() {
                        onResize();
                    });

            })();

        },
        methods:{

        }
    }
</script>

<style scoped lang="scss">
    body {
        height: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
        background: #74ebd5;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to bottom, #ACB6E5, #74ebd5);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to bottom, #ACB6E5, #74ebd5); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    /********************
      Contents
    ********************/


</style>