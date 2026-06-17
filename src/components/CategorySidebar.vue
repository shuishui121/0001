<script setup lang="ts">
import { usePartsStore } from '@/stores/parts'
import { DIMENSION_LABELS } from '@/types/part'

const store = usePartsStore()

function handleCategoryClick(categoryId: string) {
  if (store.selectedCategory === categoryId) {
    store.selectCategory(null)
  } else {
    store.selectCategory(categoryId)
  }
}
</script>

<template>
  <aside class="category-sidebar">
    <div class="sidebar-header">
      <h3 class="sidebar-title">
        <span class="title-icon">📜</span>
        {{ DIMENSION_LABELS[store.currentDimension] }}分类
      </h3>
      <button
        v-if="store.selectedCategory"
        class="clear-btn"
        @click="store.selectCategory(null)"
      >
        清除筛选
      </button>
    </div>

    <div class="category-list">
      <button
        v-for="category in store.currentCategoryList"
        :key="category.id"
        class="category-item"
        :class="{ active: store.selectedCategory === category.id }"
        @click="handleCategoryClick(category.id)"
      >
        <span class="category-name">{{ category.name }}</span>
        <span class="category-count">{{ category.count }}</span>
      </button>
    </div>

    <div class="sidebar-footer">
      <p class="total-text">
        共 <span class="total-num">{{ store.totalCount }}</span> 种零件
      </p>
    </div>
  </aside>
</template>

<style scoped>
.category-sidebar {
  width: 240px;
  flex-shrink: 0;
  background: linear-gradient(180deg, #F9F5ED 0%, #F5F0E8 100%);
  border: 2px solid #C4A35A;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  overflow: hidden;
}

.category-sidebar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #C4A35A, #8B4513, #C4A35A);
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px dashed #C4A35A;
}

.sidebar-title {
  font-family: 'SimSun', 'STSong', serif;
  font-size: 16px;
  font-weight: 700;
  color: #5C4033;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
}

.title-icon {
  font-size: 18px;
}

.clear-btn {
  padding: 4px 10px;
  font-size: 12px;
  border: 1px solid #A68B3D;
  border-radius: 6px;
  background: transparent;
  color: #8B4513;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Microsoft YaHei', sans-serif;
}

.clear-btn:hover {
  background: #C4A35A;
  color: #F9F5ED;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  overflow-y: auto;
  padding-right: 4px;
}

.category-list::-webkit-scrollbar {
  width: 4px;
}

.category-list::-webkit-scrollbar-track {
  background: #E8DFD0;
  border-radius: 2px;
}

.category-list::-webkit-scrollbar-thumb {
  background: #C4A35A;
  border-radius: 2px;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: transparent;
  color: #5C4033;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: 'Microsoft YaHei', sans-serif;
  text-align: left;
  width: 100%;
}

.category-item:hover {
  background: rgba(196, 163, 90, 0.15);
  border-color: rgba(196, 163, 90, 0.5);
  padding-left: 18px;
}

.category-item.active {
  background: linear-gradient(135deg, #5C4033 0%, #7A5A47 100%);
  color: #F5F0E8;
  border-color: #5C4033;
  box-shadow: 0 2px 10px rgba(92, 64, 51, 0.2);
}

.category-item.active .category-count {
  background: rgba(245, 240, 232, 0.2);
  color: #DBC47D;
}

.category-name {
  font-weight: 500;
}

.category-count {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
  background: rgba(196, 163, 90, 0.3);
  color: #8B4513;
  font-weight: 600;
  min-width: 28px;
  text-align: center;
}

.sidebar-footer {
  padding-top: 12px;
  border-top: 1px dashed #C4A35A;
}

.total-text {
  font-size: 13px;
  color: #7A5A47;
  text-align: center;
  margin: 0;
  font-family: 'Microsoft YaHei', sans-serif;
}

.total-num {
  font-size: 18px;
  font-weight: 700;
  color: #8B4513;
  font-family: 'SimSun', serif;
}

@media (max-width: 1024px) {
  .category-sidebar {
    width: 200px;
    padding: 16px;
  }
}

@media (max-width: 768px) {
  .category-sidebar {
    width: 100%;
    padding: 12px 16px;
  }

  .category-list {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
    max-height: none;
  }

  .category-item {
    padding: 8px 12px;
    font-size: 13px;
  }

  .category-item:hover {
    padding-left: 12px;
  }

  .sidebar-footer {
    display: none;
  }
}
</style>
