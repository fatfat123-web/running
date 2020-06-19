<template>
    <div class="scroll" ref="scroll" @scroll="scroll">
        <v-touch @swiperight="swiperight" class="wrapper">

            <div class="main animate__animated"
                 style="background: #b5def4;height: 100vh;width: 100%;position: fixed;left: 0;top: 0;z-index: 2;"
                  :class="animateEnd ? '' : 'animate__fadeOut'" v-if="mainShow">

                <div class="fontone mv1" v-if="!load" style="left: 30%;" >上滑屏幕进行观看</div>
                <div class="container" style="left:11%;">
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
                <span class="arrow arrow-up"></span>
            </div>
            <div class="movedown">
                <span class="arrow arrow-down"></span>
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
    export default {
        name: "index",
        data() {

            return {
                hint: true,
                kg: true,
                //前进
                front: null,
                //左边区域
                rear: null,
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
        },
        methods: {
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
    }
    .fontone:before,
    .fontone:after {
        content: '';
        border-color: transparent;
        border-style: solid;
        position: absolute;
    }
    .mv1{
        animation: runfont 3s linear infinite;
    }
    @keyframes runfont {
        0% {
            transform:rotate(90deg);
        }
       25% {
           transform:rotate(75deg);
        }
        50% {
            transform:rotate(90deg);
        }
        75% {
            transform:rotate(105deg);
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
            text-shadow: 0 0 10px #fff,
            0 0 20px #fff,
            0 0 30px #fff,
            0 0 40px #fff470,
            0 0 70px #fff470,
            0 0 80px #fff470,
            0 0 100px #fff470,
            0 0 150px #fff470;
        }
        to {
            text-shadow: 0 0 5px #fff,
            0 0 10px #fff,
            0 0 15px #fff,
            0 0 20px #ff9a9f,
            0 0 35px #ff9a9f,
            0 0 40px #ff9a9f,
            0 0 50px #ff9a9f,
            0 0 75px #ff9a9f;
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
</style>
