<template>
    <p>{{time}}</p>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                time: 3,
                gg:false,
            }
        },
        created() {
            this.jump()
        },
        methods: {
            jump() {
                let timer = setInterval(() => {
                    this.time--
                    if (this.time === 0) {
                        clearInterval(timer)
                        // this.$router.push('/')

                    }
                }, 1000)


            },
        },
    }
</script>

<style scoped lang="scss">

</style>