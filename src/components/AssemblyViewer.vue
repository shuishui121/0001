<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Assembly } from '@/types/part'

const props = defineProps<{
  assemblies: Assembly[]
}>()

const activeIndex = ref(0)

const activeAssembly = computed(() => props.assemblies[activeIndex.value])

function switchAssembly(index: number) {
  activeIndex.value = index
}
</script>

<template>
  <div class="assembly-viewer">
    <div class="viewer-header">
      <h3 class="viewer-title">
        <span class="title-icon">🔧</span>
        装配位置示意
      </h3>
      <div class="assembly-tabs">
        <button
          v-for="(assembly, index) in assemblies"
          :key="index"
          class="tab-btn"
          :class="{ active: activeIndex === index }"
          @click="switchAssembly(index)"
        >
          {{ assembly.mechanismName }}
        </button>
      </div>
    </div>

    <div class="viewer-content">
      <div class="mechanism-diagram">
        <div class="diagram-wrapper">
          <img
            :src="activeAssembly.mechanismImage"
            :alt="activeAssembly.mechanismName"
            class="mechanism-image"
          />
          <div
            class="assembly-marker"
            :style="{
              left: activeAssembly.position.x + '%',
              top: activeAssembly.position.y + '%'
            }"
          >
            <div class="marker-pulse"></div>
            <div class="marker-dot"></div>
            <div class="marker-label">{{ activeAssembly.mechanismName }}</div>
          </div>
        </div>
      </div>

      <div class="assembly-description">
        <div class="desc-header">
          <span class="desc-icon">📍</span>
          <span class="desc-title">{{ activeAssembly.mechanismName }}</span>
        </div>
        <p class="desc-text">{{ activeAssembly.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.assembly-viewer {
  background: linear-gradient(145deg, #F9F5ED 0%, #F5F0E8 100%);
  border: 2px solid #C4A35A;
  border-radius: 12px;
  overflow: hidden;
}

.viewer-header {
  padding: 16px 20px;
  border-bottom: 1px solid #E8DFD0;
  background: linear-gradient(90deg, rgba(196, 163, 90, 0.1) 0%, transparent 100%);
}

.viewer-title {
  font-family: 'SimSun', 'STSong', serif;
  font-size: 18px;
  font-weight: 700;
  color: #3E2A20;
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
  color: #5C4033;
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

.tab-btn.active {
  background: linear-gradient(135deg, #5C4033 0%, #7A5A47 100%);
  border-color: #5C4033;
  color: #F5F0E8;
  box-shadow: 0 2px 8px rgba(92, 64, 51, 0.3);
}

.viewer-content {
  padding: 20px;
}

.mechanism-diagram {
  position: relative;
  margin-bottom: 16px;
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
}

.assembly-marker {
  position: absolute;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 10;
}

.marker-pulse {
  position: absolute;
  width: 30px;
  height: 30px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: rgba(196, 163, 90, 0.4);
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
  background: linear-gradient(135deg, #C4A35A 0%, #8B4513 100%);
  border: 2px solid #F9F5ED;
  box-shadow: 0 2px 8px rgba(92, 64, 51, 0.4);
}

.marker-label {
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
  margin-top: 8px;
  padding: 4px 10px;
  background: rgba(92, 64, 51, 0.9);
  color: #F5F0E8;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;
  font-family: 'Microsoft YaHei', sans-serif;
}

.assembly-marker:hover .marker-label {
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
  color: #3E2A20;
}

.desc-text {
  font-size: 14px;
  line-height: 1.8;
  color: #5C4033;
  margin: 0;
  font-family: 'Microsoft YaHei', sans-serif;
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
