<template>

    <section>
        <slot></slot>
        <!--                <h2>Bubbles</h2>-->
    </section>

</template>

<script>
    export default {
        name: "froth",
        data() {
            return {
                timer: null
            }

        },
        mounted() {
            function createBubble() {
                const section = document.querySelector('section')
                const createElement = document.createElement('span')
                let size = Math.random() * 60;
                createElement.style.width = 10 + size + 'px';
                createElement.style.height = 10 + size + 'px';
                createElement.style.top = Math.random() * innerHeight + "px";
                section.appendChild(createElement);
                setTimeout(() => {
                    createElement.remove()
                }, 4000)
            }

            this.timer = setInterval(createBubble, 100)
        },
        beforeDestroy() {
            clearInterval(this.timer)
        }
    }
</script>

<style lang="scss">


    section {
        position: relative;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;

    }

    section h2 {
        font-size: 1rem;
        color: #333;
    }

    section span {
        position: absolute;
        left: -50px;
        background: transparent;
        border-radius: 50%;
        pointer-events: none;
        box-shadow: inset 0 0 10px rgba(225, 225, 225, 0.5);
        animation: animate 4s linear infinite;
    }

    @keyframes animate {
        0% {
            transform: translateX(0%);
            opacity: 1;
        }
        100% {

            transform: translateX(1200%);
            opacity: 1;
        }

    }
</style>
