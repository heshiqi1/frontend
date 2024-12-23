<template>
  <div id="basic-layouts">
    <a-layout>
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <!-- <router-view /> -->
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://www.baidu.com" target="_blank">hsq的网站</a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from '@/components/GlobalHeader.vue'
</script>

<style scoped>
#basic-layouts .header {
  background: #fff;
  padding-inline: 10px;
  margin-bottom: 10px;
  color: unset;
}
#basic-layouts .content {
  margin-bottom: 20px;
  padding: 20px;
  background: linear-gradient(to right, #d3b243, #fda085);
}

#basic-layouts .footer {
  background-color: azure;
  text-align: center;
  position: fixed;
  /* width: 100%; */
  /* height: 50px; */
  bottom: 0px;
  left: 0px;
  right: 0px;
  padding: 16px;
}
</style>
