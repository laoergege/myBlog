<template>
  <div id="app">

    <keep-alive exclude="article">
      <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>
import store from './store/store.js';

export default {
  name: 'app',
  store
}
</script>

<style scoped>
#id {}
</style>
