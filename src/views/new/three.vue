<template>
    <!-- 滚动条事件 -->
    <div class="scroll" ref="scroll" @scroll="scroll">
        <!-- 触摸事件-->
        <div @touchstart.prevent="gtouchstart" @touchend.prevent="triggerReply">
            <!-- 提示的图-->
            <div class="hint" v-if="tips">
                <div class="circle top">
                </div>
                <div class="pen" style="  top:11%;left: 27.3%;"></div>
                <div class="pen" style="  bottom:11%;left: 27.3%;"></div>
                <img src="../../assets/images/hint.gif"
                     style=" position: absolute;left: 32%;top: 27%;width: 2.5rem;height: auto">
                <div class="moveup">
                    <div class="arrow arrow-up">
                    </div>
                </div>
                <div class="movedown">
                    <div class="arrow arrow-down">

                    </div>
                </div>
                <div class="circle bottom"></div>

            </div>

            <div class="main">
                <!--   这是一头猪      -->
                <pig style="position: absolute;top: 20%;height:20%;width: auto;" class="test"></pig>
<!--                <div  class="ninety" style="position: absolute;top: 20%;left: 10%" ref="ninety" >{{this.test.substring(0, rs)}}</div>-->
                <div  class="ninety" style="position: absolute;top: 20%;left: 10%" ref="ninety"></div>
                <!-- 下雨-->

                <rain v-if="this.rs<18" style="position: absolute;right:15%;top: 0;height:20%;"></rain>
                <!-- 下雪啦-->
                <snow style="position: absolute;top: 20%;height:20%;width: auto"></snow>
                <!--  气球-->
                <img src="../../assets/images/balloon.gif" :style="balloon"
                     style="height: auto;width:35%;position: absolute;"/>
                <!-- 背景图-->
                <img src="../../assets/images/bj.jpg" style="width: 100%;height: auto;"/>

                <!--    测试能不能直接旋转180度    -->
                <div style="width:31%;position: fixed;" :style="go">
                    <img style="width: 100%;height: auto" :src="item" v-for="(item,index) in img"
                         v-show="index === mark" :class="run">
                </div>

                <!--                云-->
                <img src="../../assets/images/cloud.png"
                     style="height: auto;width:35%;position: absolute;right: 5%;top: 0;"/>
                <img src="../../assets/images/cloud.png" class="cloud"
                     style="height: auto;width:25%;position: absolute;right: 2%;top: 5%;"/>
                <img src="../../assets/images/cloud.png"
                     style="height: auto;width:22%;position: absolute;right: 9%;top: 11%;"/>



            </div>
        </div>
    </div>
</template>

<script>
    import rain from '@/views/rain'
    import tree from '@/views/tree'
    import snow from '@/views/snow'
    import pig from '@/views/pig'

    export default {
        name: "three",
        data() {
            return {
                tips: true,
                img: [require('../../assets/images/05.png'),  require('../../assets/images/02.png'),
                      require('../../assets/images/03.png'),  require('../../assets/images/04.png'),
                      require('../../assets/images/01.png')],

                go: {top: '35%', left: '8%',},
                test:"",
                balloon: {top: '5%', left: '8%'},
                run: {'runAnrun': false,},
                kg: true,
                //前进
                front: null,
                startX: null,
                startY: null,
                timer: null,
                flagfind: false,
                mark: 0,
                rs: null,
                flyleft: null,
                flytop: null,
            }

        },
        watch:{

        },
        components: {
            rain,
            tree,
            snow,
            pig,
        },
        created() {
            // window.addEventListener('scroll', this.scroll);
        },
        mounted() {
            const test = '我只是想看看能不能逐' + '</br>'+'字输出这些内容?????????????'
            let i = 0;
            let timer = setInterval(() => {
               i++
               this.$refs.ninety.innerHTML = test.substring(0, i)
               console.log(this.$refs.ninety.innerHTML)
               if (this.$refs.ninety.innerHTML === test) {
                   clearInterval(timer);
               }
            }, 1000)
        },
        methods: {
            scroll(e) {
                // console.log(111)
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
                this.rs = (scrolldrag * 100).toFixed(2) * 1

                let data = this.$options.data()
                //    气球跟着一起飞
                if (this.rs >= 0) {
                    let rs = this.rs - 0
                    if (rs <= 100) {

                        let balloon = data.balloon
                        this.balloon.top = parseFloat(balloon.top) + (this.rs) / 1.2 + '%'
                        this.balloon.left = parseFloat(balloon.left) + (this.rs) / 1.1 + '%'

                    }
                    if (this.rs>10){
                     let rs=parseInt(this.rs*5)-50
                     console.log(rs)

                       console.log(this.test.substring(0, rs))

                    }

                }
            },
            gtouchstart(e) {
                if (this.tips) {
                    this.$refs.scroll.scrollTop += 2
                    this.tips = false;
                    return;
                }
                // 可视窗口的高度
                let clientHeight = this.$refs.scroll.clientHeight
                this.startX = e.changedTouches[0].pageX;
                this.startY = e.changedTouches[0].pageY;
                this.front = (clientHeight) * (0.4);
                if (this.startY < this.front) {
                    this.run['runAnrun'] = true;
                    this.flagfind = false
                    this.retreat()


                } else {
                    this.run['runAnrun'] = false;
                    this.flagfind = false;
                    this.advance()

                }
            },
            //   前进
            advance() {
                let div = this.$refs.scroll
                div.scrollTop += 4
                // console.log(this.rs)
                let arr = [1, 2, 3, 4]
                this.mark = arr[parseInt(this.rs) % 4];

                //前进上天的效果
                // this.flyleft=this.$options.data().balloon.left;
                // this.flytop=this.$options.data().balloon.top;
                // this.balloon.left=parseFloat(this.flyleft)+(this.rs)+'%'


                if (this.flagfind === true) return false;
                window.requestAnimationFrame(this.advance)
            },
            // 后退
            retreat() {
                let arr = [1, 2, 3, 4]
                this.mark = arr[parseInt(this.rs) % 4];

                //后退下降的效果 草这是为什么无缘无故就可以用了？？？
                // this.flyleft=this.$options.data().balloon.left;
                // this.flytop=this.$options.data().balloon.top;
                // this.balloon.left=(this.rs)-parseFloat(this.flyleft)+16+'%'


                let div = this.$refs.scroll
                div.scrollTop -= 4
                if (this.flagfind === true) return false;
                window.requestAnimationFrame(this.retreat)
            },
            // 触摸结束
            triggerReply() {
                this.flagfind = true;
                this.timer = setInterval(() => {
                    this.mark = 0;
                }, 100)
            },
        }
    }
</script>

<style scoped lang="scss">
    img {
        pointer-events: none; /* 禁止长按图片保存 */
    }

    .hint {
        z-index: 1;
        position: absolute;
        height: 100%;
        width: 100vw;

    }

    .scroll {
        width: 100%;
        height: 100vh;
        margin: 0 auto;
        overflow-y: auto;
        overflow-x: hidden;
        /*background: url(../../assets/images/bj.jpg) no-repeat bottom;*/
        /*background-size: 100% ;*/
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
        opacity: 0.3;
        box-shadow: 5px 5px 20px 10px rgba(255, 255, 0, 1);
    }

    .pen {

        position: absolute;
        border-radius: 50%;
        width: 1.1rem;
        height: 1.1rem;
        border: 0.05rem #ffe793 solid;
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

    /*树的组件*/
    .test {
        transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        -moz-transform: rotate(90deg);
        -webkit-transform: rotate(90deg);
        -o-transform: rotate(90deg);
        filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);
        animation: left 4s ease infinite;
        /*过度*/
        transition: all 1s ease;

    }

    .runAnrun {
        transform: rotateX(180deg);
        -ms-transform: rotateX(180deg);
        -moz-transform: rotateX(180deg);
        -webkit-transform: rotateX(180deg);
        -o-transform: rotateX(180deg);
        filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);
    }


    @keyframes left {
        0% {
            left: -50%;
        }
        25% {
            left: -45%;
        }
        50% {
            left: -50%;
        }
        75% {
            left: -55%;
        }
        100% {
            left: -50%;
        }
    }

    .cloud {
        animation: cloud 4s ease infinite;
        /*过度*/
        transition: all 1s ease;
    }

    @keyframes cloud {
        0% {
            top: 0;
        }
        25% {
            top: 5%;
        }
        50% {
            top: 0;
        }
        75% {
            top: +15%;
        }
        100% {
            top: 0;
        }
    }
    .ninety{
        transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        -moz-transform: rotate(90deg);
        -webkit-transform: rotate(90deg);
        -o-transform: rotate(90deg);
        filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);
        font-size: 0.4rem;

    }
</style>
