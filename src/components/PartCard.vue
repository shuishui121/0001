<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Part } from '@/types/part'
import PartSketch from './PartSketch.vue'

const props = defineProps<{
  part: Part
  index?: number
}>()

const emit = defineEmits<{
  (e: 'click', part: Part): void
}>()

const imageError = ref(false)

const animationDelay = computed(() => {
  return `${(props.index || 0) * 50}ms`
})

function handleImageError() {
  imageError.value = true
}
</script>

<template>
  <div
    class="part-card"
    :style="{ animationDelay }"
    @click="emit('click', part)"
  >
    <div class="card-image">
      <template v-if="!imageError && part.thumbnail">
        <img :src="part.thumbnail" :alt="part.name" @error="handleImageError" />
      </template>
      <PartSketch v-else :part="part" size="small" />
      <div class="card-overlay">
        <span class="view-detail">查看详情</span>
      </div>
    </div>
    <div class="card-content">
      <h3 class="part-name">{{ part.name }}</h3>
      <div class="part-code">{{ part.code }}</div>
      <div class="part-tags">
        <span class="tag tag-function">{{ part.function }}</span>
        <span class="tag tag-material">{{ part.material }}</span>
      </div>
    </div>
    <div class="card-corner top-left"></div>
    <div class="card-corner top-right"></div>
    <div class="card-corner bottom-left"></div>
    <div class="card-corner bottom-right"></div>
  </div>
</template>

<style scoped>
.part-card {
  position: relative;
  background: linear-gradient(145deg, #F9F5ED 0%, #F5F0E8 100%);
  border: 2px solid #C4A35A;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  animation: slideUp 0.5s ease-out both;
  box-shadow: 0 2px 10px rgba(92, 64, 51, 0.1);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.part-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(92, 64, 51, 0.2);
  border-color: #A68B3D;
}

.part-card:hover .card-image img {
  transform: scale(1.08);
}

.part-card:hover .card-overlay {
  opacity: 1;
}

.card-image {
  position: relative;
  height: 140px;
  overflow: hidden;
  background: #F5F0E8;
  border-bottom: 1px solid #E8DFD0;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 12px;
  transition: transform 0.5s ease;
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 40%, rgba(92, 64, 51, 0.7) 100%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 16px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.view-detail {
  color: #F5F0E8;
  font-size: 13px;
  font-weight: 600;
  padding: 6px 16px;
  background: rgba(196, 163, 90, 0.9);
  border-radius: 20px;
  transform: translateY(10px);
  transition: transform 0.3s ease;
}

.part-card:hover .view-detail {
  transform: translateY(0);
}

.card-content {
  padding: 14px;
}

.part-name {
  font-family: 'SimSun', 'STSong', serif;
  font-size: 16px;
  font-weight: 700;
  color: #3E2A20;
  margin: 0 0 6px 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.part-code {
  font-size: 12px;
  color: #8B4513;
  margin-bottom: 10px;
  font-family: 'Consolas', monospace;
  letter-spacing: 0.5px;
}

.part-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: 500;
}

.tag-function {
  background: rgba(74, 124, 89, 0.15);
  color: #365A41;
  border: 1px solid rgba(74, 124, 89, 0.3);
}

.tag-material {
  background: rgba(139, 69, 19, 0.15);
  color: #8B4513;
  border: 1px solid rgba(139, 69, 19, 0.3);
}

.card-corner {
  position: absolute;
  width: 12px;
  height: 12px;
  border: 2px solid #C4A35A;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.part-card:hover .card-corner {
  opacity: 1;
  border-color: #A68B3D;
}

.card-corner.top-left {
  top: 6px;
  left: 6px;
  border-right: none;
  border-bottom: none;
  border-top-left-radius: 6px;
}

.card-corner.top-right {
  top: 6px;
  right: 6px;
  border-left: none;
  border-bottom: none;
  border-top-right-radius: 6px;
}

.card-corner.bottom-left {
  bottom: 6px;
  left: 6px;
  border-right: none;
  border-top: none;
  border-bottom-left-radius: 6px;
}

.card-corner.bottom-right {
  bottom: 6px;
  right: 6px;
  border-left: none;
  border-top: none;
  border-bottom-right-radius: 6px;
}

@media (max-width: 768px) {
  .card-image {
    height: 120px;
  }

  .card-content {
    padding: 12px;
  }

  .part-name {
    font-size: 14px;
  }
}
</style>
