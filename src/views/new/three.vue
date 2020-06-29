<template>
    <div class="scroll" ref="scroll" @scroll="scroll">
        <div style="position: relative">
        <img src="../../assets/images/bj.jpg" style="width: 100%;height: auto;" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "three",
        data(){
            return{
                animateEnd: true,
                animate: true,
            }

        },
        mounted() {
        },
        methods:{
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
                this.rs = (scrolldrag * 100).toFixed(2) * 1
            },
        }
    }
</script>

<style scoped  lang="scss">
    img {
        pointer-events: none; /* 禁止长按图片保存 */
    }
    .scroll {
        margin: 0 auto;
        overflow-y: auto;
        overflow-x: hidden;
        background: url(../../assets/images/bj.jpg) no-repeat bottom;
        background-size: 100%;
    }
</style>
