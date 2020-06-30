<template>
    <div class="bj">
    <v-touch @swiperight="swiperight" >
        <div class="main animate__animated"
             style="height: 100vh;width: 100%;position: fixed;left: 0;top: 0;z-index: 2;"
             :class="animateEnd ? '' : 'animate__fadeOutRight'" >

            <div class="container" style="left:14%;z-index: 99">
                玉北同城加速融合
            </div>
            <div class="container" style="left:28%;z-index: 99;">
                大城崛起在即
            </div>
            <img src="../../assets/images/hand.gif"
                 style=" position: absolute;left: 22%;top: 80%;width: 2.5rem;height: auto">
        </div>
    </v-touch>
    </div>
</template>

<script>

    export default {
        name: "two",
        data(){
            return{
                animateEnd: true,
                animate: true,
            }

        },
        mounted() {

            // setTimeout(() => {
            //     this.$router.push('three')
            // }, 3000)
            // console.log(document.getElementById('music'))
        },
        methods:{
            autoPlayAudio() {
                this.$EventBus.$emit('isPlay', true)
                try {
                    WeixinJSBridge.invoke('WeixinJSBridgeReady', {}, function (e) {
                        let aa=   document.getElementById('music')
                        aa.play();
                    });
                } catch (e) {
                    let aa=   document.getElementById('music')
                    aa.play();
                }
            },


            swiperight() {
                this.animate = false
                setTimeout(() => {
                // let aa=   document.getElementById('music')
                    this.autoPlayAudio()


                    // this.$refs.music.play();
                    this.animateEnd = false
                    setTimeout(() => {
                        this.$router.push('three')

                    }, 400)
                }, 600)
            },

        },
    }
</script>

<style scoped  lang="scss">
    .main {
        position: relative;
        background: url("../../assets/images/bj2.png") no-repeat;
        background-size: 100% 100%;
    }
    .bj{
        width: 100%;
        height: 100vh;
        margin: 0 auto;
        position: relative;
        background: url(../../assets/images/bj.jpg) no-repeat bottom;
        background-size: 100%;
    }
    /*.container {*/
    /*    background: url("../../assets/images/bj2.png") no-repeat;*/
    /*    background-size: 100%;*/
    /*}*/
    .container {
        font-weight: 400;
        letter-spacing: 3px;
        position: absolute;
        top: 47%;
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
