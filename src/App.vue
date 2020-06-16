<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  #app {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  html,body{
    overflow: hidden;
  }
</style>
