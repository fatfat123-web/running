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
                     style=" position: absolute;left: 35%;top: 27%;width: 2.5rem;height: auto">
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
<!--                <pig      v-show="this.rs>95"-->
<!--                        style="position: absolute;top: 90%;height:5%;width: auto;" class="test"></pig>-->

<!--                <div class="ninety" style="position: absolute;top: 20%;left: 50%;font-size: 0.4rem" ref="ninety"></div>-->


                <img src="../../assets/images/house1.png" :style="house1"
                     style="height: auto;width:32%;position: absolute;"/>

                <img    v-show="this.rs>18"
                        :class="this.rs>18?'animate__animated animate__rotateInDownLeft':''"
                        src="../../assets/images/house2.png" :style="house2"
                     style="height: auto;width:55%;position: absolute;"/>

                <img  v-show="this.rs>0"
                        :class="one"
                        src="../../assets/images/dialogue1.png" :style="dialogue1"
                     style="height: auto;width:12%;position: absolute;"/>

                <img   v-show="this.rs>7"
                       :class="this.rs>7?'animate__animated animate__fadeInTopLeft':''"
                        src="../../assets/images/dialogue2.png" :style="dialogue2"
                     style="height: auto;width:25%;position: absolute;"/>

                <div  class="MySignature" style="top: 25%;left:39%;font-size:0.7rem;position: absolute;width: 100%">玉城向东 大城崛起</div>


                <img   v-show="this.rs>18"
                       :class="this.rs>18?'animate__animated animate__fadeInTopLeft':''"
                       src="../../assets/images/dialogue3.png" :style="dialogue3"
                       style="height: auto;width:14%;position: absolute;"/>
                <img   v-show="this.rs>30"
                       :class="this.rs>30?'animate__animated animate__fadeInTopLeft':''"
                       src="../../assets/images/dialogue4.png" :style="dialogue4"
                       style="height: auto;width:37%;position: absolute;"/>
                <img   v-show="this.rs>44"
                       :class="this.rs>44?'animate__animated animate__fadeInTopLeft':''"
                       src="../../assets/images/dialogue5.png" :style="dialogue5"
                       style="height: auto;width:12%;position: absolute;"/>
                <img   v-show="this.rs>59.5"
                       :class="this.rs>59.5?'animate__animated animate__fadeInTopLeft':''"
                       src="../../assets/images/dialogue6.png" :style="dialogue6"
                       style="height: auto;width:12%;position: absolute;"/>
                <img   v-show="this.rs>68"
                       :class="this.rs>68?'animate__animated animate__fadeInTopLeft':''"
                       src="../../assets/images/dialogue7.png" :style="dialogue7"
                       style="height: auto;width:22%;position: absolute;"/>
                <img   v-show="this.rs>78"
                       :class="this.rs>78?'animate__animated animate__fadeInTopLeft':''"
                       src="../../assets/images/dialogue8.png" :style="dialogue8"
                       style="height: auto;width:34%;position: absolute;"/>
                <img   v-show="this.rs>85"
                       :class="this.rs>85?'animate__animated animate__lightSpeedInRight':''"
                       src="../../assets/images/dialogue9.png" :style="dialogue9"
                       style="height: auto;width:22%;position: absolute;"/>

                <img   v-show="this.rs>88"
                       :class="this.rs>88?'animate__animated animate__fadeInRightBig':''"
                       src="../../assets/images/dialogue10.png" :style="dialogue10"
                       style="height: auto;width:41%;position: absolute;"/>
                <img   v-show="this.rs>95"
                       :class="this.rs>95?'animate__animated animate__rotateInUpLeft':''"
                       src="../../assets/images/dialogue11.png" :style="dialogue11"
                       style="height: auto;width:51%;position: absolute;"/>


                <img   v-if="this.rs>53.5"
                       src="../../assets/images/hospital.png" :style="hospital"
                       style="height: auto;position: absolute;"/>

                <img   v-show="this.rs>73"
                       :class="this.rs>73?'animate__animated animate__bounceInRight':''"
                       src="../../assets/images/house3.png" :style="house3"
                       style="height: auto;position: absolute;"/>


                <!--   前景图-->
                <img style="width: 50%;height: 100%; top: 0;position: absolute;" src="../../assets/images/qj.png"/>


                <img   v-show="this.rs>24"
                       :class="this.rs>24?'animate__animated animate__bounceInDown':''"
                       src="../../assets/images/cartridge.png" :style="cartridge"
                       style="height: auto;width:97%;position: absolute;"/>

                <img   v-show="this.rs>26"
                       :class="this.rs>26?'animate__animated animate__bounceInLeft':''"
                       src="../../assets/images/picture1.png" :style="picture1"
                       style="height: auto;width:35%;position: absolute;"/>
                <img   v-show="this.rs>31"
                       :class="this.rs>31?'animate__animated animate__bounceInRight':''"
                       src="../../assets/images/picture2.png" :style="picture2"
                       style="height: auto;width:63%;position: absolute;"/>
                <img   v-show="this.rs>37.5"
                       :class="this.rs>37.5?'animate__animated animate__fadeInTopLeft':''"
                       src="../../assets/images/picture3.png" :style="picture3"
                       style="height: auto;width:66%;position: absolute;"/>
                <img   v-show="this.rs>45.5"
                       :class="this.rs>45.5?'animate__animated animate__bounceInRight':''"
                       src="../../assets/images/picture4.png" :style="picture4"
                       style="height: auto;width:35%;position: absolute;"/>
                <img   v-show="this.rs>49.5"
                       :class="this.rs>49.5?'animate__animated animate__bounceInLeft':''"
                       src="../../assets/images/picture5.png" :style="picture5"
                       style="height: auto;width:31%;position: absolute;"/>

                <!-- 下雨-->

                <rain v-if="this.rs<18" style="position: absolute;right:15%;top: 0;height:20%;"></rain>
                <!-- 下雪啦-->
                <snow style="position: absolute;top: 70%;height:20%;width: auto"></snow>

                <!--  气球-->
                <img v-if="this.rs<85"
                     src="../../assets/images/balloon.gif" :style="balloon"
                     style="height: auto;width:35%;position: absolute;"/>

                <!--    测试能不能直接旋转180度    -->
                <div style="width:31%;position: fixed;" :style="go">
                    <img style="width: 100%;height: auto" :src="item" v-for="(item,index) in img"
                         v-show="index === mark" :class="run">
                </div>




                <!--                云-->
                <!--                <img src="../../assets/images/cloud.png"-->
                <!--                     style="height: auto;width:35%;position: absolute;right: 5%;top: 0;"/>-->
                <!--                <img src="../../assets/images/cloud.png" class="cloud"-->
                <!--                     style="height: auto;width:25%;position: absolute;right: 2%;top: 5%;"/>-->
                <!--                <img src="../../assets/images/cloud.png"-->
                <!--                     style="height: auto;width:22%;position: absolute;right: 9%;top: 11%;"/>-->

                <!-- 背景图-->
                <img src="../../assets/images/bj.jpg" style="width: 100%;height: auto;"/>


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
                img: [

                    require('../../assets/images/e.png'),
                    require('../../assets/images/b.png'),
                    require('../../assets/images/c.png'),
                    require('../../assets/images/d.png'),
                    require('../../assets/images/a.png')
                    ],

                go: {top: '35%', left: '12%',},
                test: "",
                balloon: {top: '5%', left: '8%'},
                house1:{top: '11.5%', left: '-18%'},
                house2:{top: '21.5%', left: '19%'},
                dialogue1:{top: '3%', left: '75%'},
                dialogue2:{top: '11.5%', left: '65%'},
                dialogue3:{top: '20.6%', left: '69%'},
                dialogue4:{top: '33.5%', left: '57%'},
                dialogue5:{top: '47.5%', left: '26%'},
                dialogue6:{top: '58%', left: '82%'},
                dialogue7:{top: '67.5%', left: '68%'},
                dialogue8:{top: '74.05%', left: '61%'},
                dialogue9:{top: '82.5%', left: '38%'},
                dialogue10:{top: '84%', left: '38%'},
                dialogue11:{top: '91%', left: '43%'},
                cartridge:{top: '28.5%', left: '0'},
                picture1:{top: '31.8%', left: '8%'},
                picture2:{top: '36%', left: '4%'},
                picture3:{top: '42.5%', left: '26%'},
                picture4:{top: '49%', left: '54%'},
                picture5:{top: '52.3%', left: '47%'},
                hospital:{top: '57.6%', left: '-255%',width:'60%'},
                house3:{top:'64.9%',left:'2.41%',width:'60%'},
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
                one: {
                    'animate__animated animate__zoomInRight': false,
                },
            }

        },
        watch: {},
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

                   if(this.rs>3){
                       let rs = this.rs-3
                       if (rs <= 8.3) {
                           let house1 = data.house1
                           this.house1.left = parseFloat(house1.left) + (this.rs) * 3 + '%'
                       }

                   }
                    if(this.rs>53){
                        let rs = this.rs-53
                        if (rs <= 8) {
                            console.log(rs)
                            let hospital = data.hospital
                            this.hospital.left = parseFloat(hospital.left) + (this.rs)*4.5 + '%'
                        }

                    }



                    //目前还有Bug用不到这个
                    // if (this.rs > 11) {
                    //     let rs = this.rs - 11
                    //     console.log(rs)
                    //     if (rs < 4) {
                    //         const test = '我只是想看看能不能逐' + '</br>' + '字输出这些内容?????'
                    //         this.$refs.ninety.innerHTML = test.substring(0, rs * 3)
                    //     }
                    //
                    // }

                }
            },
            gtouchstart(e) {
                if (this.tips) {
                    this.one['animate__animated animate__zoomInRight']=true;
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
                div.scrollTop += 3
                // console.log(this.rs)
                let arr = [1, 2, 3, 4]
                this.mark = arr[parseInt(this.rs) % 4];
                // console.log(this.rs)
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
                // console.log(this.rs)
                //后退下降的效果 草这是为什么无缘无故就可以用了？？？
                // this.flyleft=this.$options.data().balloon.left;
                // this.flytop=this.$options.data().balloon.top;
                // this.balloon.left=(this.rs)-parseFloat(this.flyleft)+16+'%'


                let div = this.$refs.scroll
                div.scrollTop -= 3
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
        display: block;


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
            left: 20%;
        }
        25% {
            left: 25%;
        }
        50% {
            left: 20%;
        }
        75% {
            left: 25%;
        }
        100% {
            left: 20%;
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

    .ninety {
        -webkit-writing-mode: vertical-lr;
        -ms-writing-mode: tb-lr;
        writing-mode: vertical-lr;
        text-orientation: sideways;

    }
    .MySignature{
        font-size:16px;
        font-style: oblique;
        /* float:right; */
        /* padding-right: 42px; */
        transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        -moz-transform: rotate(90deg);
        -webkit-transform: rotate(90deg);
        -o-transform: rotate(90deg);
        filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);
        background-image: linear-gradient(to right, red, orange, yellow, black, yellow, orange, red, orange, black, black, yellow, orange, red);
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        -webkit-background-size: 200% 100%;
        -webkit-animation: MySignature-animation 5s infinite linear;
    }
    @-webkit-keyframes MySignature-animation {
        0%{background-position: 0 0;}
        100% {background-position: -100% 0;}
    }
</style>
