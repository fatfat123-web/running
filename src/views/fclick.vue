<template>
    <div>


        <img src="../assets/images/car1.png" class="car"/>
        <div class="block" id="test">试试单击、双击或长按这里<br>Try to click , double-click or long-press here.</div>
        <div class="block" id="test1">试试单击、双击或长按这里<br>Try to click , double-click or long-press here.</div>
    </div>
</template>

<script>
    import click from '../assets/js/click'
    export default {
        name: "fclick",
        data() {
            return {
                fc: null,


            }
        },
        mounted() {
            this.fc =  fclick(document.getElementsByClassName('block'));
            this.fc.single(function (e) {
                //e为event元素
                //e.target可以获取被点击的元素
                //e.clientX可以获取鼠标X轴位置，Y轴同理
                console.log("single" + e.clientX);
            })
            this.fc.double(function (e) {
                console.log("double" + e.target.getAttribute("id"));
            })
            this.fc.longPress(function (e) {
                console.log("longPress" + e.target.getAttribute("id"));
            })






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