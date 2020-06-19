<template>

        <section>

            <h2>Bubbles</h2>
        </section>

</template>

<script>
    export default {
        name: "froth",
        data() {
            return {}

        },
        mounted() {

            function createBubble() {
                const section = document.querySelector('section')
                const createElement = document.createElement('span')
                var size = Math.random() * 60;
                createElement.style.width =50+ size + 'px';
                createElement.style.height =50+ size + 'px';
                createElement.style.left= Math.random() * innerWidth + "px";
                section.appendChild(createElement);
                setTimeout(()=>{

                    createElement.remove()

                },4000)
            }
            setInterval(createBubble,50)
        },
        methods: {

aa(){


}
        }
    }
</script>

<style scoped lang="scss">


    section {
        position: relative;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        background: #111111;
        display: flex;
        justify-content: center;
        align-items: center;

    }
    section h2{
        font-size: 1rem;
        color: #333;
    }
    section span{
        position: absolute;
        bottom: -50px;
        background: transparent;
        border-radius: 50%;
        pointer-events: none;
        box-shadow:inset 0 0 10px rgba(225,225,225,0.5);
        animation:animate 4s linear infinite;
    }
    @keyframes animate {
        0%{
            transform: translateY(0%);
            opacity: 1;
        }
        100%{

            transform: translateY(-1200%);
            opacity: 1;
        }

    }
</style>