<template>
  <div id="app">
    <Login />
  </div>
</template>

<script setup lang="ts">
import BasicLayouts from '@/layouts/BasicLayouts.vue'
import router from './router';
import Login from './components/Login.vue';
const openNewPage = ()=>{
  router.replace('/about')
}
</script>

<style>
body {
  background: linear-gradient(to right, rgb(130, 121, 121),rgb(41, 11, 11));
}
</style>
