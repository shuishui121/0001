<script setup lang="ts">
import { computed } from 'vue'
import type { Part } from '@/types/part'

const props = defineProps<{
  part: Part
  size?: 'small' | 'medium' | 'large'
}>()

const sizeClass = computed(() => {
  return {
    small: 'w-full h-full',
    medium: 'w-full h-full',
    large: 'w-full h-full'
  }[props.size || 'medium']
})

const partIcon = computed(() => {
  const func = props.part.function
  const iconMap: Record<string, string> = {
    '传动': '⚙️',
    '储能': '🔩',
    '省力': '🔧',
    '起重': '🏗️',
    '支撑': '📐',
    '制动': '🛑',
    '连接': '🔗',
    '锁止': '🔒',
    '控制': '🎛️',
    '动力': '⚡',
    '感应': '🧲',
    '光学': '🔍',
    '信号': '📡',
    '配重': '⚖️',
    '共鸣': '🔔',
    '计时': '⏱️'
  }
  return iconMap[func] || '⚙️'
})

const dimensionLabel = computed(() => {
  const dims = props.part.dimensions
  if (dims.diameter) return `直径 ${dims.diameter}${dims.unit}`
  if (dims.length && dims.width) return `${dims.length} × ${dims.width}${dims.unit}`
  if (dims.length) return `长 ${dims.length}${dims.unit}`
  return ''
})
</script>

<template>
  <div class="part-sketch" :class="sizeClass">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="sketch-svg">
      <defs>
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(92, 64, 51, 0.05)" stroke-width="0.5"/>
        </pattern>
      </defs>
      
      <rect width="200" height="200" fill="url(#grid)"/>
      
      <g class="sketch-content">
        <circle cx="100" cy="100" r="55" stroke="#C4A35A" stroke-width="1" stroke-dasharray="4,3" fill="none"/>
        
        <g transform="translate(100, 100)">
          <rect x="-35" y="-35" width="70" height="70" rx="8" 
                stroke="#5C4033" stroke-width="2" fill="#F5F0E8"/>
          <rect x="-25" y="-25" width="50" height="50" rx="5" 
                stroke="#C4A35A" stroke-width="1.5" fill="none" stroke-dasharray="3,2"/>
          
          <circle cx="0" cy="0" r="15" stroke="#5C4033" stroke-width="2" fill="#F9F5ED"/>
          <circle cx="0" cy="0" r="5" stroke="#5C4033" stroke-width="1.5" fill="#C4A35A"/>
          
          <g v-if="part.function === '传动'">
            <path d="M0 -50 L0 -40 L5 -38 L-5 -38 L0 -40" stroke="#5C4033" stroke-width="2" fill="#E8DFD0"/>
            <path d="M0 50 L0 40 L5 38 L-5 38 L0 40" stroke="#5C4033" stroke-width="2" fill="#E8DFD0"/>
            <path d="-50 0 L-40 0 L-38 5 L-38 -5 L-40 0" stroke="#5C4033" stroke-width="2" fill="#E8DFD0"/>
            <path d="50 0 L40 0 L38 5 L38 -5 L40 0" stroke="#5C4033" stroke-width="2" fill="#E8DFD0"/>
          </g>
          
          <g v-else-if="part.function === '储能'">
            <path d="M-20 -20 Q-10 -25 0 -20 Q10 -15 0 -5 Q-10 5 0 15 Q10 20 0 25 Q-10 20 -15 15" 
                  stroke="#5C4033" stroke-width="2" fill="none"/>
          </g>
          
          <g v-else-if="part.function === '支撑'">
            <rect x="-8" y="-30" width="16" height="60" stroke="#5C4033" stroke-width="2" fill="#E8DFD0"/>
            <rect x="-20" y="25" width="40" height="10" stroke="#5C4033" stroke-width="2" fill="#7A5A47"/>
          </g>
          
          <g v-else-if="part.function === '连接'">
            <circle cx="-20" cy="0" r="10" stroke="#5C4033" stroke-width="2" fill="#F9F5ED"/>
            <circle cx="20" cy="0" r="10" stroke="#5C4033" stroke-width="2" fill="#F9F5ED"/>
            <rect x="-20" y="-4" width="40" height="8" stroke="#5C4033" stroke-width="2" fill="#E8DFD0"/>
          </g>
          
          <g v-else-if="part.function === '制动'">
            <path d="M-20 -20 L20 -20 L15 20 L-15 20 Z" stroke="#5C4033" stroke-width="2" fill="#E8DFD0"/>
            <line x1="-10" y1="-10" x2="10" y2="10" stroke="#8B4513" stroke-width="2"/>
            <line x1="10" y1="-10" x2="-10" y2="10" stroke="#8B4513" stroke-width="2"/>
          </g>
          
          <g v-else-if="part.function === '动力'">
            <path d="M-15 -20 L15 -20 L20 0 L15 20 L-15 20 L-20 0 Z" 
                  stroke="#5C4033" stroke-width="2" fill="#E8DFD0"/>
            <path d="M0 -10 L8 0 L0 10 L-8 0 Z" stroke="#C4A35A" stroke-width="1.5" fill="#F9F5ED"/>
          </g>
        </g>
      </g>
      
      <g class="dimension-markers" stroke="#8B4513" stroke-width="1" fill="#8B4513" font-size="9" font-family="Consolas, monospace">
        <line x1="25" y1="185" x2="175" y2="185" stroke="#8B4513" stroke-width="1"/>
        <line x1="25" y1="180" x2="25" y2="190" stroke="#8B4513" stroke-width="1"/>
        <line x1="175" y1="180" x2="175" y2="190" stroke="#8B4513" stroke-width="1"/>
        <text x="100" y="195" text-anchor="middle" fill="#8B4513">{{ dimensionLabel }}</text>
      </g>
      
      <text x="100" y="172" text-anchor="middle" class="part-name-text" 
            fill="#3E2A20" font-size="11" font-family="SimSun, STSong, serif" font-weight="bold">
        {{ part.name }}
      </text>
    </svg>
  </div>
</template>

<style scoped>
.part-sketch {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F9F5ED;
}

.sketch-svg {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.sketch-content {
  animation: drawIn 0.8s ease-out;
}

@keyframes drawIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.part-name-text {
  opacity: 0;
  animation: fadeInText 0.5s ease-out 0.6s forwards;
}

@keyframes fadeInText {
  to {
    opacity: 1;
  }
}
</style>
