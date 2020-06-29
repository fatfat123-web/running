<template>
    <div class="container">
        <router-view/>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [
                    require('../../assets/images/bj.jpg'),
                    require('../../assets/images/bj1.png'),
                    require('../../assets/images/bj2.png'),
                ]
            }
        },
        created() {
            let count = 0;
            for (let item of this.list) {
                let img = new Image()
                img.src = item;
                count++
                if (count === 3) {
                    this.$router.push('/one')
                }
            }
        }
    }
</script>

<style scoped>
    .container {
        width: 100vw;
        height: 100vh;
    }
</style>
