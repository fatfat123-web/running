<template>
    <canvas id="canvas2"></canvas>
</template>

<script>
    export default {
        name: "tree",
        data() {
            return {
                wd: null,
                hg: null,

            }

        },
        mounted() {

            const canv = document.getElementById('canvas2');
            const ctx = canv.getContext('2d');
            this.wd = document.body.clientHeight;
            this.hg = document.body.clientWidth
            // canv.width = 400;
            // canv.height = 1800;
            // console.log(canv.width,canv.height)
            const colors = [{
                hue: 0,
                sat: 100,
                light: 84
            }, {
                hue: 299,
                sat: 91,
                light: 83
            }, {
                hue: 355,
                sat: 76,
                light: 80
            }, {
                hue: 269,
                sat: 76,
                light: 85
            }];

            const drawTrees = (startX, startY, len, angle) => {
                const randLen = () => Math.random() * ((len - 10) + 10);

                ctx.beginPath();
                ctx.save();

                ctx.translate(startX, startY * 0.99);
                ctx.rotate(angle * Math.PI / 180);
                ctx.moveTo(0, 0);
                ctx.lineTo(0, -len);
                ctx.lineWidth = Math.ceil(len * 0.025);
                ctx.strokeStyle = `hsl(15, 36%, ${50 - len * 0.15}%)`;
                ctx.stroke();

                if (len < 10) {
                    drawLeaves(startX, startY, 1.4);
                    ctx.restore();
                    return;
                }

                drawTrees(0, -len, randLen() * 0.8, -25);
                drawTrees(0, -len, randLen() * 0.925, -15);
                drawTrees(0, -len, randLen() * 0.925, 10);
                drawTrees(0, -len, randLen() * 0.8, 25);

                ctx.restore();
            }

            const drawLeaves = (posX, posY, size) => {
                const leafColor = Math.floor(Math.random() * colors.length);
                ctx.beginPath();
                ctx.save();
                ctx.arc(posX, posY, size, 0, 2 * Math.PI);
                ctx.fillStyle = `hsla(${colors[leafColor].hue}, ${colors[leafColor].sat}%, ${colors[leafColor].light}%, 50%)`;
                ctx.shadowColor = `hsla(${colors[leafColor].hue}, ${colors[leafColor].sat}%, ${colors[leafColor].light - 20}%, 50%)`;
                ctx.shadowOffsetX = 1;
                ctx.shadowOffsetY = 1;
                ctx.shadowBlur = 1;
                ctx.fill();
                ctx.restore();
            }

            const resizeChecks = event => {
                canv.width = this.wd;
                canv.height = this.hg;
                const treeCount = Math.floor(canv.width / 150);
                // Time
                for (let i = 0; i < treeCount; i++) {
                    // Memory
                    drawTrees(Math.random() * (canv.width - 100) + 100, canv.height * 1.3, Math.floor(canv.height * 0.3), 0);
                }
            }

            resizeChecks();
            window.addEventListener('resize', resizeChecks);
        }
    }
</script>

<style scoped>

</style>