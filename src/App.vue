<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import SiteHeader from '@/components/SiteHeader.vue'

const { t, locale } = useI18n()
const route = useRoute()
const appTransitioning = ref(false)
const routeKey = ref('')

watch(locale, () => {
  appTransitioning.value = true
  setTimeout(() => {
    appTransitioning.value = false
  }, 350)
})

watch(() => route.fullPath, (path) => {
  routeKey.value = path
})
</script>

<template>
  <div id="app-root" class="app-wrapper" :class="{ 'i18n-transitioning': appTransitioning }">
    <a href="#main-content" class="skip-link">{{ t('common.skip') }}</a>
    
    <SiteHeader />
    
    <main id="main-content" class="main-content" role="main" tabindex="-1">
      <transition name="page-fade" mode="out-in">
        <router-view :key="routeKey" v-slot="{ Component }">
          <transition name="content-fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </transition>
    </main>
    
    <footer class="site-footer" role="contentinfo">
      <p class="footer-text">{{ t('footer.copyright') }}</p>
      <p class="footer-sub">{{ t('footer.sub') }}</p>
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
  font-family: 'Microsoft YaHei', 'PingFang SC', -apple-system, 
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #1A1410;
  background: #F9F5ED;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.skip-link {
  position: absolute;
  top: -100px;
  left: 20px;
  z-index: 9999;
  padding: 12px 24px;
  background: #3E2A20;
  color: #F5F0E8;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  transition: top 0.2s ease;
}

.skip-link:focus {
  top: 20px;
  outline: 3px solid #C4A35A;
  outline-offset: 2px;
}

.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: opacity 0.35s ease;
}

.app-wrapper.i18n-transitioning {
  opacity: 0.7;
}

.main-content {
  flex: 1;
}

.main-content:focus {
  outline: none;
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.content-fade-enter-active,
.content-fade-leave-active {
  transition: opacity 0.25s ease;
}

.content-fade-enter-from,
.content-fade-leave-to {
  opacity: 0;
}

.site-footer {
  background: linear-gradient(180deg, #3E2A20 0%, #2D2420 100%);
  color: #E8DFD0;
  text-align: center;
  padding: 24px 20px;
  margin-top: auto;
}

.footer-text {
  font-size: 14px;
  margin: 0 0 6px 0;
  font-family: 'SimSun', serif;
  letter-spacing: 2px;
  color: #E8C878;
}

.footer-sub {
  font-size: 12px;
  margin: 0;
  color: #C8B898;
  letter-spacing: 1px;
}

::selection {
  background: rgba(196, 163, 90, 0.35);
  color: #3E2A20;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: #E8DFD0;
}

::-webkit-scrollbar-thumb {
  background: #A68B3D;
  border-radius: 4px;
  border: 2px solid #E8DFD0;
}

::-webkit-scrollbar-thumb:hover {
  background: #8B4513;
}
</style>
