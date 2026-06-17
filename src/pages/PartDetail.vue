<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { usePartsStore } from '@/stores/parts'
import AssemblyViewer from '@/components/AssemblyViewer.vue'
import PartSketch from '@/components/PartSketch.vue'
import { ArrowLeft, Tag, Layers, MapPin, Ruler, Weight } from 'lucide-vue-next'
import { useI18nPart } from '@/composables/useI18nPart'

const route = useRoute()
const router = useRouter()
const store = usePartsStore()
const { t, locale } = useI18n()
const { getTranslatedPart } = useI18nPart()

const imageZoom = ref(1)
const isLoading = ref(true)
const sketchImageError = ref(false)

const partId = computed(() => route.params.id as string)

const originalPart = computed(() => {
  return store.getPartById(partId.value)
})

const part = computed(() => {
  if (!originalPart.value) return undefined
  return getTranslatedPart(originalPart.value)
})

const dimensionText = computed(() => {
  if (!part.value) return ''
  const dims = part.value.dimensions
  const parts: string[] = []

  if (dims.length) parts.push(`${t('detail.lengthLabel')} ${dims.length}${dims.unit}`)
  if (dims.width) parts.push(`${t('detail.widthLabel')} ${dims.width}${dims.unit}`)
  if (dims.height) parts.push(`${t('detail.heightLabel')} ${dims.height}${dims.unit}`)
  if (dims.diameter) parts.push(`${t('detail.diameterLabel')} ${dims.diameter}${dims.unit}`)

  return parts.join(' × ')
})

const weightText = computed(() => {
  if (!part.value?.dimensions.weight) return ''
  return `${t('detail.weightFormat', { value: part.value.dimensions.weight })}`
})

const pageTitle = computed(() => {
  return part.value ? `${part.value.name} - ${t('header.title')}` : t('header.title')
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

watch([partId, locale], () => {
  imageZoom.value = 1
  sketchImageError.value = false
})
</script>

<template>
  <div class="part-detail-page">
    <div class="detail-container">
      <header class="detail-header">
        <button
          class="back-btn"
          type="button"
          :aria-label="t('common.back')"
          @click="goBack"
        >
          <ArrowLeft :size="20" aria-hidden="true" />
          <span>{{ t('common.back') }}</span>
        </button>

        <nav class="breadcrumb" aria-label="breadcrumb">
          <ol>
            <li>
              <a
                class="crumb"
                href="#"
                @click.prevent="router.push('/')"
                :aria-label="t('detail.breadcrumb')"
              >
                {{ t('detail.breadcrumb') }}
              </a>
            </li>
            <li class="separator" aria-hidden="true">{{ t('detail.breadcrumbSeparator') }}</li>
            <li>
              <span class="crumb current" aria-current="page">
                {{ part?.name || t('detail.notFound') }}
              </span>
            </li>
          </ol>
        </nav>
      </header>

      <div class="detail-panels">
        <section v-if="isLoading" class="content-panel loading-wrap" aria-live="polite">
          <div class="loading-spinner" aria-hidden="true"></div>
          <p class="loading-text">{{ t('common.loadingDetail') }}</p>
        </section>

        <section v-else-if="!part" class="content-panel not-found">
          <div class="notfound-icon" aria-hidden="true">❓</div>
          <h2 class="notfound-title">{{ t('detail.notFound') }}</h2>
          <p class="notfound-desc">{{ t('detail.notFoundDesc') }}</p>
          <button
            class="back-home-btn"
            type="button"
            :aria-label="t('common.home')"
            @click="router.push('/')"
          >
            {{ t('common.home') }}
          </button>
        </section>

        <article v-else class="content-panel detail-content" :aria-label="part.name">
          <section class="sketch-section" aria-labelledby="sketch-heading">
            <header class="sketch-header">
              <h2 id="sketch-heading" class="section-title">
                <span class="title-icon" aria-hidden="true">📐</span>
                {{ t('detail.sketch') }}
              </h2>
              <div class="zoom-controls" role="group" :aria-label="t('detail.sketch')">
                <button
                  class="zoom-btn"
                  type="button"
                  :aria-label="t('detail.zoomOut')"
                  :title="t('detail.zoomOut')"
                  @click="zoomOut"
                >−</button>
                <span class="zoom-level" aria-live="polite">{{ Math.round(imageZoom * 100) }}%</span>
                <button
                  class="zoom-btn"
                  type="button"
                  :aria-label="t('detail.zoomIn')"
                  :title="t('detail.zoomIn')"
                  @click="zoomIn"
                >+</button>
                <button
                  class="reset-btn"
                  type="button"
                  :aria-label="t('detail.resetZoom')"
                  :title="t('detail.resetZoom')"
                  @click="resetZoom"
                >↺</button>
              </div>
            </header>

            <figure class="sketch-wrapper">
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

              <figcaption class="dimension-labels" aria-hidden="true">
                <div v-if="dimensionText" class="dim-label dim-horizontal">
                  <Ruler :size="16" aria-hidden="true" />
                  <span>{{ dimensionText }}</span>
                </div>
                <div v-if="weightText" class="dim-label dim-vertical">
                  <Weight :size="16" aria-hidden="true" />
                  <span>{{ weightText }}</span>
                </div>
              </figcaption>
            </figure>
          </section>

          <section class="info-section" aria-labelledby="info-heading">
            <div class="part-main-info">
              <h1 id="info-heading" class="part-name">{{ part.name }}</h1>
              <div class="part-code">{{ part.code }}</div>
            </div>

            <div class="part-description">
              <p>{{ part.description }}</p>
            </div>

            <dl class="info-grid" aria-label="零件属性">
              <div class="info-item">
                <dt class="info-icon" aria-hidden="true">
                  <Tag :size="18" />
                </dt>
                <dd class="info-content">
                  <div class="info-label">{{ t('detail.function') }}</div>
                  <div class="info-value">{{ part.function }}</div>
                </dd>
              </div>

              <div class="info-item">
                <dt class="info-icon" aria-hidden="true">
                  <Layers :size="18" />
                </dt>
                <dd class="info-content">
                  <div class="info-label">{{ t('detail.material') }}</div>
                  <div class="info-value">{{ part.material }}</div>
                </dd>
              </div>

              <div class="info-item">
                <dt class="info-icon" aria-hidden="true">
                  <MapPin :size="18" />
                </dt>
                <dd class="info-content">
                  <div class="info-label">{{ t('detail.location') }}</div>
                  <div class="info-value">{{ part.location }}</div>
                </dd>
              </div>

              <div v-if="part.era" class="info-item">
                <dt class="info-icon" aria-hidden="true">📜</dt>
                <dd class="info-content">
                  <div class="info-label">{{ t('detail.era') }}</div>
                  <div class="info-value">{{ part.era }}</div>
                </dd>
              </div>

              <div v-if="part.condition" class="info-item">
                <dt class="info-icon" aria-hidden="true">🔍</dt>
                <dd class="info-content">
                  <div class="info-label">{{ t('detail.condition') }}</div>
                  <div class="info-value">{{ part.condition }}</div>
                </dd>
              </div>
            </dl>

            <section class="size-section" aria-labelledby="size-heading">
              <h3 id="size-heading" class="subsection-title">{{ t('detail.dimensions') }}</h3>
              <dl class="size-grid">
                <div v-if="part.dimensions.length" class="size-item">
                  <dt class="size-label">{{ t('detail.length') }}</dt>
                  <dd class="size-value">{{ part.dimensions.length }} {{ part.dimensions.unit }}</dd>
                </div>
                <div v-if="part.dimensions.width" class="size-item">
                  <dt class="size-label">{{ t('detail.width') }}</dt>
                  <dd class="size-value">{{ part.dimensions.width }} {{ part.dimensions.unit }}</dd>
                </div>
                <div v-if="part.dimensions.height" class="size-item">
                  <dt class="size-label">{{ t('detail.height') }}</dt>
                  <dd class="size-value">{{ part.dimensions.height }} {{ part.dimensions.unit }}</dd>
                </div>
                <div v-if="part.dimensions.diameter" class="size-item">
                  <dt class="size-label">{{ t('detail.diameter') }}</dt>
                  <dd class="size-value">{{ part.dimensions.diameter }} {{ part.dimensions.unit }}</dd>
                </div>
                <div v-if="part.dimensions.weight" class="size-item">
                  <dt class="size-label">{{ t('detail.weight') }}</dt>
                  <dd class="size-value">{{ part.dimensions.weight }} kg</dd>
                </div>
              </dl>
            </section>
          </section>

          <section class="assembly-section" aria-labelledby="assembly-heading">
            <AssemblyViewer :assemblies="part.assemblies" />
          </section>
        </article>
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
  flex-wrap: wrap;
  gap: 12px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #F9F5ED;
  border: 2px solid #C4A35A;
  border-radius: 8px;
  color: #3E2A20;
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

.back-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(196, 163, 90, 0.5), 0 4px 12px rgba(92, 64, 51, 0.15);
}

.breadcrumb ol {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-family: 'Microsoft YaHei', sans-serif;
  list-style: none;
  padding: 0;
  margin: 0;
}

.crumb {
  color: #5C4033;
  cursor: pointer;
  transition: color 0.2s ease;
  text-decoration: none;
}

.crumb:hover {
  color: #3E2A20;
}

.crumb:focus-visible {
  outline: 2px solid #C4A35A;
  outline-offset: 2px;
  border-radius: 2px;
}

.crumb.current {
  color: #1A1410;
  font-weight: 600;
  cursor: default;
}

.separator {
  color: #A68B3D;
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
  background: #F9F5ED;
  border: 2px solid #C4A35A;
  border-radius: 12px;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 3px solid #E8DFD0;
  border-top-color: #A68B3D;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-text {
  font-size: 14px;
  color: #5C4033;
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
  color: #1A1410;
  margin: 0 0 10px 0;
}

.notfound-desc {
  font-size: 14px;
  color: #5C4033;
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

.back-home-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(196, 163, 90, 0.5), 0 6px 20px rgba(92, 64, 51, 0.3);
}

.detail-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  animation: fadeIn 0.5s ease-out;
  background: #F9F5ED;
  border: 2px solid #C4A35A;
  border-radius: 12px;
  padding: 24px;
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
  color: #1A1410;
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
  background: #F5F0E8;
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
  color: #3E2A20;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.zoom-btn:hover {
  background: #A68B3D;
  color: #F9F5ED;
}

.zoom-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px rgba(196, 163, 90, 0.7);
  background: #A68B3D;
  color: #F9F5ED;
}

.zoom-level {
  font-size: 12px;
  color: #5C4033;
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
  color: #5C4033;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.reset-btn:hover {
  background: #E8DFD0;
  color: #3E2A20;
}

.reset-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px rgba(196, 163, 90, 0.7);
  background: #E8DFD0;
}

.sketch-wrapper {
  position: relative;
  background: #F5F0E8;
  border: 2px solid #C4A35A;
  border-radius: 12px;
  padding: 20px;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin: 0;
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
  background: rgba(62, 42, 32, 0.92);
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
  color: #1A1410;
  margin: 0 0 8px 0;
  letter-spacing: 2px;
}

.part-code {
  font-size: 14px;
  color: #6B3410;
  font-family: 'Consolas', monospace;
  letter-spacing: 1px;
}

.part-description {
  margin-bottom: 24px;
}

.part-description p {
  font-size: 14px;
  line-height: 2;
  color: #3E2A20;
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
  background: #F5F0E8;
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
  background: rgba(196, 163, 90, 0.22);
  border-radius: 8px;
  color: #6B3410;
  flex-shrink: 0;
  font-size: 18px;
  margin: 0;
}

.info-content {
  min-width: 0;
}

.info-label {
  font-size: 12px;
  color: #5C4033;
  margin-bottom: 2px;
  font-family: 'Microsoft YaHei', sans-serif;
}

.info-value {
  font-size: 14px;
  font-weight: 600;
  color: #1A1410;
  font-family: 'SimSun', serif;
  margin: 0;
}

.size-section {
  background: #F5F0E8;
  border: 1px solid #E8DFD0;
  border-radius: 8px;
  padding: 16px;
}

.subsection-title {
  font-family: 'SimSun', 'STSong', serif;
  font-size: 15px;
  font-weight: 700;
  color: #1A1410;
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
  background: #F9F5ED;
  border-radius: 6px;
}

.size-label {
  font-size: 13px;
  color: #5C4033;
  font-family: 'Microsoft YaHei', sans-serif;
  margin: 0;
}

.size-value {
  font-size: 14px;
  font-weight: 600;
  color: #6B3410;
  font-family: 'Consolas', monospace;
  margin: 0;
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
