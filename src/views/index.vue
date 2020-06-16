<template>
    <div class="scroll" ref="scroll" @scroll="scroll">
        <div class="main" @touchstart.prevent="gtouchstart"  @touchend.prevent="triggerReply" @touchmove="touchmove"  @touchcancel="touchcancel">

            <img src="../assets/images/bj.jpg" style="width: 100%;height: auto;"/>

        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {

            return {
                //前进
                front: null,
                //左边区域
                rear: null,
                x: null,
                Y: null,
                startX: null,
                startY: null,
                Loop: 0,
                test: 0,
                timer: null,
                flagfind:false,
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
                let _scrolldrag = (scrolldrag * 100).toFixed(2) * 1
                this.gkd = _scrolldrag;
                // console.log(clientHeight)

            },

            // 长按事件
            gtouchstart(e) {
                let clientHeight = this.$refs.scroll.clientHeight
                this.startX = e.changedTouches[0].pageX;
                this.startY = e.changedTouches[0].pageY;
                this.front = (clientHeight) * (0.4);
                let div = this.$refs.scroll


                //执行长按的内容
                this.Loop = setTimeout( ()=> {
                      this.loop=0;
                    // console.log(this.front)
                    if (this.startY < this.front) {
                        this.flagfind=false
                        this.retreat()

                        console.log( div.scrollTop)
                    }else {
                        this.flagfind=false
                        this.advance()

                        console.log( div.scrollTop)
                    }

                }, 500);
                return false;
            },
            //   前进
            advance() {

                console.log(this.flagfind,'前进了')
                let div = this.$refs.scroll
                div.scrollTop += 2

                    if (this.flagfind===true)
                    return false;
                window.requestAnimationFrame(this.advance)
                    // this.timer = setInterval(() => {
                    //     console.log(this.timer)
                    //     this.test++;
                    //     console.log(this.test)
                    // }, 1000)


            },
            // 后退
            retreat(){
                let div = this.$refs.scroll
                div.scrollTop -= 2
                console.log('后退了')
                if (this.flagfind===true)
                    return false;
                window.requestAnimationFrame(this.retreat)
            },


            //
            triggerReply() {
                // let div = this.$refs.scroll
                const self = this;
                // clearTimeout(this.timer);
                // this.flagfind=true;
                // //这里click内容
                // div.scrollTop += 2

                if (self.Loop !== 0) {
                    console.log('点击事件');
                    this.flagfind=true;
                    console.log(this.flagfind)
                    return false;
                }

            },

            touchcancel(e){
              console.log(1123)
                this.flagfind=false
            },

            touchmove(e) {
                e.preventDefault();
                if (e.changedTouches.length) {
                    //移动时的坐标
                    let moveEndX = e.changedTouches[0].pageX;
                    let moveEndY = e.changedTouches[0].pageY;
                    //计算当前的坐标跟初始坐标的差值
                    this.x = moveEndX - this.startX;
                    this.y = moveEndY - this.startY;
                }
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

    .main {
        position: relative;

    }
</style>