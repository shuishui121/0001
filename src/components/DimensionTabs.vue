<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePartsStore } from '@/stores/parts'
import { DIMENSION_LABELS, type DimensionType } from '@/types/part'

const props = defineProps<{
  dimensionLabels?: Record<DimensionType, string>
}>()

const store = usePartsStore()
const { t } = useI18n()

const dimensions = computed(() => ([
  { key: 'function' as DimensionType, icon: '⚙️', label: t('dimensions.function') },
  { key: 'material' as DimensionType, icon: '🔩', label: t('dimensions.material') },
  { key: 'location' as DimensionType, icon: '📍', label: t('dimensions.location') }
]))

function handleDimensionChange(dim: DimensionType) {
  store.setDimension(dim)
}

function handleKeydown(event: KeyboardEvent, dim: DimensionType) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    handleDimensionChange(dim)
  }
}

function getTabAriaLabel(dim: { key: DimensionType; icon: string; label: string }) {
  const count = store.categories[dim.key].length
  return `${dim.label}, ${t('tabs.categoryCount', { count })}`
}
</script>

<template>
  <div
    class="dimension-tabs"
    role="tablist"
    :aria-label="t('tabs.ariaLabel')"
  >
    <button
      v-for="dim in dimensions"
      :key="dim.key"
      class="tab-btn"
      :class="{ active: store.currentDimension === dim.key }"
      :role="'tab'"
      :aria-selected="store.currentDimension === dim.key"
      :aria-label="getTabAriaLabel(dim)"
      tabindex="0"
      type="button"
      @click="handleDimensionChange(dim.key)"
      @keydown="handleKeydown($event, dim.key)"
    >
      <span class="tab-icon" aria-hidden="true">{{ dim.icon }}</span>
      <span class="tab-label">{{ dim.label }}</span>
      <span class="tab-count" aria-hidden="true">
        {{ store.categories[dim.key].length }}{{ t('tabs.categorySuffix') }}
      </span>
    </button>
  </div>
</template>

<style scoped>
.dimension-tabs {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: 2px solid #C4A35A;
  border-radius: 8px;
  background: #F9F5ED;
  color: #3E2A20;
  font-family: 'SimSun', 'STSong', serif;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.tab-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(196, 163, 90, 0.25), transparent);
  transition: left 0.5s ease;
}

.tab-btn:hover::before {
  left: 100%;
}

.tab-btn:hover {
  background: #F5F0E8;
  border-color: #A68B3D;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(92, 64, 51, 0.15);
}

.tab-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(196, 163, 90, 0.6), 0 4px 15px rgba(92, 64, 51, 0.15);
}

.tab-btn.active {
  background: linear-gradient(135deg, #5C4033 0%, #7A5A47 100%);
  border-color: #5C4033;
  color: #F5F0E8;
  box-shadow: 0 4px 15px rgba(92, 64, 51, 0.3);
}

.tab-btn.active:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(92, 64, 51, 0.4);
}

.tab-btn.active:focus-visible {
  box-shadow: 0 0 0 3px rgba(196, 163, 90, 0.7), 0 6px 20px rgba(92, 64, 51, 0.4);
}

.tab-icon {
  font-size: 18px;
}

.tab-label {
  font-weight: 600;
}

.tab-count {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
  background: rgba(196, 163, 90, 0.35);
  color: #6B3410;
}

.tab-btn.active .tab-count {
  background: rgba(245, 240, 232, 0.25);
  color: #DBC47D;
}

@media (max-width: 768px) {
  .dimension-tabs {
    gap: 8px;
  }

  .tab-btn {
    padding: 10px 14px;
    font-size: 13px;
    flex: 1;
    min-width: 90px;
    justify-content: center;
  }

  .tab-icon {
    font-size: 16px;
  }

  .tab-count {
    display: none;
  }
}
</style>
