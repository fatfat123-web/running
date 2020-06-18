<template>
    <div class="scroll" ref="scroll" @scroll="scroll">

        <div class="main" @touchstart.prevent="gtouchstart" @touchend.prevent="triggerReply">

            <img  src="../assets/images/bj.jpg" style="width: 100%;height: auto;"/>

            <div  style="width:31%;position: fixed;z-index: 999" ref="go" :style="go" v-if="kg===false">

                <img style="width: 100%;height: auto" class="element" :src="item" v-for="(item,index) in img2"
                     v-show="index === mark">


            </div>

            <div  style="width:31%;position: fixed;z-index: 999" ref="go" :style="go" v-if="kg===true">

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
                kg:true,
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
                flagfind:false,
                mark: 0,
                rs:null,
                ss:null,
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


                 this.ss=parseInt(scrolldrag * 500)
                // this.advance(_scrolldrag)

                // console.log(clientHeight)

            },

            // 长按事件
            // 触摸开始
            gtouchstart(e) {

                // 可视窗口的高度
                let clientHeight = this.$refs.scroll.clientHeight

                this.startX = e.changedTouches[0].pageX;
                this.startY = e.changedTouches[0].pageY;
                this.front = (clientHeight) * (0.4);



                //执行长按的内容
                // this.Loop = setTimeout( ()=> {
                //     this.loop=0;
                    // console.log(this.front)
                    if (this.startY < this.front) {
                        this.kg=false;
                        this.flagfind=false
                        this.retreat()

                        // console.log( div.scrollTop)
                    }else {
                        this.kg=true;
                        this.flagfind=false
                        this.advance()
                        // console.log( div.scrollTop)
                    }

                // }, 500);
                // return false;
            },
            //   前进
            advance() {
                // console.log(this.rs)
                // console.log(this.flagfind,'前进了')
                let div = this.$refs.scroll
                div.scrollTop += 2
                 //rs必须要是动态的 rs为
                 // console.log(this.rs)
                // console.log(_scrolldrag)
                // let arr = [0, 1, 0, 2]
                // this.mark = arr[parseInt(this.rs) % 2];
                 this.mark = parseInt(this.rs) % 2 ? 1 : 0;

                // for (let i in arr) {
                //     // console.log(arr[i]);
                //     this.mark =arr[parseInt(i)]
                //     console.log(this.mark)
                //
                // }
                console.log(this.mark)

                if (this.flagfind===true) return false;
                window.requestAnimationFrame(this.advance)
                // this.timer = setInterval(() => {
                //     console.log(this.timer)
                //     this.test++;
                //     console.log(this.test)
                // }, 1000)


            },
            // 后退
            retreat(){

                // let arr = [0, 1, 0, 2]
                // this.mark = arr[parseInt(this.rs) % 4];

              this.mark = parseInt(this.rs) % 2 ? 1 : 0;
                let div = this.$refs.scroll
                div.scrollTop -= 2
                // console.log('后退了')
                if (this.flagfind===true)
                    return false;
                window.requestAnimationFrame(this.retreat)
            },


            // 触摸结束
            triggerReply() {
                this.flagfind = true;

                this.timer = setInterval(() => {
                    this.mark=0;
                }, 100)

                // console.log(this.mark)
                // let div = this.$refs.scroll
                // const self = this;
                // clearTimeout(this.timer);
                // this.flagfind=true;
                // //这里click内容
                // div.scrollTop += 2

                // if (self.Loop !== 0) {
                //     console.log('点击事件');
                //     this.flagfind=true;
                //     console.log(this.flagfind)
                //     return false;
                // }

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
