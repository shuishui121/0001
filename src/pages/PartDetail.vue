<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePartsStore } from '@/stores/parts'
import AssemblyViewer from '@/components/AssemblyViewer.vue'
import PartSketch from '@/components/PartSketch.vue'
import { ArrowLeft, Tag, Layers, MapPin, Ruler, Weight } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const store = usePartsStore()

const imageZoom = ref(1)
const isLoading = ref(true)
const sketchImageError = ref(false)

const partId = computed(() => route.params.id as string)

const part = computed(() => {
  return store.getPartById(partId.value)
})

const dimensionText = computed(() => {
  if (!part.value) return ''
  const dims = part.value.dimensions
  const parts: string[] = []
  
  if (dims.length) parts.push(`长 ${dims.length}${dims.unit}`)
  if (dims.width) parts.push(`宽 ${dims.width}${dims.unit}`)
  if (dims.height) parts.push(`高 ${dims.height}${dims.unit}`)
  if (dims.diameter) parts.push(`直径 ${dims.diameter}${dims.unit}`)
  
  return parts.join(' × ')
})

const weightText = computed(() => {
  if (!part.value?.dimensions.weight) return ''
  return `重 ${part.value.dimensions.weight} kg`
})

function goBack() {
  router.back()
}

function zoomIn() {
  imageZoom.value = Math.min(imageZoom.value + 0.2, 3)
}

function zoomOut() {
  imageZoom.value = Math.max(imageZoom.value - 0.2, 0.5)
}

function resetZoom() {
  imageZoom.value = 1
}

onMounted(() => {
  if (store.parts.length === 0) {
    store.loadParts().then(() => {
      isLoading.value = false
    })
  } else {
    isLoading.value = false
  }
})

watch(partId, () => {
  imageZoom.value = 1
  sketchImageError.value = false
})
</script>

<template>
  <div class="part-detail-page">
    <div class="detail-container">
      <div class="detail-header">
        <button class="back-btn" @click="goBack">
          <ArrowLeft :size="20" />
          <span>返回列表</span>
        </button>

        <nav class="breadcrumb">
          <span class="crumb" @click="router.push('/')">零件图鉴</span>
          <span class="separator">/</span>
          <span class="crumb current">{{ part?.name || '零件详情' }}</span>
        </nav>
      </div>

      <div class="detail-panels">
        <div v-if="isLoading" class="content-panel loading-wrap">
          <div class="loading-spinner"></div>
          <p class="loading-text">正在加载零件详情...</p>
        </div>

        <div v-else-if="!part" class="content-panel not-found">
          <div class="notfound-icon">❓</div>
          <h2 class="notfound-title">未找到该零件</h2>
          <p class="notfound-desc">可能该零件已被移除或编号有误</p>
          <button class="back-home-btn" @click="router.push('/')">
            返回首页
          </button>
        </div>

        <div v-else class="content-panel detail-content">
          <div class="sketch-section">
            <div class="sketch-header">
              <h2 class="section-title">
                <span class="title-icon">📐</span>
                线稿图
              </h2>
              <div class="zoom-controls">
                <button class="zoom-btn" @click="zoomOut" title="缩小">−</button>
                <span class="zoom-level">{{ Math.round(imageZoom * 100) }}%</span>
                <button class="zoom-btn" @click="zoomIn" title="放大">+</button>
                <button class="reset-btn" @click="resetZoom" title="重置">↺</button>
              </div>
            </div>
            
            <div class="sketch-wrapper">
              <div class="sketch-container">
                <template v-if="!sketchImageError && part.sketchImage">
                  <img 
                    :src="part.sketchImage" 
                    :alt="part.name"
                    :style="{ transform: `scale(${imageZoom})` }"
                    class="sketch-image"
                    @error="sketchImageError = true"
                  />
                </template>
                <div v-else class="sketch-svg-wrapper" :style="{ transform: `scale(${imageZoom})` }">
                  <PartSketch :part="part" size="large" />
                </div>
              </div>
              
              <div class="dimension-labels">
                <div v-if="dimensionText" class="dim-label dim-horizontal">
                  <Ruler :size="16" />
                  <span>{{ dimensionText }}</span>
                </div>
                <div v-if="weightText" class="dim-label dim-vertical">
                  <Weight :size="16" />
                  <span>{{ weightText }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="info-section">
            <div class="part-main-info">
              <h1 class="part-name">{{ part.name }}</h1>
              <div class="part-code">{{ part.code }}</div>
            </div>

            <div class="part-description">
              <p>{{ part.description }}</p>
            </div>

            <div class="info-grid">
              <div class="info-item">
                <div class="info-icon">
                  <Tag :size="18" />
                </div>
                <div class="info-content">
                  <div class="info-label">功用</div>
                  <div class="info-value">{{ part.function }}</div>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">
                  <Layers :size="18" />
                </div>
                <div class="info-content">
                  <div class="info-label">材质</div>
                  <div class="info-value">{{ part.material }}</div>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">
                  <MapPin :size="18" />
                </div>
                <div class="info-content">
                  <div class="info-label">出土地点</div>
                  <div class="info-value">{{ part.location }}</div>
                </div>
              </div>

              <div v-if="part.era" class="info-item">
                <div class="info-icon">📜</div>
                <div class="info-content">
                  <div class="info-label">年代</div>
                  <div class="info-value">{{ part.era }}</div>
                </div>
              </div>

              <div v-if="part.condition" class="info-item">
                <div class="info-icon">🔍</div>
                <div class="info-content">
                  <div class="info-label">保存状态</div>
                  <div class="info-value">{{ part.condition }}</div>
                </div>
              </div>
            </div>

            <div class="size-section">
              <h3 class="subsection-title">尺寸参数</h3>
              <div class="size-grid">
                <div v-if="part.dimensions.length" class="size-item">
                  <span class="size-label">长度</span>
                  <span class="size-value">{{ part.dimensions.length }} {{ part.dimensions.unit }}</span>
                </div>
                <div v-if="part.dimensions.width" class="size-item">
                  <span class="size-label">宽度</span>
                  <span class="size-value">{{ part.dimensions.width }} {{ part.dimensions.unit }}</span>
                </div>
                <div v-if="part.dimensions.height" class="size-item">
                  <span class="size-label">高度</span>
                  <span class="size-value">{{ part.dimensions.height }} {{ part.dimensions.unit }}</span>
                </div>
                <div v-if="part.dimensions.diameter" class="size-item">
                  <span class="size-label">直径</span>
                  <span class="size-value">{{ part.dimensions.diameter }} {{ part.dimensions.unit }}</span>
                </div>
                <div v-if="part.dimensions.weight" class="size-item">
                  <span class="size-label">重量</span>
                  <span class="size-value">{{ part.dimensions.weight }} kg</span>
                </div>
              </div>
            </div>
          </div>

          <div class="assembly-section">
            <AssemblyViewer :assemblies="part.assemblies" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.part-detail-page {
  min-height: calc(100vh - 100px);
  background: linear-gradient(180deg, #F9F5ED 0%, #F5F0E8 50%, #EDE5D5 100%);
  padding: 24px;
}

.detail-container {
  max-width: 1200px;
  margin: 0 auto;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #F9F5ED;
  border: 2px solid #C4A35A;
  border-radius: 8px;
  color: #5C4033;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Microsoft YaHei', sans-serif;
}

.back-btn:hover {
  background: #F5F0E8;
  border-color: #A68B3D;
  transform: translateX(-4px);
  box-shadow: 0 4px 12px rgba(92, 64, 51, 0.15);
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-family: 'Microsoft YaHei', sans-serif;
}

.crumb {
  color: #7A5A47;
  cursor: pointer;
  transition: color 0.2s ease;
}

.crumb:hover {
  color: #5C4033;
}

.crumb.current {
  color: #3E2A20;
  font-weight: 600;
  cursor: default;
}

.separator {
  color: #C4A35A;
}

.detail-panels {
  position: relative;
  min-height: 400px;
}

.detail-panels .content-panel {
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.loading-wrap,
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 3px solid #E8DFD0;
  border-top-color: #C4A35A;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-text {
  font-size: 14px;
  color: #7A5A47;
  margin: 0;
  font-family: 'Microsoft YaHei', sans-serif;
}

.notfound-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.notfound-title {
  font-family: 'SimSun', 'STSong', serif;
  font-size: 24px;
  color: #3E2A20;
  margin: 0 0 10px 0;
}

.notfound-desc {
  font-size: 14px;
  color: #7A5A47;
  margin: 0 0 24px 0;
  font-family: 'Microsoft YaHei', sans-serif;
}

.back-home-btn {
  padding: 12px 32px;
  background: linear-gradient(135deg, #5C4033 0%, #7A5A47 100%);
  border: none;
  border-radius: 25px;
  color: #F5F0E8;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Microsoft YaHei', sans-serif;
}

.back-home-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(92, 64, 51, 0.3);
}

.detail-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.sketch-section {
  grid-column: 1 / 2;
  grid-row: 1 / 3;
}

.section-title {
  font-family: 'SimSun', 'STSong', serif;
  font-size: 18px;
  font-weight: 700;
  color: #3E2A20;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-icon {
  font-size: 20px;
}

.sketch-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.zoom-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #F9F5ED;
  border: 1px solid #E8DFD0;
  border-radius: 20px;
  padding: 4px 8px;
}

.zoom-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: #E8DFD0;
  border-radius: 50%;
  font-size: 18px;
  color: #5C4033;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.zoom-btn:hover {
  background: #C4A35A;
  color: #F9F5ED;
}

.zoom-level {
  font-size: 12px;
  color: #7A5A47;
  min-width: 48px;
  text-align: center;
  font-family: 'Consolas', monospace;
}

.reset-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  border-radius: 50%;
  font-size: 16px;
  color: #7A5A47;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.reset-btn:hover {
  background: #E8DFD0;
  color: #5C4033;
}

.sketch-wrapper {
  position: relative;
  background: #F9F5ED;
  border: 2px solid #C4A35A;
  border-radius: 12px;
  padding: 20px;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.sketch-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
}

.sketch-image {
  max-width: 100%;
  max-height: 500px;
  object-fit: contain;
  transition: transform 0.3s ease;
  filter: drop-shadow(0 4px 8px rgba(92, 64, 51, 0.15));
}

.sketch-svg-wrapper {
  width: 100%;
  max-width: 400px;
  transition: transform 0.3s ease;
}

.sketch-svg-wrapper :deep(.part-sketch) {
  width: 100%;
  height: auto;
  aspect-ratio: 1;
}

.dimension-labels {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.dim-label {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(92, 64, 51, 0.9);
  color: #F5F0E8;
  font-size: 12px;
  border-radius: 6px;
  font-family: 'Microsoft YaHei', sans-serif;
}

.dim-horizontal {
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.dim-vertical {
  right: 20px;
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
  transform-origin: center;
}

.info-section {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}

.part-main-info {
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 2px solid #C4A35A;
}

.part-name {
  font-family: 'SimSun', 'STSong', serif;
  font-size: 28px;
  font-weight: 700;
  color: #3E2A20;
  margin: 0 0 8px 0;
  letter-spacing: 2px;
}

.part-code {
  font-size: 14px;
  color: #8B4513;
  font-family: 'Consolas', monospace;
  letter-spacing: 1px;
}

.part-description {
  margin-bottom: 24px;
}

.part-description p {
  font-size: 14px;
  line-height: 2;
  color: #5C4033;
  margin: 0;
  text-align: justify;
  font-family: 'Microsoft YaHei', sans-serif;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #F9F5ED;
  border: 1px solid #E8DFD0;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.info-item:hover {
  border-color: #C4A35A;
  box-shadow: 0 2px 8px rgba(92, 64, 51, 0.1);
}

.info-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(196, 163, 90, 0.2);
  border-radius: 8px;
  color: #8B4513;
  flex-shrink: 0;
  font-size: 18px;
}

.info-label {
  font-size: 12px;
  color: #7A5A47;
  margin-bottom: 2px;
  font-family: 'Microsoft YaHei', sans-serif;
}

.info-value {
  font-size: 14px;
  font-weight: 600;
  color: #3E2A20;
  font-family: 'SimSun', serif;
}

.size-section {
  background: #F9F5ED;
  border: 1px solid #E8DFD0;
  border-radius: 8px;
  padding: 16px;
}

.subsection-title {
  font-family: 'SimSun', 'STSong', serif;
  font-size: 15px;
  font-weight: 700;
  color: #3E2A20;
  margin: 0 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px dashed #C4A35A;
}

.size-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.size-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #F5F0E8;
  border-radius: 6px;
}

.size-label {
  font-size: 13px;
  color: #7A5A47;
  font-family: 'Microsoft YaHei', sans-serif;
}

.size-value {
  font-size: 14px;
  font-weight: 600;
  color: #8B4513;
  font-family: 'Consolas', monospace;
}

.assembly-section {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
}

@media (max-width: 1024px) {
  .detail-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .sketch-section,
  .info-section,
  .assembly-section {
    grid-column: 1 / -1;
    grid-row: auto;
  }

  .sketch-wrapper {
    min-height: 300px;
  }
}

@media (max-width: 768px) {
  .part-detail-page {
    padding: 16px;
  }

  .detail-header {
    flex-direction: column-reverse;
    align-items: flex-start;
    gap: 12px;
  }

  .breadcrumb {
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;
  }

  .part-name {
    font-size: 22px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .size-grid {
    grid-template-columns: 1fr;
  }

  .sketch-wrapper {
    padding: 12px;
    min-height: 250px;
  }
}
</style>
