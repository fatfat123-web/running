<template>
    <div class="box-canvas">
        <div class="pig">
            <div class="leg left"></div>
            <div class="leg right"></div>
            <div class="body"></div>
            <div class="head">
                <div class="eye left"></div>
                <div class="eye right"></div>
                <div class="nose"></div>
                <div class="smile"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "pig"
    }
</script>

<style >
    :root {
        --pig-pink: pink;
        --accent-pink: #F998A8;
    }

    body {
        background: var(--background-color)
    }

    .box-canvas {
        position: relative;
        margin: auto;
        display: block;
        margin-top: 8%;
        margin-bottom: 8%;
        width: 600px;
        height: 600px;
        background: var(--background-color)
    }

    .pig {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 230px;
        height: 200px
    }

    .head {
        position: absolute;
        width: 100px;
        height: 100px;
        border-radius: 30% 30% 50% 50%;
        background: var(--pig-pink);
        box-shadow: 0 1px 0 0 var(--accent-pink)
    }

    .head::before {
        content: '';
        position: absolute;
        left: -5px;
        top: -5px;
        width: 50px;
        height: 40px;
        background: var(--accent-pink);
        border-radius: 50%;
        clip-path: polygon(25% 100%, 0 0, 100% 0)
    }

    .head::after {
        content: '';
        position: absolute;
        right: -5px;
        top: -5px;
        width: 50px;
        height: 40px;
        background: var(--accent-pink);
        border-radius: 50%;
        clip-path: polygon(75% 100%, 0 0, 100% 0)
    }

    .nose {
        position: absolute;
        top: 60%;
        left: 50%;
        transform: translate(-50%, -60%);
        background: var(--accent-pink);
        width: 25px;
        height: 20px;
        border-radius: 40%
    }

    .nose::before {
        content: '';
        position: absolute;
        left: 5px;
        top: 5px;
        height: 10px;
        width: 5px;
        background: var(--pig-pink);
        border-radius: 50%
    }

    .nose::after {
        content: '';
        position: absolute;
        right: 5px;
        top: 5px;
        height: 10px;
        width: 5px;
        background: var(--pig-pink);
        border-radius: 50%
    }

    .eye {
        position: absolute;
        width: 15px;
        height: 15px;
        background: white;
        border-radius: 50%;
        top: 25%
    }

    .eye.left {
        left: 25%
    }

    .eye.right {
        right: 25%
    }

    .eye::after {
        content: '';
        position: absolute;
        left: 5px;
        top: 5px;
        width: 5px;
        height: 5px;
        background: black;
        border-radius: 50%
    }

    .smile {
        position: absolute;
        bottom: 15px;
        left: 50%;
        transform: translateX(-50%);
        width: 25px;
        height: 10px;
        border-bottom: 3px solid var(--accent-pink);
        border-radius: 50%
    }

    .body {
        position: absolute;
        left: 35px;
        top: 50px;
        width: 160px;
        height: 120px;
        background: var(--pig-pink);
        border-radius: 40% 50% 40% 40%
    }

    .body::before {
        content: '';
        position: absolute;
        right: -16px;
        top: 25px;
        width: 20px;
        height: 25px;
        border-radius: 50%;
        box-shadow: 5px 2px 0 0 var(--pig-pink);
        transform: rotate(45deg)
    }

    .body::after {
        content: '';
        position: absolute;
        top: 32px;
        right: -34px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        box-shadow: -3px -1px 0 0 var(--pig-pink);
        transform: rotate(-45deg)
    }

    .leg {
        position: absolute;
        bottom: 0;
        height: 40px;
        width: 20px;
        background: var(--accent-pink);
        border-radius: 0 0 20% 20%
    }

    .leg.left {
        left: 50px;
        bottom: 15px
    }

    .leg.right {
        right: 60px;
        bottom: 15px
    }

    .leg::before {
        content: '';
        position: absolute;
        left: 10px;
        height: 40px;
        width: 20px;
        background: var(--pig-pink);
        border-radius: 0 0 20% 20%
    }
</style>