<template>
    <div class="scroll" ref="scroll" @scroll="scroll">
        <div style="position: fixed;top:3.7%;right:23.1%;z-index: 999;">
            <div @click="pause(true)" class="music">

                <div v-if="off===true">
                    <span style="color: white">关音乐</span>
                </div>
                <div v-if="off===false">
                    <span style="color: white">开音乐</span>
                </div>

            </div>
            <!--            controls  -->
            <audio ref="music" id="music" src="../assets/music/cn.mp3" loop="loop" preload autoplay="autoplay"></audio>
        </div>
        <v-touch @swiperight="swiperight" class="wrapper">

            <div class="main animate__animated"
                 style="background: #b5def4;height: 100vh;width: 100%;position: fixed;left: 0;top: 0;z-index: 2;"
                  :class="animateEnd ? '' : 'animate__fadeOut'" v-if="mainShow">

                <div class="fontone mv1" v-if="!load" style="left: 30%;z-index: 99" >上滑屏幕进行观看</div>
                <div class="container" style="left:11%;z-index: 99">
                    <p>(请保持手机横屏)</p>
                </div>

<!--                <p class="font1 animate__animated" v-if="!load"-->
<!--                   :class="animate ?' animate__bounceInRight' : 'animate__bounceOutDown'">上滑屏幕进行观看</p>-->
<!--                <p class="font2 animate__animated " v-if="!load"-->
<!--                   :class="animate ? 'animate__bounceInDown' : 'animate__bounceOutUp'">(请保持手机横屏)</p>-->
            </div>

        </v-touch>


        <div class="hint" v-if="hint===true" @click="hint=false">
            <div class="circle top"></div>
            <div class="moveup">
                <div class="arrow arrow-up"></div>
            </div>
            <div class="movedown">
                <div class="arrow arrow-down"></div>
            </div>
            <div class="circle bottom"></div>

        </div>
        <div class="main" @touchstart.prevent="gtouchstart" @touchend.prevent="triggerReply">

            <img src="../assets/images/bj.jpg" style="width: 100%;height: auto;" @load="imgLoadEnd" />

            <div style="width:31%;position: fixed;" ref="go" :style="go" v-show="kg===false">

                <img style="width: 100%;height: auto" class="element" :src="item" v-for="(item,index) in img2"
                     v-show="index === mark">


            </div>

            <div style="width:31%;position: fixed;" ref="go" :style="go" v-show="kg===true">

                <img style="width: 100%;height: auto" class="element" :src="item" v-for="(item,index) in img"
                     v-show="index === mark">
            </div>

        </div>
    </div>
</template>

<script>
    import froth from './froth'
    export default {
        name: "index",
        data() {

            return {
                hint: true,
                kg: true,
                //前进
                front: null,
                off:true,
                x: null,
                Y: null,
                startX: null,
                startY: null,
                test: 0,
                timer: null,
                flagfind: false,
                mark: 0,
                rs: null,
                mainShow: true,
                animateEnd: true,
                animate: true,
                load: true,

                img: [require('../assets/images/a.png'), require('../assets/images/b.png'),
                    require('../assets/images/c.png')],

                img2: [require('../assets/images/0.png'), require('../assets/images/1.png'),
                    require('../assets/images/2.png')],

                go: {top: '35%', left: '2%'},
            }
        },
        mounted() {
            this.autoPlayAudio();
        },
        components: {
            froth,
        },
        methods: {

            pause(val) {

                // console.log(this.$refs.music)
                if (this.$refs.music !== null) {
                    //检测播放是否已暂停.this.$refs.music.paused 在播放器播放时返回false.
                    // console.log(this.$refs.music.paused);
                    if (this.$refs.music.paused) {
                        this.$refs.music.play();// 这个就是播放
                        this.off = true

                    } else {
                        if (val) {
                            this.$refs.music.pause();// 这个就是暂停
                            this.off = false
                        }
                    }
                }
            },
            autoPlayAudio() {
                //把this的指向给存了起来，使得try里面的pause调用上面的pause方法
                const _this = this
                try {
                    WeixinJSBridge.invoke('WeixinJSBridgeReady', {}, function (e) {
                        _this.pause()
                    });
                } catch (e) {
                    _this.pause()
                }
            },

            scroll(e) {
                //滚动条拖动的长度
                const scrollTop = e.target.scrollTop
                //网页正文全文高，包括有滚动条时的未见区域
                let scrollHeight = this.$refs.scroll.scrollHeight
                // 可视窗口的高度
                let clientHeight = this.$refs.scroll.clientHeight
                //减去滚动条可拖动的网页长度
                let Height = scrollHeight - clientHeight
                //滚动条滚动距离 百分比
                let scrolldrag = scrollTop / Height
                this.rs = (scrolldrag * 500).toFixed(2) * 1
            },

            swiperight() {
                let div = this.$refs.scroll
                div.scrollTop += 2
                this.animate = false
                setTimeout(() => {
                    this.animateEnd = false
                    setTimeout(() => {
                        this.mainShow = false
                        // this.autoPlayAudio()
                    }, 400)
                }, 600)
            },

            imgLoadEnd() {
                setTimeout(() => {
                    this.$nextTick(() => {
                        this.load = false
                    })
                }, 10)
            },

            // 触摸开始
            gtouchstart(e) {
                // 可视窗口的高度
                let clientHeight = this.$refs.scroll.clientHeight
                this.startX = e.changedTouches[0].pageX;
                this.startY = e.changedTouches[0].pageY;
                this.front = (clientHeight) * (0.4);
                if (this.startY < this.front) {
                    this.kg = false;
                    this.flagfind = false
                    this.retreat()
                } else {
                    this.kg = true;
                    this.flagfind = false
                    this.advance()
                }
            },
            //   前进
            advance() {
                let div = this.$refs.scroll
                div.scrollTop += 2
                let arr = [0, 1, 0, 2]
                this.mark = arr[parseInt(this.rs) % 4];
                if (this.flagfind === true) return false;
                window.requestAnimationFrame(this.advance)
            },
            // 后退
            retreat() {
                let arr = [0, 1, 0, 2]
                this.mark = arr[parseInt(this.rs) % 4];
                let div = this.$refs.scroll
                div.scrollTop -= 2
                if (this.flagfind === true)
                    return false;
                window.requestAnimationFrame(this.retreat)
            },
            // 触摸结束
            triggerReply() {
                this.flagfind = true;
                this.timer = setInterval(() => {
                    this.mark = 0;
                }, 100)
            },

        },

    }
</script>


<style scoped lang="scss">
    img {
        pointer-events: none; /* 禁止长按图片保存 */
    }
    .scroll {
        width: 100%;
        height: 100vh;
        margin: 0 auto;
        overflow-y: auto;
        overflow-x: hidden;
        background: url(../assets/images/bj.jpg) no-repeat bottom;
        background-size: 100%;
    }


    .hint {
        z-index: 1;
        position: absolute;
        height: 100%;
        width: 100vw;

    }

    .main {
        position: relative;
    }


    .circle {
        position: absolute;
        margin-right: 5px;
        border-radius: 50%;
        width: 1.5rem;
        height: 1.5rem;
        border: 0.05rem slategray solid;
        background: slategray;
        opacity: 0.3;

    }

    .top {
        left: 25%;
        top: 10%;
    }

    .bottom {
        left: 25%;
        bottom: 10%;
    }

    .moveup {
        position: absolute;
        top: 25%;
        left: 29%;
        animation: moveup 3s linear infinite;
    }

    .movedown {
        position: absolute;
        top: 65%;
        left: 29%;
        animation: movedown 3s linear infinite;
    }

    @keyframes moveup {
        0% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-20px);
        }
        100% {
            transform: translateY(0px);
        }

    }

    @keyframes movedown {
        0% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(20px);
        }
        100% {
            transform: translateY(0px);
        }

    }

    .arrow {
        width: 40px;
        height: 40px;
        position: relative;
        display: inline-block;
    }

    .arrow:before,
    .arrow:after {
        content: '';
        border-color: transparent;
        border-style: solid;
        position: absolute;
    }


    .arrow-up:before {
        border: none;
        background-color: #555;
        height: 50%;
        width: 30%;
        top: 50%;
        left: 35%;
    }

    .arrow-up:after {
        left: 0;
        top: -50%;
        border-width: 20px 20px;
        border-bottom-color: #555;
    }

    .arrow-down:before {
        border: none;
        background-color: #555;
        height: 50%;
        width: 30%;
        top: 0;
        left: 35%;
    }

    .arrow-down:after {
        left: 0;
        top: 50%;
        border-width: 20px 20px;
        border-top-color: #555;
    }

    .fontone{
        letter-spacing: 2px;
        font-weight: 500;
        position: absolute;
        font-size: 0.4rem;
        top: 47%;
        color: white;
        transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        -moz-transform: rotate(90deg);
        -webkit-transform: rotate(90deg);
        -o-transform: rotate(90deg);
        filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);
        z-index: 2;
    }
    .fontone:before{
        content: '';
        width: 0.2rem;
        height: 0.2rem;
        position: absolute;
        top: 12%;
        left: -15%;
        border: 0.1rem solid #ff9a9f;
        border-radius: 50%;
    }
    .fontone:after {
        content: '';
        width: 0.2rem;
        height: 0.2rem;
        position: absolute;
        top: 12%;
        left: 103%;
        border: 0.1rem solid #ff9a9f;
        border-radius: 50%;
    }

    .mv1{
        animation: runfont 4s linear infinite;
    }
    @keyframes runfont {
        0% {
            transform:rotate(90deg);
        }
       25% {
           transform:rotate(80deg);
        }
        50% {
            transform:rotate(90deg);
        }
        75% {
            transform:rotate(100deg);
        }
        100% {
            transform:rotate(90deg);
        }
    }
    .container {
        font-weight: 400;
        letter-spacing: 3px;
        position: absolute;
        top: 47%;
        p {
            text-align: center;
            color: #fff;
            font-size: 0.4em;
            -webkit-transition: all 1.5s ease;
            transition: all 1.5s ease;
            -webkit-animation: Glow 1.5s ease infinite alternate;
            animation: Glow 1.5s ease infinite alternate;
            transform: rotate(90deg);
            -ms-transform: rotate(90deg);
            -moz-transform: rotate(90deg);
            -webkit-transform: rotate(90deg);
            -o-transform: rotate(90deg);
            filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);
        }
    }


    @-webkit-keyframes Glow {
        from {
            text-shadow: 0 0 6px #fff,
            0 0 10px #fff,
            0 0 15px #fff,
            0 0 20px #fff470,
            0 0 35px #fff470,
            0 0 40px #fff470,
            0 0 50px #fff470,
            0 0 75px #fff470;
        }
        to {
            text-shadow: 0 0 3px #fff,
            0 0 5px #fff,
            0 0 8px #fff,
            0 0 10px #ff9a9f,
            0 0 18px #ff9a9f,
            0 0 22px #ff9a9f,
            0 0 26px #ff9a9f,
            0 0 33px #ff9a9f;
        }
    }
    @keyframes Glow {
        from {
            text-shadow: 0 0 6px #fff,
            0 0 10px #fff,
            0 0 15px #fff,
            0 0 20px #fff470,
            0 0 35px #fff470,
            0 0 40px #fff470,
            0 0 50px #fff470,
            0 0 75px #fff470;
        }
        to {
            text-shadow: 0 0 3px #fff,
            0 0 5px #fff,
            0 0 8px #fff,
            0 0 10px #ff9a9f,
            0 0 18px #ff9a9f,
            0 0 22px #ff9a9f,
            0 0 26px #ff9a9f,
            0 0 33px #ff9a9f;
        }
    }
    .music {

        position: absolute;
        width: 1.9rem;
        height: 1.5rem;
        border: 5px solid #e5f397;
        border-bottom: 0px;
        border-top-left-radius: 110px;
        border-top-right-radius: 110px;

        span {
            width: 50px;
            height: 30px;
            font-size: 11px;
            display: block;
            margin-top: 125%;
            letter-spacing: 2px;
            margin-left: -4px;
        }

    }


    .music:before {
        right: -8px;
    }

    .music:after {
        left: -7px;
    }

    .music:before, .music:after {

        content: '';
        position: absolute;
        bottom: -14px;
        width: 0.7rem;
        height: 1rem;
        background-color: #f8ffbe;
        border-radius: 5px;
    }

</style>
