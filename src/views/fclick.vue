<template>
    <div class="scroll">


        <img src="../assets/images/car1.png" class="car" id="car"/>
<!--        <div class="block" id="test">试试单击、双击或长按这里<br>Try to click , double-click or long-press here.</div>-->
<!--        <div class="block" id="test1">试试单击、双击或长按这里<br>Try to click , double-click or long-press here.</div>-->
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

            var fc=new fclick(document.getElementsByClassName('car'));

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
            /*
             *@method typeObj
             *@description 判断对象类型
             *@param {any} obj 判断的对象
             *@return {boolean}
            */
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
            /*
             *@method fclick
             *@description 初始化一个fclick对象
             *@param {element} elementx 想要监听的元素，可以是元素组
             *@return {fclick}
            */
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
                for(var i=0;i<ele.length;i++){
                    ele[i].setAttribute('onselectstart','return false');/*防止双击选中文本*/
                    // ele[i].style.cursor="pointer";/*手型鼠标*/

                    ele[i].onmousedown = function(e){
                        var e=e||enent;
                        if(state==0){
                            state=1;
                            setTimeout(function(){state=0;},delayTime);
                        }else if(state==1){
                            sc=0;
                        }
                    }
                    ele[i].onmouseup=function(e){
                        if(state==1){
                            setTimeout(function(){if(sc==1){singleEv(e)}},200);
                        }else if(state==0){
                            longPressEv(e);
                        }
                        if(sc==0){
                            doubleEv(e);
                            setTimeout(function(){sc=1;},delayTime);
                        }
                    }
                }

            }




        },
        methods: {},

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