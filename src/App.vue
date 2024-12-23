<template>
  <div id="app">
    <BasicLayouts />
      <a-button @click="openNewPage" type="primary">Primary Button</a-button>
  </div>
</template>

<script setup lang="ts">
import BasicLayouts from '@/layouts/BasicLayouts.vue'
import router from './router';
const openNewPage = ()=>{
  router.replace('/about')
}
</script>

<style scoped></style>
