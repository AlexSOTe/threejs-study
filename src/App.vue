<template>
  <div class="App">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { RouterLink, RouterView } from 'vue-router';
  onMounted(() => {
    const AppEle = document.querySelector('.App');
    AppEle?.addEventListener("touchmove", (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      return false;
    });
  });
</script>

<style scoped lang="scss">
  .App {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
</style>
