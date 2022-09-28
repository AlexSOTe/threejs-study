<template>
  <div class="App">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped lang="scss">
  .App {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
</style>
