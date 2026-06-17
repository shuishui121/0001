<script setup lang="ts">
import { onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePartsStore } from '@/stores/parts'
import DimensionTabs from '@/components/DimensionTabs.vue'
import CategorySidebar from '@/components/CategorySidebar.vue'
import PartCard from '@/components/PartCard.vue'
import type { Part } from '@/types/part'
import { DIMENSION_LABELS } from '@/types/part'

const store = usePartsStore()
const route = useRoute()
const router = useRouter()

const showSidebar = computed(() => store.currentCategoryList.length > 0)

const currentFilterText = computed(() => {
  const parts = store.filteredParts
  const dim = DIMENSION_LABELS[store.currentDimension]
  
  if (store.selectedCategory) {
    return `${dim}：${store.selectedCategory}（共 ${parts.length} 件）`
  }
  
  if (store.searchQuery) {
    return `搜索："${store.searchQuery}"（共 ${parts.length} 件）`
  }
  
  return `全部零件（共 ${parts.length} 件）`
})

onMounted(() => {
  store.loadParts()
  
  if (route.query.q) {
    store.setSearchQuery(String(route.query.q))
  }
})

watch(() => route.query, (query) => {
  if (query.q) {
    store.setSearchQuery(String(query.q))
  } else {
    store.setSearchQuery('')
  }
})

function handlePartClick(part: Part) {
  router.push({ name: 'part-detail', params: { id: part.id } })
}
</script>

<template>
  <div class="home-page">
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-icon">⚙️</span>
          <span class="badge-text">机关零件图鉴</span>
        </div>
        <h2 class="hero-title">探索墨家机关之美</h2>
        <p class="hero-desc">
          汇集战国墓群出土的两百余种墨家机关零件，
          <br />
          按功用、材质、出土地点三种维度分类浏览
        </p>
      </div>
      <div class="hero-decoration">
        <div class="deco-circle circle-1"></div>
        <div class="deco-circle circle-2"></div>
        <div class="deco-pattern"></div>
      </div>
    </section>

    <section class="main-content">
      <div class="content-inner">
        <div class="dimension-section">
          <div class="section-header">
            <h3 class="section-title">
              <span class="title-line"></span>
              分类浏览
              <span class="title-line"></span>
            </h3>
          </div>
          <DimensionTabs />
        </div>

        <div class="content-body" :class="{ 'no-sidebar': !showSidebar }">
          <Transition name="sidebar-fade" mode="out-in">
            <CategorySidebar v-if="showSidebar" key="sidebar" />
          </Transition>

          <div class="parts-section">
            <div class="parts-header">
              <div class="filter-info">
                <span class="filter-icon">📋</span>
                <span class="filter-text">{{ currentFilterText }}</span>
              </div>
            </div>

            <div class="parts-content">
              <div v-if="store.isLoading" class="content-panel loading-state">
                <div class="loading-spinner"></div>
                <p class="loading-text">正在加载零件数据...</p>
              </div>

              <div v-else-if="store.filteredParts.length === 0" class="content-panel empty-state">
                <div class="empty-icon">🔍</div>
                <p class="empty-title">未找到匹配的零件</p>
                <p class="empty-desc">试试其他分类或关键词</p>
                <button 
                  class="reset-btn"
                  @click="() => { store.selectCategory(null); store.setSearchQuery('') }"
                >
                  重置筛选
                </button>
              </div>

              <div v-else class="content-panel parts-grid">
                <PartCard
                  v-for="(part, index) in store.filteredParts"
                  :key="part.id"
                  :part="part"
                  :index="index"
                  @click="handlePartClick"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  min-height: calc(100vh - 100px);
  background: linear-gradient(180deg, #F9F5ED 0%, #F5F0E8 50%, #EDE5D5 100%);
}

.hero-section {
  position: relative;
  padding: 50px 30px 40px;
  background: linear-gradient(135deg, #5C4033 0%, #7A5A47 50%, #5C4033 100%);
  color: #F5F0E8;
  overflow: hidden;
}

.hero-content {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  text-align: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  background: rgba(196, 163, 90, 0.2);
  border: 1px solid rgba(196, 163, 90, 0.5);
  border-radius: 20px;
  margin-bottom: 20px;
}

.badge-icon {
  font-size: 18px;
}

.badge-text {
  font-size: 14px;
  font-weight: 600;
  color: #DBC47D;
  letter-spacing: 2px;
  font-family: 'SimSun', serif;
}

.hero-title {
  font-family: 'SimSun', 'STSong', serif;
  font-size: 36px;
  font-weight: 700;
  margin: 0 0 16px 0;
  letter-spacing: 6px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.hero-desc {
  font-size: 16px;
  line-height: 2;
  color: rgba(245, 240, 232, 0.85);
  margin: 0;
  font-family: 'Microsoft YaHei', sans-serif;
}

.hero-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.deco-circle {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(196, 163, 90, 0.2);
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: -100px;
  right: -50px;
}

.circle-2 {
  width: 200px;
  height: 200px;
  bottom: -80px;
  left: 10%;
}

.deco-pattern {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 20px,
    rgba(196, 163, 90, 0.3) 20px,
    rgba(196, 163, 90, 0.3) 21px
  );
}

.main-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px;
}

.content-inner {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.dimension-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 24px;
  background: #F9F5ED;
  border: 2px solid #C4A35A;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(92, 64, 51, 0.1);
}

.section-header {
  text-align: center;
}

.section-title {
  font-family: 'SimSun', 'STSong', serif;
  font-size: 20px;
  font-weight: 700;
  color: #3E2A20;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  letter-spacing: 4px;
}

.title-line {
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #C4A35A, transparent);
}

.content-body {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.content-body.no-sidebar {
  justify-content: center;
}

.parts-section {
  flex: 1;
  min-width: 0;
}

.parts-header {
  margin-bottom: 20px;
}

.filter-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(196, 163, 90, 0.1);
  border-left: 3px solid #C4A35A;
  border-radius: 0 8px 8px 0;
}

.filter-icon {
  font-size: 16px;
}

.filter-text {
  font-size: 14px;
  color: #5C4033;
  font-weight: 500;
  font-family: 'Microsoft YaHei', sans-serif;
}

.parts-content {
  position: relative;
  min-height: 300px;
}

.content-panel {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.parts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.loading-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
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

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-title {
  font-size: 18px;
  font-weight: 600;
  color: #5C4033;
  margin: 0 0 8px 0;
  font-family: 'SimSun', serif;
}

.empty-desc {
  font-size: 14px;
  color: #7A5A47;
  margin: 0 0 20px 0;
  font-family: 'Microsoft YaHei', sans-serif;
}

.reset-btn {
  padding: 10px 24px;
  background: linear-gradient(135deg, #C4A35A 0%, #A68B3D 100%);
  border: none;
  border-radius: 20px;
  color: #F9F5ED;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Microsoft YaHei', sans-serif;
}

.reset-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(196, 163, 90, 0.4);
}

.sidebar-fade-enter-active,
.sidebar-fade-leave-active {
  transition: all 0.3s ease;
}

.sidebar-fade-enter-from,
.sidebar-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

@media (max-width: 1024px) {
  .hero-section {
    padding: 40px 24px 30px;
  }

  .hero-title {
    font-size: 28px;
    letter-spacing: 4px;
  }

  .hero-desc {
    font-size: 14px;
  }

  .main-content {
    padding: 24px;
  }

  .parts-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 16px;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 30px 20px 24px;
  }

  .hero-title {
    font-size: 22px;
    letter-spacing: 2px;
  }

  .hero-desc {
    font-size: 13px;
    line-height: 1.8;
  }

  .main-content {
    padding: 20px 16px;
  }

  .content-body {
    flex-direction: column;
    gap: 20px;
  }

  .dimension-section {
    padding: 16px;
    gap: 14px;
  }

  .section-title {
    font-size: 16px;
    letter-spacing: 2px;
  }

  .title-line {
    width: 24px;
  }

  .parts-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
  }
}
</style>
