<template>
    <div class="container">
        <Froth/>
    </div>
</template>

<script>
    import Froth from '@/views/froth'

    export default {
        components: {
            Froth
        },
        mounted() {
            setTimeout(() => {
                this.$router.push('two')
            }, 3000)
        }
    }
</script>

<style scoped>
    .container {
        width: 100%;
        height: 100%;
        background: url(../../assets/images/bj1.png) no-repeat bottom;
        background-size: 100%;
    }
</style>
