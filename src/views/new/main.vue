<template>
    <div class="container">
        <div style="position: fixed;top:3.7%;right:23.1%;z-index: 999;">
            <div class="rotation">{{isPlay ? '关音乐' : '开音乐'}}</div>
            <div class="loader1" @click="pause(true)">
                <div class="loop">
                    <div class="ring"></div>
                </div>
                <div class="loop">
                    <div class="ring"></div>
                </div>
            </div>
            <audio  ref="music" id="music" src="../../assets/music/cn.mp3" loop="loop" preload autoplay="autoplay"></audio>
        </div>
        <router-view/>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                music: false,
                list: [
                    require('../../assets/images/bj.jpg'),
                    require('../../assets/images/qj.png'),
                    require('../../assets/images/bj1.png'),
                    require('../../assets/images/bj2.png'),
                    require('../../assets/images/bj3.png'),
                    require('../../assets/images/bj4.png'),

                    require('../../assets/images/a.png'),
                    require('../../assets/images/b.png'),
                    require('../../assets/images/c.png'),
                    require('../../assets/images/d.png'),
                    require('../../assets/images/e.png'),

                    require('../../assets/images/dialogue1.png'),
                    require('../../assets/images/dialogue2.png'),
                    require('../../assets/images/dialogue3.png'),
                    require('../../assets/images/dialogue4.png'),
                    require('../../assets/images/dialogue5.png'),
                    require('../../assets/images/dialogue6.png'),
                    require('../../assets/images/dialogue7.png'),
                    require('../../assets/images/dialogue8.png'),
                    require('../../assets/images/dialogue9.png'),
                    require('../../assets/images/dialogue10.png'),
                    require('../../assets/images/dialogue11.png'),

                    require('../../assets/images/house1.png'),
                    require('../../assets/images/house2.png'),
                    require('../../assets/images/house3.png'),

                    require('../../assets/images/picture1.png'),
                    require('../../assets/images/picture2.png'),
                    require('../../assets/images/picture3.png'),
                    require('../../assets/images/picture4.png'),
                    require('../../assets/images/picture5.png'),

                    require('../../assets/images/balloon.gif'),
                    require('../../assets/images/cloud.png'),
                    require('../../assets/images/hint.gif'),
                    require('../../assets/images/hand.gif'),
                    require('../../assets/images/cartridge.png'),
                    require('../../assets/images/hospital.png'),

                ],
                isPlay: false,
            }
        },
        created() {
            let count = 0;
            for (let item of this.list) {
                let img = new Image()
                img.src = item;
                count++
                if (count === 36) {
                    this.$router.push('/one')
                }
            }
        },
        // computed: {
        //     isPlay() {
        //         return this.$isPlay
        //     }
        // },
        watch: {
            isPlay(val) {
                // console.log(val)
            }
        },
        mounted() {
            this.$EventBus.$on('isPlay', data => {
                this.isPlay = data;
            })
            // this.autoPlayAudio();

        },
        methods:{

            pause(val) {

                // console.log(this.$refs.music)
                if (this.$refs.music !== null) {
                    //检测播放是否已暂停.this.$refs.music.paused 在播放器播放时返回false.
                    // console.log(this.$refs.music.paused);
                    if (this.$refs.music.paused) {
                        this.$refs.music.play();// 这个就是播放
                        this.isPlay= true
                        // console.log(this.music)

                    } else {
                        if (val) {
                            this.$refs.music.pause();// 这个就是暂停
                            this.isPlay = false
                            // console.log(this.music)
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
        },
    }
</script>

<style scoped lang="scss">
    .container {
        width: 100vw;
        height: 100vh;
    }
    .rotation {
        transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        -moz-transform: rotate(90deg);
        -webkit-transform: rotate(90deg);
        -o-transform: rotate(90deg);
        filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);
        color: white;
        font-weight: 300;
        width: 5em;
        height: 5em;
        font-size: 11px;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 5%;
        right: 10%;
        position: fixed;
        letter-spacing: 2px
    }
    .fontone {
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

    .fontone:before {
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
    .loader1 {

        width: 5em;
        height: 5em;
        font-size: 11px;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 5%;
        right: 10%;
        position: fixed;
        letter-spacing: 1px;
        color: white;
        border: 1px dotted pink;
        border-radius: 50%;
    }

    .loader1:active {
        background: yellow;
        opacity: 0.5;
        box-shadow: 5px 5px 20px 10px rgba(255, 255, 0, 0.5)
    }

    .loader1 .loop {
        position: absolute;
        border-radius: 50%;
        border-style: solid;
        animation: animate2 3s linear infinite;
    }

    .loader1 .loop:nth-child(1) {
        width: 100%;
        height: 100%;
        color: gold;
        border-color: currentColor transparent transparent currentColor;
        border-width: 0.2em 0.2em 0 0;
        --deg: -45deg;
        animation-direction: normal;
    }

    .loader1 .loop:nth-child(2) {
        width: 70%;
        height: 70%;
        color: lime;
        border-color: currentColor currentColor transparent transparent;
        border-width: 0.2em 0 0 0.2em;
        --deg: -135deg;
        animation-direction: reverse;
    }

    .loader1 .loop .ring {
        position: absolute;
        width: 50%;
        height: 0.1em;
        top: 50%;
        left: 50%;
        background-color: transparent;
        transform: rotate(var(--deg));
        transform-origin: left;
    }

    .loader1 .loop .ring::before {
        position: absolute;
        top: -0.5em;
        right: -0.5em;
        content: '';
        width: 1em;
        height: 1em;
        background-color: currentColor;
        border-radius: 50%;
        box-shadow: 0 0 2em,
        0 0 4em,
        0 0 6em,
        0 0 8em,
        0 0 10em,
        0 0 0 0.5em rgba(255, 255, 0, 0.1);
    }

    @keyframes animate2 {
        to {
            transform: rotate(1turn);
        }
    }
</style>
