<template>
  <a-row :wrap="false">
    <a-col flex="150px">
      <div class="title-wrapper">
        <img class="logo" src="@/assets/logo.png" alt="logo" />
        <div class="title">测试</div>
      </div>
    </a-col>
    <a-col flex="auto">
      <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" />
    </a-col>
    <a-col flex="80px">
      <div class="user-login">
        <a-button type="primary">登录</a-button>
      </div>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue'
import { HomeOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { MenuProps } from 'ant-design-vue'
const current = ref<string[]>(['mail'])
const items = ref<MenuProps['items']>([
  {
    key: 'first',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页'
  },
  {
    key: 'secound',
    icon: () => h(UserOutlined),
    label: '用户登录',
    title: '用户登录'
  },
  {
    key: 'three',
    icon: () => h(SettingOutlined),
    label: '用户注册',
    title: 'Navigation Three - Submenu',
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1'
          },
          {
            label: 'Option 2',
            key: 'setting:2'
          }
        ]
      }
    ]
  },
  {
    key: 'four',
    icon: () => h(SettingOutlined),
    label: h('a', { href: 'https://antdv.com', target: '_blank' }, '用户管理'),
    title: '用户管理'
  }
])
</script>

<style>
.title-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
}

.title-wrapper .logo {
  height: 30px;
}

.title-wrapper .title {
  color: #070707;
  margin-left: 20px;
  font-size: 20px;
}
</style>
