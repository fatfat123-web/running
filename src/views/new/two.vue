<template>
    <v-touch class="container">
    </v-touch>
</template>

<script>
    export default {
        mounted() {
            setTimeout(() => {
                this.$router.push('three')
            }, 3000)
        }
    }
</script>

<style scoped>
    .container {
        background: url("../../assets/images/bj2.png") no-repeat;
        background-size: 100%;
    }
</style>
