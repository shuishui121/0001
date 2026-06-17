<script setup lang="ts">
import SiteHeader from '@/components/SiteHeader.vue'
</script>

<template>
  <div class="app-wrapper">
    <SiteHeader />
    <main class="main-content">
      <router-view />
    </main>
    <footer class="site-footer">
      <p class="footer-text">滕州墨家文化展览馆 © 2024</p>
      <p class="footer-sub">机关零件图鉴 · 传承墨家智慧</p>
    </footer>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
  color: #2D2420;
  background: #F9F5ED;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

.site-footer {
  background: linear-gradient(180deg, #3E2A20 0%, #2D2420 100%);
  color: rgba(245, 240, 232, 0.7);
  text-align: center;
  padding: 24px 20px;
  margin-top: auto;
}

.footer-text {
  font-size: 14px;
  margin: 0 0 6px 0;
  font-family: 'SimSun', serif;
  letter-spacing: 2px;
  color: #DBC47D;
}

.footer-sub {
  font-size: 12px;
  margin: 0;
  color: rgba(245, 240, 232, 0.5);
  letter-spacing: 1px;
}

::selection {
  background: rgba(196, 163, 90, 0.3);
  color: #3E2A20;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #E8DFD0;
}

::-webkit-scrollbar-thumb {
  background: #C4A35A;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #A68B3D;
}
</style>