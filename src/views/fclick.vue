<template>
    <div class="scroll" ref="scroll" @scroll="scroll">
<div class="main">


    <img src="../assets/images/bj.jpg" style="width: 100%;height: auto;"/>
    <img src="../assets/images/car1.png" class="car" id="car"/>
<!--        <div class="block" id="test">试试单击、双击或长按这里<br>Try to click , double-click or long-press here.</div>-->
<!--        <div class="block" id="test1">试试单击、双击或长按这里<br>Try to click , double-click or long-press here.</div>-->
</div>
    </div>
</template>

<script>
    export default {
        name: "fclick",
        data() {
            return {

            }
        },
        mounted() {

            this.shift()



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
                let _scrolldrag = (scrolldrag * 100).toFixed(2) * 1
                this.gkd = _scrolldrag;
                // console.log(clientHeight)

            },
            shift(){
                let fc=new fclick(document.getElementsByClassName('car'));

                // let div = this.$refs.scroll;
                // console.log(div)
                fc.single(function(e){
                    //e为event元素
                    //e.target可以获取被点击的元素
                    //e.clientX可以获取鼠标X轴位置，Y轴同理
                    console.log("single"+e.clientX);
                    console.log('点击事件')
                })
                fc.double(function(e){
                    console.log("double"+e.target.getAttribute("id"));
                    console.log('双击事件')
                })
                fc.longPress(function(e){
                    console.log("longPress"+e.target.getAttribute("id"));
                    console.log('长按事件')
                })

                var delayTime=400;/*双击延时时间*/

                function typeObj(obj){
                    var type=Object.prototype.toString.call(obj);
                    if(type=='[object HTMLDivElement]'){
                        return "HTMLDivElement";

                    }else if("[object HTMLCollection]"){
                        return "HTMLCollection";
                    }else{
                        console.log("您初始化的参数类型为："+type+"，这种类型暂时不支持。");
                        return false;
                    }

                }

                function fclick(elementx){
                    var singleEv;/*单击事件*/
                    var doubleEv;/*双击事件*/
                    var longPressEv;/*长按事件*/
                    var ele=[];
                    var state=0;/*点击状态*/
                    var sc=1;/*是否单击*/
                    this.single=function(func){
                        singleEv=func;
                    }
                    this.double=function(func){
                        doubleEv=func;
                    }
                    this.longPress=function(func){
                        longPressEv=func;
                    }
                    /*初始化对象*/
                    if(typeObj(ele)=="HTMLDivElement"){
                        ele[0]=elementx;
                    }else if(typeObj(ele)=="HTMLCollection"){
                        ele=elementx;
                    }
                    for(let i=0;i<ele.length;i++){
                        ele[i].setAttribute('onselectstart','return false');/*防止双击选中文本*/
                        // ele[i].style.cursor="pointer";/*手型鼠标*/

                        ele[i].onmousedown = function(e){
                            var e=e||enent;
                            if(state==0){
                                state=1;
                                setTimeout(()=>{state=0;},delayTime);
                            }else if(state==1){
                                sc=0;
                            }
                        }
                        ele[i].onmouseup=function(e){
                            if(state==1){
                                setTimeout(()=>{if(sc==1){singleEv(e)}},200);
                            }else if(state==0){
                                longPressEv(e);
                            }
                            if(sc==0){
                                doubleEv(e);
                                setTimeout(()=>{sc=1;},delayTime);
                            }
                        }
                    }

                }
            },

        },

    }
</script>

<style scoped lang="scss">
    .scroll {
        width: 100%;
        height: 100vh;
        margin: 0 auto;
        overflow-y: auto;
        overflow-x: hidden;
        background: url(../assets/images/bj.jpg) no-repeat bottom;
        background-size: 100%;
    }

    .main {
        position: relative;

    }


    img {
        /*pointer-events: none; !* 禁止长按图片保存 *!*/
        -webkit-touch-callout: default;

    }

    .car {
        position: absolute;
      top: 5%;
        left: 5%;
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