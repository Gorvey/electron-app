<!--
 * @Author: zengzhe
 * @Date: 2023-02-21 15:51:22
 * @LastEditors: zengzhe
 * @LastEditTime: 2023-02-21 17:16:09
 * @Description:
-->
<script setup>
const tabsList = [
  {
    url: 'baidu.com',
    title: '',
    icon: ''
  },
  {
    url: 'bing.com',
    title: '',
    icon: ''
  }
]

const toNewTab = () => {
  window.electron.ipcRenderer.send('to-new-tab')
}
const selectTab = (tab) => {
  window.electron.ipcRenderer.send('select-tab', tab.url)
}
</script>
<template>
  <div class="view">
    <div>
      <div v-for="(v, i) in tabsList" :key="i" class="view__item">
        <div @click="selectTab(v)">
          {{ i }}
        </div>
      </div>
    </div>
    <div class="view__item add" @click="toNewTab">+</div>
  </div>
</template>
<style lang="scss">
@import './assets/css/bar-view.scss';
</style>
