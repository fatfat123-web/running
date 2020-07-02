<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div v-for="item in 4" :key="item" :style="{background: slide[item-1]}" class="swiper-slide slide">{{item}}
            </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
        <!-- Add Arrows -->

    </div>
</template>

<script>
    import '../assets/css/swiper.min.css';
    import Swiper from 'swiper';

    export default {
        name: "slideshow",
        data() {
            return {
                slide: [
                    `url(${require('../assets/images/bj1.png')})no-repeat`,
                    `url(${require('../assets/images/bj2.png')})no-repeat`,
                    `url(${require('../assets/images/bj3.png')})no-repeat`,
                    `url(${require('../assets/images/bj4.png')})no-repeat`,
                       ]
            }
        },
        mounted() {
            var swiper = new Swiper('.swiper-container', {
                spaceBetween: 30,
                centeredSlides: true,
                direction: 'vertical',
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },

            });
        },
        methods: {},
    }
</script>

<style scoped lang="scss">
    html, body {
        position: relative;
        height: 100%;
    }

    body {
        background: #eee;
        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
        font-size: 14px;
        color: #000;
        margin: 0;
        padding: 0;
    }

    .swiper.min.css {


    }

    .swiper-container {
        width: 100%;
        height: 100%;

    }

    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;

        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
    }

    .slide {
        background: #ff9a9f;
    }
</style>