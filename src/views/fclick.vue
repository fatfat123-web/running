<template>
    <div>


        <img src="../assets/images/car1.png" class="car"/>
        <div class="block" id="test">试试单击、双击或长按这里<br>Try to click , double-click or long-press here.</div>
        <div class="block" id="test1">试试单击、双击或长按这里<br>Try to click , double-click or long-press here.</div>
    </div>
</template>

<script>
    export default {
        name: "fclick",
        data() {
            return {
                fc: null,
                delayTime: 400,
                singleEv: null,/*单击事件*/
                doubleEv: null,/*双击事件*/
                longPressEv: null,/*长按事件*/
                ele: [],
                state: 0,/*点击状态*/
                sc: 1,/*是否单击*/
                e: null,
            }
        },
        mounted() {

            this.fc = new fclick(document.getElementsByClassName('block'));
            console.log(this.fc)
            this.fc.single(function (e) {
                //e为event元素
                //e.target可以获取被点击的元素
                //e.clientX可以获取鼠标X轴位置，Y轴同理
                console.log(111)
                console.log("single" + e.clientX);
            })
            this.fc.double(function (e) {
                console.log("double" + e.target.getAttribute("id"));
            })
            this.fc.longPress(function (e) {
                console.log("longPress" + e.target.getAttribute("id"));
            })

            console.log(typeObj())

            function typeObj(obj) {
                let type = Object.prototype.toString.call(obj);
                if (type == '[object HTMLDivElement]') {
                    return "HTMLDivElement";

                } else if ("[object HTMLCollection]") {
                    return "HTMLCollection";
                } else {
                    console.log("您初始化的参数类型为：" + type + "，这种类型暂时不支持。");
                    return false;
                }

            }

            function fclick(elementx) {
                // var singleEv;/*单击事件*/
                // var doubleEv;/*双击事件*/
                // var longPressEv;/*长按事件*/
                // var ele=[];
                // var state=0;/*点击状态*/
                // var sc=1;/*是否单击*/
                this.single = function (func) {
                    this.singleEv = func;
                }
                this.double = function (func) {
                    this.doubleEv = func;
                }
                this.longPress = function (func) {
                    this.longPressEv = func;
                }

                /*初始化对象*/
                if (typeObj(this.ele) == "HTMLDivElement") {
                    this.ele[0] = elementx;
                } else if (typeObj(this.ele) == "HTMLCollection") {
                    this.ele = elementx;
                }
                for (let i = 0; i < this.ele.length; i++) {
                    this.ele[i].setAttribute('onselectstart', 'return false');/*防止双击选中文本*/
                    this.ele[i].style.cursor = "pointer";/*手型鼠标*/

                    this.ele[i].onmousedown = function (e) {
                        this.e = e || enent;
                        if (this.state == 0) {
                            this.state = 1;
                            setTimeout(function () {
                                this.state = 0;
                            }, this.delayTime);
                        } else if (this.state == 1) {
                            this.sc = 0;
                        }
                    }
                    this.ele[i].onmouseup = function (e) {
                        if (this.state == 1) {
                            setTimeout(function () {
                                if (this.sc == 1) {
                                    this.singleEv(e)
                                }
                            }, 200);
                        } else if (this.state == 0) {
                            this.longPressEv(e);
                        }
                        if (this.sc == 0) {
                            this.doubleEv(e);
                            setTimeout(function () {
                                this.sc = 1;
                            }, this.delayTime);
                        }
                    }
                }

            }



        },
        methods: {},

    }
</script>

<style scoped lang="scss">
    img {
        /*pointer-events: none; !* 禁止长按图片保存 *!*/

    }

    .car {
        margin-top: 50px;
        margin-left: 50px;
        width: 20%;
        height: auto;
    }

    .block {
        width: 30%;
        height: 100px;
        margin: 100px auto;
        background: rgba(68, 160, 199, 1.00);
        border-radius: 20px;
        text-align: center;
        padding-top: 95px;
        line-height: 1.5em;
        font-size: 2em;
        color: white;
    }
</style>