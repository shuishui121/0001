<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Assembly } from '@/types/part'

const props = defineProps<{
  assemblies: Assembly[]
}>()

const { t } = useI18n()
const activeIndex = ref(0)
const imageError = ref(false)

watch(() => props.assemblies, () => {
  activeIndex.value = 0
  imageError.value = false
})

const activeAssembly = computed(() => props.assemblies[activeIndex.value] || null)

function switchAssembly(index: number) {
  activeIndex.value = index
  imageError.value = false
}

function handleTabKeydown(event: KeyboardEvent, index: number) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    switchAssembly(index)
  }
}
</script>

<template>
  <section
    class="assembly-viewer"
    role="region"
    :aria-labelledby="'assembly-title-' + Math.random().toString(36).slice(2)"
  >
    <header class="viewer-header">
      <h3
        class="viewer-title"
        :id="'assembly-title-' + Math.random().toString(36).slice(2)"
      >
        <span class="title-icon" aria-hidden="true">🔧</span>
        {{ t('assembly.title') }}
      </h3>
      <div
        v-if="assemblies.length > 1"
        class="assembly-tabs"
        role="tablist"
        :aria-label="t('assembly.tabsLabel')"
      >
        <button
          v-for="(assembly, index) in assemblies"
          :key="index"
          class="tab-btn"
          :class="{ active: activeIndex === index }"
          :role="'tab'"
          :aria-selected="activeIndex === index"
          :aria-label="assembly.mechanismName"
          type="button"
          tabindex="0"
          @click="switchAssembly(index)"
          @keydown="handleTabKeydown($event, index)"
        >
          {{ assembly.mechanismName }}
        </button>
      </div>
    </header>

    <div v-if="activeAssembly" class="viewer-content">
      <figure
        class="mechanism-diagram"
        :aria-label="activeAssembly.mechanismName"
      >
        <div class="diagram-wrapper">
          <img
            v-if="!imageError && activeAssembly.mechanismImage"
            :src="activeAssembly.mechanismImage"
            :alt="activeAssembly.mechanismName"
            class="mechanism-image"
            @error="imageError = true"
          />
          <div v-else class="diagram-placeholder" aria-hidden="true">
            <div class="placeholder-inner">
              <span class="placeholder-icon">📐</span>
              <span class="placeholder-text">{{ activeAssembly.mechanismName }}</span>
            </div>
          </div>
          <div
            class="assembly-marker"
            :style="{
              left: activeAssembly.position.x + '%',
              top: activeAssembly.position.y + '%'
            }"
            tabindex="0"
            role="img"
            :aria-label="activeAssembly.mechanismName"
          >
            <div class="marker-pulse" aria-hidden="true"></div>
            <div class="marker-dot" aria-hidden="true"></div>
            <div class="marker-label" aria-hidden="true">{{ activeAssembly.mechanismName }}</div>
          </div>
        </div>
        <figcaption class="diagram-caption" sr-only>
          {{ activeAssembly.mechanismName }}
        </figcaption>
      </figure>

      <article class="assembly-description" aria-live="polite">
        <header class="desc-header">
          <span class="desc-icon" aria-hidden="true">📍</span>
          <h4 class="desc-title">{{ activeAssembly.mechanismName }}</h4>
        </header>
        <p class="desc-text">{{ activeAssembly.description }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.assembly-viewer {
  background: linear-gradient(145deg, #F9F5ED 0%, #F5F0E8 100%);
  border: 2px solid #C4A35A;
  border-radius: 12px;
  overflow: hidden;
}

.viewer-header {
  padding: 16px 20px;
  border-bottom: 1px solid #E8DFD0;
  background: linear-gradient(90deg, rgba(196, 163, 90, 0.12) 0%, transparent 100%);
}

.viewer-title {
  font-family: 'SimSun', 'STSong', serif;
  font-size: 18px;
  font-weight: 700;
  color: #1A1410;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-icon {
  font-size: 20px;
}

.assembly-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 8px 16px;
  border: 1.5px solid #C4A35A;
  border-radius: 6px;
  background: #F9F5ED;
  color: #3E2A20;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Microsoft YaHei', sans-serif;
}

.tab-btn:hover {
  background: #F5F0E8;
  border-color: #A68B3D;
}

.tab-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px rgba(196, 163, 90, 0.65);
  background: #F5F0E8;
}

.tab-btn.active {
  background: linear-gradient(135deg, #5C4033 0%, #7A5A47 100%);
  border-color: #5C4033;
  color: #F5F0E8;
  box-shadow: 0 2px 8px rgba(92, 64, 51, 0.3);
}

.tab-btn.active:focus-visible {
  box-shadow: 0 2px 8px rgba(92, 64, 51, 0.3), 0 0 0 2px rgba(196, 163, 90, 0.7);
}

.viewer-content {
  padding: 20px;
}

.mechanism-diagram {
  position: relative;
  margin: 0 0 16px 0;
}

.diagram-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 2;
  background: #F9F5ED;
  border: 1px dashed #C4A35A;
  border-radius: 8px;
  overflow: hidden;
}

.mechanism-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 20px;
  transition: opacity 0.3s ease;
}

.diagram-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #F5F0E8 0%, #E8DFD0 100%);
}

.placeholder-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: #5C4033;
}

.placeholder-icon {
  font-size: 48px;
  opacity: 0.7;
}

.placeholder-text {
  font-family: 'SimSun', 'STSong', serif;
  font-size: 16px;
  font-weight: 600;
  color: #3E2A20;
}

.assembly-marker {
  position: absolute;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 10;
}

.assembly-marker:focus-visible {
  outline: none;
}

.assembly-marker:focus-visible .marker-dot {
  box-shadow: 0 0 0 3px rgba(196, 163, 90, 0.7), 0 2px 8px rgba(92, 64, 51, 0.4);
}

.marker-pulse {
  position: absolute;
  width: 30px;
  height: 30px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: rgba(196, 163, 90, 0.45);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0.2;
  }
}

.marker-dot {
  position: relative;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: linear-gradient(135deg, #C4A35A 0%, #6B3410 100%);
  border: 2px solid #F9F5ED;
  box-shadow: 0 2px 8px rgba(92, 64, 51, 0.4);
  transition: box-shadow 0.2s ease;
}

.marker-label {
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
  margin-top: 8px;
  padding: 4px 10px;
  background: rgba(62, 42, 32, 0.92);
  color: #F5F0E8;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;
  font-family: 'Microsoft YaHei', sans-serif;
}

.assembly-marker:hover .marker-label,
.assembly-marker:focus-visible .marker-label {
  opacity: 1;
}

.assembly-description {
  background: #F9F5ED;
  border: 1px solid #E8DFD0;
  border-radius: 8px;
  padding: 16px;
}

.desc-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px dashed #C4A35A;
}

.desc-icon {
  font-size: 16px;
}

.desc-title {
  font-family: 'SimSun', 'STSong', serif;
  font-size: 15px;
  font-weight: 700;
  color: #1A1410;
  margin: 0;
}

.desc-text {
  font-size: 14px;
  line-height: 1.8;
  color: #3E2A20;
  margin: 0;
  font-family: 'Microsoft YaHei', sans-serif;
}

.diagram-caption {
  margin-top: 8px;
}

@media (max-width: 768px) {
  .viewer-header {
    padding: 12px 16px;
  }

  .viewer-title {
    font-size: 16px;
  }

  .assembly-tabs {
    gap: 6px;
  }

  .tab-btn {
    padding: 6px 12px;
    font-size: 12px;
  }

  .viewer-content {
    padding: 16px;
  }

  .assembly-description {
    padding: 12px;
  }

  .desc-text {
    font-size: 13px;
  }
}
</style>
